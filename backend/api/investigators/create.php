<?php

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../controllers/InvestigatorController.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);

    echo json_encode([
        "message" => "Método no permitido."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if (!$data) {
    http_response_code(400);

    echo json_encode([
        "message" => "El cuerpo de la solicitud no es válido."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$controller = new InvestigatorController();

try {
    $id = $controller->create($data);

    echo json_encode([
        "message" => "Investigador creado correctamente.",
        "id" => $id
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $error) {
    http_response_code(500);

    echo json_encode([
        "message" => "No se pudo crear el investigador.",
        "error" => $error->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}