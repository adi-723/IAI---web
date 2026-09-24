<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


/*
|--------------------------------------------------------------------------
| OPTIONS
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(200);

    exit;

}


/*
|--------------------------------------------------------------------------
| Comprobar método
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "message" => "Método no permitido."
    ], JSON_UNESCAPED_UNICODE);

    exit;

}


require_once __DIR__ . "/../../controllers/NewsController.php";


/*
|--------------------------------------------------------------------------
| Obtener datos
|--------------------------------------------------------------------------
*/

$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (!$data) {

    http_response_code(400);

    echo json_encode([
        "message" =>
            "El cuerpo de la solicitud no es válido."
    ], JSON_UNESCAPED_UNICODE);

    exit;

}


/*
|--------------------------------------------------------------------------
| Validar idioma
|--------------------------------------------------------------------------
*/

$language = $data["language"] ?? "es";


if (
    $language !== "es" &&
    $language !== "en"
) {

    http_response_code(400);

    echo json_encode([
        "message" =>
            "El idioma debe ser es o en."
    ], JSON_UNESCAPED_UNICODE);

    exit;

}


/*
|--------------------------------------------------------------------------
| Validar campos
|--------------------------------------------------------------------------
*/

if (
    empty($data["title"]) ||
    empty($data["summary"]) ||
    empty($data["content"]) ||
    empty($data["publish_date"])
) {

    http_response_code(400);

    echo json_encode([
        "message" =>
            "Faltan datos obligatorios."
    ], JSON_UNESCAPED_UNICODE);

    exit;

}


/*
|--------------------------------------------------------------------------
| Idioma de destino
|--------------------------------------------------------------------------
*/

$targetLanguage =
    $language === "es"
        ? "en"
        : "es";


/*
|--------------------------------------------------------------------------
| Función de traducción
|--------------------------------------------------------------------------
*/

function translateText(
    $text,
    $sourceLanguage,
    $targetLanguage
) {

    if (
        empty(trim($text))
    ) {

        return "";

    }


    /*
    | MyMemory tiene un límite de tamaño por consulta.
    | Para títulos y resúmenes normalmente será suficiente.
    */

    $url =
        "https://api.mymemory.translated.net/get" .
        "?q=" .
        urlencode($text) .
        "&langpair=" .
        urlencode(
            $sourceLanguage .
            "|" .
            $targetLanguage
        );


    /*
    | Realizar petición
    */

    $response = @file_get_contents($url);


    if ($response === false) {

        throw new Exception(
            "No fue posible conectarse con el servicio de traducción."
        );

    }


    $result = json_decode(
        $response,
        true
    );


    if (
        !$result ||
        !isset(
            $result["responseData"]
        ) ||
        !isset(
            $result["responseData"]["translatedText"]
        )
    ) {

        throw new Exception(
            "El servicio de traducción no devolvió una respuesta válida."
        );

    }


    return $result[
        "responseData"
    ][
        "translatedText"
    ];

}


/*
|--------------------------------------------------------------------------
| Traducir contenido
|--------------------------------------------------------------------------
*/

try {

    $translatedTitle =
        translateText(
            $data["title"],
            $language,
            $targetLanguage
        );


    $translatedSummary =
        translateText(
            $data["summary"],
            $language,
            $targetLanguage
        );


    $translatedContent =
        translateText(
            $data["content"],
            $language,
            $targetLanguage
        );


    /*
    |--------------------------------------------------------------------------
    | Preparar traducciones
    |--------------------------------------------------------------------------
    */

    if ($language === "es") {

        $translations = [

            [
                "language" => "es",

                "title" =>
                    $data["title"],

                "summary" =>
                    $data["summary"],

                "content" =>
                    $data["content"]
            ],

            [
                "language" => "en",

                "title" =>
                    $translatedTitle,

                "summary" =>
                    $translatedSummary,

                "content" =>
                    $translatedContent
            ]

        ];

    } else {

        $translations = [

            [
                "language" => "en",

                "title" =>
                    $data["title"],

                "summary" =>
                    $data["summary"],

                "content" =>
                    $data["content"]
            ],

            [
                "language" => "es",

                "title" =>
                    $translatedTitle,

                "summary" =>
                    $translatedSummary,

                "content" =>
                    $translatedContent
            ]

        ];

    }


    /*
    |--------------------------------------------------------------------------
    | Crear datos para Repository
    |--------------------------------------------------------------------------
    */

    $newsData = [

        "image" =>
            $data["image"] ?? null,

        "publish_date" =>
            $data["publish_date"],

        "translations" =>
            $translations

    ];


    /*
    |--------------------------------------------------------------------------
    | Crear noticia
    |--------------------------------------------------------------------------
    */

    $controller =
        new NewsController();


    $id =
        $controller->create(
            $newsData
        );


    /*
    |--------------------------------------------------------------------------
    | Respuesta
    |--------------------------------------------------------------------------
    */

    http_response_code(201);

    echo json_encode([

        "message" =>
            "Noticia creada correctamente.",

        "id" =>
            $id,

        "language" =>
            $language,

        "translated_language" =>
            $targetLanguage

    ], JSON_UNESCAPED_UNICODE);


} catch (Exception $error) {

    http_response_code(500);

    echo json_encode([

        "message" =>
            "No se pudo crear la noticia.",

        "error" =>
            $error->getMessage()

    ], JSON_UNESCAPED_UNICODE);

}