<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/../../controllers/InvestigatorController.php";

$identifier = $_GET["id"] ?? $_GET["slug"] ?? null;
$language = $_GET["language"] ?? "es";

if (!$identifier) {

    http_response_code(400);

    echo json_encode([
        "message" => "Falta el ID o slug del investigador."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$controller = new InvestigatorController();

$investigator = $controller->getOne(
    $identifier,
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