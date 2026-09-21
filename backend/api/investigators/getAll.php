<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../controllers/InvestigatorController.php";

$language = $_GET["language"] ?? "es";

$controller = new InvestigatorController();

echo json_encode(
    $controller->getAll($language),
    JSON_UNESCAPED_UNICODE
);