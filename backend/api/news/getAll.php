<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../controllers/NewsController.php";

$language = $_GET["language"] ?? "es";

$controller = new NewsController();

try {

    $news = $controller->getAll($language);

    echo json_encode(
        $news,
        JSON_UNESCAPED_UNICODE
    );

} catch (Exception $error) {

    http_response_code(500);

    echo json_encode([
        "message" => "No se pudieron obtener las noticias.",
        "error" => $error->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}