
<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

/**
 * Devuelve una respuesta JSON y finaliza la ejecución.
 */
function respond($status, $data)
{
    http_response_code($status);

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE
    );

    exit;
}

/**
 * Envía una petición HTTP a OpenAI.
 */
function openAIRequest($url, $apiKey, $postFields, $headers = [])
{
    $curl = curl_init($url);

    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postFields,
        CURLOPT_HTTPHEADER => array_merge([
            "Authorization: Bearer " . $apiKey
        ], $headers),
        CURLOPT_CONNECTTIMEOUT => 30,
        CURLOPT_TIMEOUT => 300
    ]);

    $response = curl_exec($curl);
    $curlError = curl_error($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    curl_close($curl);

    if ($response === false) {
        throw new Exception(
            "Error de conexión con OpenAI: " . $curlError
        );
    }

    $decoded = json_decode($response, true);

    if (!is_array($decoded)) {
        throw new Exception(
            "OpenAI devolvió una respuesta que no es JSON válido."
        );
    }

    if ($httpCode < 200 || $httpCode >= 300) {
        $message = $decoded["error"]["message"]
            ?? "Error desconocido de OpenAI.";

        error_log(
            "OpenAI HTTP " . $httpCode . ": " . $response
        );

        throw new Exception(
            "OpenAI (HTTP " . $httpCode . "): " . $message
        );
    }

    return $decoded;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respond(405, [
        "success" => false,
        "error" => "Método no permitido."
    ]);
}

/*
|--------------------------------------------------------------------------
| 1. Leer y validar el archivo recibido
|--------------------------------------------------------------------------
*/

$input = json_decode(file_get_contents("php://input"), true);

if (!is_array($input) || empty($input["file"])) {
    respond(400, [
        "success" => false,
        "error" => "Debes indicar el nombre del archivo PDF."
    ]);
}

$fileName = basename($input["file"]);

if (
    strtolower(pathinfo($fileName, PATHINFO_EXTENSION)) !== "pdf"
) {
    respond(400, [
        "success" => false,
        "error" => "El archivo debe tener extensión PDF."
    ]);
}

$pdfPath = __DIR__ . "/../../upload/papers/" . $fileName;

if (!is_file($pdfPath) || !is_readable($pdfPath)) {
    respond(404, [
        "success" => false,
        "error" => "No se encontró el PDF guardado en el servidor."
    ]);
}

if (filesize($pdfPath) === 0) {
    respond(400, [
        "success" => false,
        "error" => "El archivo PDF está vacío."
    ]);
}

/*
|--------------------------------------------------------------------------
| 2. Cargar la configuración de OpenAI
|--------------------------------------------------------------------------
*/

try {
    require_once __DIR__ . "/../../config/openai.php";

    $apiKey = OpenAIConfig::getApiKey();
    $model = OpenAIConfig::getModel();

    /*
    |--------------------------------------------------------------------------
    | 3. Subir el PDF a OpenAI
    |--------------------------------------------------------------------------
    |
    | El archivo original se conserva en nuestro servidor.
    | Esta operación envía una copia a OpenAI para analizar su contenido.
    |
    */

    $uploadResponse = openAIRequest(
        "https://api.openai.com/v1/files",
        $apiKey,
        [
            "purpose" => "user_data",
            "file" => new CURLFile(
                $pdfPath,
                "application/pdf",
                $fileName
            )
        ]
    );

    if (empty($uploadResponse["id"])) {
        throw new Exception(
            "OpenAI no devolvió el identificador del PDF."
        );
    }

    $openAIFileId = $uploadResponse["id"];

    /*
    |--------------------------------------------------------------------------
    | 4. Analizar el paper y generar el resumen corto
    |--------------------------------------------------------------------------
    |
    | Todos los campos se solicitan en una sola llamada de análisis.
    | No se solicita traducción ni se permite inventar datos.
    |
    */

    $schema = [
        "type" => "object",
        "properties" => [
            "title" => [
                "type" => "string",
                "description" =>
                    "Título original del paper, sin traducir."
            ],
            "authors" => [
                "type" => "array",
                "items" => [
                    "type" => "string"
                ],
                "description" =>
                    "Nombres de los autores tal como aparecen en el documento."
            ],
            "abstract" => [
                "type" => "string",
                "description" =>
                    "Abstract científico original. No traducir ni reescribir."
            ],
            "keywords" => [
                "type" => "array",
                "items" => [
                    "type" => "string"
                ],
                "description" =>
                    "Palabras clave originales del documento."
            ],
            "journal" => [
                "type" => ["string", "null"],
                "description" =>
                    "Nombre de la revista científica, si está indicado."
            ],
            "publication_date" => [
                "type" => ["string", "null"],
                "description" =>
                    "Fecha de publicación en formato YYYY-MM-DD. "
                    . "Si solo consta el año, usar YYYY-01-01 únicamente "
                    . "si la aplicación acepta esa aproximación; "
                    . "de lo contrario, devolver null."
            ],
            "doi" => [
                "type" => ["string", "null"],
                "description" =>
                    "DOI del paper, si aparece explícitamente."
            ],
            "short_summary" => [
                "type" => "string",
                "description" =>
                    "Resumen breve, atractivo y fiel al contenido, "
                    . "para la tarjeta pública del paper. "
                    . "Escribir en el idioma original del documento, "
                    . "sin traducirlo. Máximo 2 o 3 frases."
            ]
        ],
        "required" => [
            "title",
            "authors",
            "abstract",
            "keywords",
            "journal",
            "publication_date",
            "doi",
            "short_summary"
        ],
        "additionalProperties" => false
    ];

    $instructions = <<<PROMPT
Analiza el PDF científico adjunto y extrae sus metadatos.

REGLAS OBLIGATORIAS:

1. Conserva el idioma original del documento.
2. No traduzcas el título, el abstract, las palabras clave ni los nombres.
3. No inventes autores, revistas, fechas, DOI ni resultados científicos.
4. Si un dato no aparece o no puede verificarse, devuelve null
   para los campos opcionales y listas vacías cuando corresponda.
5. Devuelve los autores como una lista de nombres.
6. El abstract debe conservar el contenido del abstract original.
   Si no existe, devuelve una cadena vacía.
7. Genera short_summary como una presentación breve e interesante
   de la investigación para una tarjeta de un sitio universitario.
8. El resumen corto debe basarse únicamente en el PDF, destacar
   el objetivo, el hallazgo o la relevancia cuando estén documentados,
   y tener como máximo 2 o 3 frases.
9. No exageres resultados ni presentes hipótesis como hechos.
10. El resumen corto no reemplaza ni modifica el abstract original.
11. No crees registros de investigadores ni propongas autores nuevos
    para la base de datos.
12. No generes una imagen en esta etapa.

Para publication_date, utiliza YYYY-MM-DD solo cuando el día,
mes y año estén disponibles. Si solo se conoce una fecha parcial,
devuelve null para evitar inventar precisión.

Devuelve exclusivamente los datos que exige el esquema JSON.
PROMPT;

    $requestBody = [
        "model" => $model,
        "input" => [
            [
                "role" => "user",
                "content" => [
                    [
                        "type" => "input_file",
                        "file_id" => $openAIFileId
                    ],
                    [
                        "type" => "input_text",
                        "text" => $instructions
                    ]
                ]
            ]
        ],
        "text" => [
            "format" => [
                "type" => "json_schema",
                "name" => "paper_metadata",
                "strict" => true,
                "schema" => $schema
            ]
        ]
    ];

    $analysisResponse = openAIRequest(
        "https://api.openai.com/v1/responses",
        $apiKey,
        json_encode(
            $requestBody,
            JSON_UNESCAPED_UNICODE
        ),
        ["Content-Type: application/json"]
    );

    /*
    |--------------------------------------------------------------------------
    | 5. Obtener el JSON generado por el modelo
    |--------------------------------------------------------------------------
    */

    $outputText = "";

    if (!empty($analysisResponse["output"])) {
        foreach ($analysisResponse["output"] as $outputItem) {
            if (empty($outputItem["content"])) {
                continue;
            }

            foreach ($outputItem["content"] as $contentItem) {
                if (
                    ($contentItem["type"] ?? "") === "output_text"
                    && isset($contentItem["text"])
                ) {
                    $outputText .= $contentItem["text"];
                }
            }
        }
    }

    if ($outputText === "") {
        throw new Exception(
            "OpenAI no devolvió los datos del análisis."
        );
    }

    $paper = json_decode($outputText, true);

    if (!is_array($paper)) {
        throw new Exception(
            "No se pudo interpretar el resultado del análisis."
        );
    }

    /*
    |--------------------------------------------------------------------------
    | 6. Comprobar los campos esenciales
    |--------------------------------------------------------------------------
    */

    $requiredFields = [
        "title",
        "authors",
        "abstract",
        "keywords",
        "journal",
        "publication_date",
        "doi",
        "short_summary"
    ];

    foreach ($requiredFields as $field) {
        if (!array_key_exists($field, $paper)) {
            throw new Exception(
                "Falta el campo requerido en el análisis: " . $field
            );
        }
    }

    if (
        !is_string($paper["title"])
        || trim($paper["title"]) === ""
    ) {
        throw new Exception(
            "No se pudo identificar el título del paper."
        );
    }

    if (
        !is_array($paper["authors"])
        || !is_array($paper["keywords"])
        || !is_string($paper["abstract"])
        || !is_string($paper["short_summary"])
    ) {
        throw new Exception(
            "OpenAI devolvió datos con un formato inesperado."
        );
    }

    /*
    |--------------------------------------------------------------------------
    | 7. Responder al frontend
    |--------------------------------------------------------------------------
    |
    | Todavía no se guarda en la base de datos.
    | El frontend recibe los datos para el siguiente paso.
    |
    */

    respond(200, [
        "success" => true,
        "message" => "Paper analizado correctamente.",
        "file" => $fileName,
        "openai_file_id" => $openAIFileId,
        "paper" => $paper
    ]);

} catch (Throwable $error) {
    error_log(
        "Error analizando paper: " . $error->getMessage()
    );

    respond(500, [
        "success" => false,
        "error" => $error->getMessage()
    ]);
}
?>
