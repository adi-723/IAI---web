
<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Método no permitido."
    ]);

    exit;
}

require_once __DIR__ . "/../../controllers/ResearchController.php";

try {
    $controller = new ResearchController();

    $researchGroups = $controller->getAll();

    echo json_encode([
        "success" => true,
        "data" => $researchGroups
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log("Error al obtener grupos de investigación: " . $e->getMessage());

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "No se pudieron obtener los grupos de investigación."
    ], JSON_UNESCAPED_UNICODE);
}
