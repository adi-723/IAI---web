<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../controllers/NewsController.php";

if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {

    http_response_code(405);

    echo json_encode([
        "message" => "Método no permitido."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$id = $_GET["id"] ?? null;

if (!$id) {

    http_response_code(400);

    echo json_encode([
        "message" => "Falta el ID de la noticia."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$controller = new NewsController();

try {

    $controller->delete($id);

    echo json_encode([
        "message" => "Noticia eliminada correctamente."
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $error) {

    http_response_code(500);

    echo json_encode([
        "message" => "No se pudo eliminar la noticia.",
        "error" => $error->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}