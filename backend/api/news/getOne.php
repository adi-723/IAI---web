<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../controllers/NewsController.php";

$id = $_GET["id"] ?? null;

if (!$id) {

    http_response_code(400);

    echo json_encode([
        "message" => "Falta el ID de la noticia."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$language = $_GET["language"] ?? "es";

$controller = new NewsController();

try {

    $news = $controller->getOne($id, $language);

    if (!$news) {

        http_response_code(404);

        echo json_encode([
            "message" => "Noticia no encontrada."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    echo json_encode(
        $news,
        JSON_UNESCAPED_UNICODE
    );

} catch (Exception $error) {

    http_response_code(500);

    echo json_encode([
        "message" => "No se pudo obtener la noticia.",
        "error" => $error->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}