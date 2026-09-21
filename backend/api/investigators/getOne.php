<?php

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../controllers/InvestigatorController.php";

$id = $_GET["id"] ?? null;
$language = $_GET["language"] ?? "es";

if (!$id) {
    http_response_code(400);

    echo json_encode([
        "message" => "Falta el ID del investigador."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$controller = new InvestigatorController();

$investigator = $controller->getOne(
    $id,
    $language
);

if (!$investigator) {
    http_response_code(404);

    echo json_encode([
        "message" => "Investigador no encontrado."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

echo json_encode(
    $investigator,
    JSON_UNESCAPED_UNICODE
);