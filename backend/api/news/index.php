<?php

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN
|--------------------------------------------------------------------------
*/

header("Content-Type: application/json; charset=UTF-8");

header(
    "Access-Control-Allow-Origin: http://localhost:5173"
);

header(
    "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"
);

header(
    "Access-Control-Allow-Headers: Content-Type"
);


/*
|--------------------------------------------------------------------------
| CORS - PETICIÓN OPTIONS
|--------------------------------------------------------------------------
|
| El navegador puede enviar una petición OPTIONS antes de
| POST, PUT o DELETE para comprobar si la API permite
| ese tipo de petición.
|
*/

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(200);

    exit;
}


/*
|--------------------------------------------------------------------------
| CONTROLLER
|--------------------------------------------------------------------------
*/

require_once __DIR__ . "/../../controllers/NewsController.php";

$controller = new NewsController();


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
| OBTENER MÉTODO HTTP
|--------------------------------------------------------------------------
*/

$method = $_SERVER["REQUEST_METHOD"];


/*
|--------------------------------------------------------------------------
| OBTENER ID
|--------------------------------------------------------------------------
|
| Ejemplo:
|
| /api/news
|          ↑
|          no tiene ID
|
| /api/news/5
|          ↑
|          ID = 5
|
*/

$parts = explode("/", $requestUri);


/*
|--------------------------------------------------------------------------
| BUSCAR ID
|--------------------------------------------------------------------------
*/

$id = null;

if (
    count($parts) >= 4 &&
    $parts[1] === "api" &&
    $parts[2] === "news"
) {

    $id = $parts[3];

}


/*
|--------------------------------------------------------------------------
| GET /api/news
|--------------------------------------------------------------------------
|
| Obtiene todas las noticias.
|
| Ejemplo:
|
| /api/news?language=es
|
*/

if (
    $method === "GET" &&
    $requestUri === "/api/news"
) {

    try {

        /*
        |----------------------------------------------------------------------
        | Idioma
        |----------------------------------------------------------------------
        */

        $language = $_GET["language"] ?? "es";


        /*
        |----------------------------------------------------------------------
        | Obtener noticias
        |----------------------------------------------------------------------
        */

        $news = $controller->getAll($language);


        /*
        |----------------------------------------------------------------------
        | Respuesta
        |----------------------------------------------------------------------
        */

        echo json_encode(
            $news,
            JSON_UNESCAPED_UNICODE
        );

        exit;

    } catch (Exception $error) {

        http_response_code(500);

        echo json_encode([
            "error" => "Error al obtener las noticias.",
            "details" => $error->getMessage()
        ]);

        exit;
    }
}


/*
|--------------------------------------------------------------------------
| GET /api/news/{id}
|--------------------------------------------------------------------------
|
| Obtiene una noticia específica.
|
| Ejemplo:
|
| /api/news/1?language=es
|
*/

if (
    $method === "GET" &&
    $id !== null
) {

    try {

        /*
        |----------------------------------------------------------------------
        | Idioma
        |----------------------------------------------------------------------
        */

        $language = $_GET["language"] ?? "es";


        /*
        |----------------------------------------------------------------------
        | Obtener noticia
        |----------------------------------------------------------------------
        */

        $news = $controller->getOne(
            $id,
            $language
        );


        /*
        |----------------------------------------------------------------------
        | Noticia no encontrada
        |----------------------------------------------------------------------
        */

        if (!$news) {

            http_response_code(404);

            echo json_encode([
                "error" => "Noticia no encontrada."
            ]);

            exit;
        }


        /*
        |----------------------------------------------------------------------
        | Respuesta
        |----------------------------------------------------------------------
        */

        echo json_encode(
            $news,
            JSON_UNESCAPED_UNICODE
        );

        exit;

    } catch (Exception $error) {

        http_response_code(500);

        echo json_encode([
            "error" => "Error al obtener la noticia.",
            "details" => $error->getMessage()
        ]);

        exit;
    }
}


/*
|--------------------------------------------------------------------------
| POST /api/news
|--------------------------------------------------------------------------
|
| Crea una noticia.
|
*/

if (
    $method === "POST" &&
    $requestUri === "/api/news"
) {

    try {

        /*
        |----------------------------------------------------------------------
        | Obtener datos enviados por React
        |----------------------------------------------------------------------
        */

        $data = json_decode(
            file_get_contents("php://input"),
            true
        );


        /*
        |----------------------------------------------------------------------
        | Validar datos
        |----------------------------------------------------------------------
        */

        if (!$data) {

            http_response_code(400);

            echo json_encode([
                "error" => "No se recibieron datos."
            ]);

            exit;
        }


        /*
        |----------------------------------------------------------------------
        | Crear noticia
        |----------------------------------------------------------------------
        */

        $newsId = $controller->create($data);


        /*
        |----------------------------------------------------------------------
        | Respuesta
        |----------------------------------------------------------------------
        */

        http_response_code(201);

        echo json_encode([
            "message" => "Noticia creada correctamente.",
            "id" => $newsId
        ]);

        exit;

    } catch (Exception $error) {

        http_response_code(500);

        echo json_encode([
            "error" => "Error al crear la noticia.",
            "details" => $error->getMessage()
        ]);

        exit;
    }
}


/*
|--------------------------------------------------------------------------
| PUT /api/news/{id}
|--------------------------------------------------------------------------
|
| Actualiza una noticia.
|
*/

if (
    $method === "PUT" &&
    $id !== null
) {

    try {

        /*
        |----------------------------------------------------------------------
        | Obtener datos
        |----------------------------------------------------------------------
        */

        $data = json_decode(
            file_get_contents("php://input"),
            true
        );


        /*
        |----------------------------------------------------------------------
        | Validar datos
        |----------------------------------------------------------------------
        */

        if (!$data) {

            http_response_code(400);

            echo json_encode([
                "error" => "No se recibieron datos."
            ]);

            exit;
        }


        /*
        |----------------------------------------------------------------------
        | Actualizar
        |----------------------------------------------------------------------
        */

        $controller->update(
            $id,
            $data
        );


        /*
        |----------------------------------------------------------------------
        | Respuesta
        |----------------------------------------------------------------------
        */

        echo json_encode([
            "message" => "Noticia actualizada correctamente."
        ]);

        exit;

    } catch (Exception $error) {

        http_response_code(500);

        echo json_encode([
            "error" => "Error al actualizar la noticia.",
            "details" => $error->getMessage()
        ]);

        exit;
    }
}


/*
|--------------------------------------------------------------------------
| DELETE /api/news/{id}
|--------------------------------------------------------------------------
|
| Elimina una noticia.
|
*/

if (
    $method === "DELETE" &&
    $id !== null
) {

    try {

        /*
        |----------------------------------------------------------------------
        | Eliminar noticia
        |----------------------------------------------------------------------
        */

        $controller->delete($id);


        /*
        |----------------------------------------------------------------------
        | Respuesta
        |----------------------------------------------------------------------
        */

        echo json_encode([
            "message" => "Noticia eliminada correctamente."
        ]);

        exit;

    } catch (Exception $error) {

        http_response_code(500);

        echo json_encode([
            "error" => "Error al eliminar la noticia.",
            "details" => $error->getMessage()
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