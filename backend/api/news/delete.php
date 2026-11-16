
<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once __DIR__ . "/../../controllers/NewsController.php";

if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Método no permitido."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$id = filter_var(
    $_GET["id"] ?? null,
    FILTER_VALIDATE_INT,
    ["options" => ["min_range" => 1]]
);

if ($id === false || $id === null) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Falta un ID válido para la noticia."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

try {
    $controller = new NewsController();
    $controller->delete($id);

    echo json_encode([
        "success" => true,
        "message" => "Solicitud de eliminación procesada."
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $error) {
    error_log("Error al eliminar noticia: " . $error->getMessage());

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "No se pudo eliminar la noticia."
    ], JSON_UNESCAPED_UNICODE);
}
