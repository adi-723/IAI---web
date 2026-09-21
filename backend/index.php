<?php

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN
|--------------------------------------------------------------------------
*/

header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


/*
|--------------------------------------------------------------------------
| CORS - PETICIÓN OPTIONS
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}


/*
|--------------------------------------------------------------------------
| CONEXIÓN MYSQL
|--------------------------------------------------------------------------
*/

$host = "localhost";
$dbname = "instituto_iai";
$username = "root";
$password = "";

try {

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "No se pudo conectar a la base de datos.",
        "details" => $e->getMessage()
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| OBTENER RUTA
|--------------------------------------------------------------------------
*/

$requestUri = parse_url(
    $_SERVER["REQUEST_URI"],
    PHP_URL_PATH
);

$requestUri = rtrim($requestUri, "/");


/*
|--------------------------------------------------------------------------
| GET /api/investigators
|--------------------------------------------------------------------------
|
| Obtiene todos los investigadores.
|
*/

if (
    $_SERVER["REQUEST_METHOD"] === "GET" &&
    $requestUri === "/api/investigators"
) {

    try {

        $language = $_GET["language"] ?? "es";


        /*
        |--------------------------------------------------------------------------
        | INVESTIGADORES
        |--------------------------------------------------------------------------
        */

        $sql = "
            SELECT
                i.id,
                i.slug,
                i.image,
                i.email,
                i.office,
                i.scholar,
                i.orcid,
                i.researchgate,
                i.website,

                t.name,
                t.degree,
                t.position,
                t.area,
                t.summary,
                t.biography

            FROM investigators i

            INNER JOIN investigator_translations t
                ON t.investigator_id = i.id

            WHERE t.language = :language

            ORDER BY t.name ASC
        ";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            "language" => $language
        ]);

        $investigators = $stmt->fetchAll();


        /*
        |--------------------------------------------------------------------------
        | INTERESES
        |--------------------------------------------------------------------------
        */

        foreach ($investigators as &$investigator) {

            $interestSql = "
                SELECT interest

                FROM investigator_interests

                WHERE investigator_id = :investigator_id

                AND language = :language

                ORDER BY id ASC
            ";

            $interestStmt = $pdo->prepare($interestSql);

            $interestStmt->execute([
                "investigator_id" => $investigator["id"],
                "language" => $language
            ]);

            $investigator["interests"] =
                $interestStmt->fetchAll(
                    PDO::FETCH_COLUMN
                );
        }

        unset($investigator);


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        echo json_encode(
            $investigators,
            JSON_UNESCAPED_UNICODE
        );

        exit;

    } catch (PDOException $e) {

        http_response_code(500);

        echo json_encode([
            "error" => "Error al obtener los investigadores.",
            "details" => $e->getMessage()
        ]);

        exit;
    }
}


/*
|--------------------------------------------------------------------------
| GET /api/investigators/{slug}
|--------------------------------------------------------------------------
|
| Obtiene un investigador específico.
|
*/

if (
    $_SERVER["REQUEST_METHOD"] === "GET" &&
    str_starts_with(
        $requestUri,
        "/api/investigators/"
    )
) {

    try {

        $slug = basename($requestUri);

        $language = $_GET["language"] ?? "es";


        /*
        |--------------------------------------------------------------------------
        | INVESTIGADOR
        |--------------------------------------------------------------------------
        */

        $sql = "
            SELECT
                i.id,
                i.slug,
                i.image,
                i.email,
                i.office,
                i.scholar,
                i.orcid,
                i.researchgate,
                i.website,

                t.name,
                t.degree,
                t.position,
                t.area,
                t.summary,
                t.biography

            FROM investigators i

            INNER JOIN investigator_translations t
                ON t.investigator_id = i.id

            WHERE i.slug = :slug

            AND t.language = :language

            LIMIT 1
        ";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            "slug" => $slug,
            "language" => $language
        ]);

        $investigator = $stmt->fetch();


        /*
        |--------------------------------------------------------------------------
        | INVESTIGADOR NO ENCONTRADO
        |--------------------------------------------------------------------------
        */

        if (!$investigator) {

            http_response_code(404);

            echo json_encode([
                "error" => "Investigador no encontrado."
            ]);

            exit;
        }


        /*
        |--------------------------------------------------------------------------
        | INTERESES
        |--------------------------------------------------------------------------
        */

        $interestSql = "
            SELECT interest

            FROM investigator_interests

            WHERE investigator_id = :investigator_id

            AND language = :language

            ORDER BY id ASC
        ";

        $interestStmt = $pdo->prepare($interestSql);

        $interestStmt->execute([
            "investigator_id" => $investigator["id"],
            "language" => $language
        ]);

        $investigator["interests"] =
            $interestStmt->fetchAll(
                PDO::FETCH_COLUMN
            );


        /*
        |--------------------------------------------------------------------------
        | EDUCACIÓN
        |--------------------------------------------------------------------------
        */

        $educationSql = "
            SELECT education

            FROM investigator_education

            WHERE investigator_id = :investigator_id

            AND language = :language

            ORDER BY id ASC
        ";

        $educationStmt = $pdo->prepare($educationSql);

        $educationStmt->execute([
            "investigator_id" => $investigator["id"],
            "language" => $language
        ]);

        $investigator["education"] =
            $educationStmt->fetchAll(
                PDO::FETCH_COLUMN
            );


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        echo json_encode(
            $investigator,
            JSON_UNESCAPED_UNICODE
        );

        exit;

    } catch (PDOException $e) {

        http_response_code(500);

        echo json_encode([
            "error" => "Error al obtener el investigador.",
            "details" => $e->getMessage()
        ]);

        exit;
    }
}


/*
|--------------------------------------------------------------------------
| ENDPOINT NO ENCONTRADO
|--------------------------------------------------------------------------
*/

http_response_code(404);

echo json_encode([
    "error" => "Endpoint no encontrado.",
    "path" => $requestUri
]);

exit;
