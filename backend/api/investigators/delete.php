<?php

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../controllers/InvestigatorController.php";

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
        "message" => "Falta el ID del investigador."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$controller = new InvestigatorController();

try {
    $controller->delete($id);

    echo json_encode([
        "message" => "Investigador eliminado correctamente."
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $error) {
    http_response_code(500);

    echo json_encode([
        "message" => "No se pudo eliminar el investigador.",
        "error" => $error->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}