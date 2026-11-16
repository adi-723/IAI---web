
<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);

    exit;
}

require_once __DIR__ . "/../../controllers/ResearchController.php";

try {

    $controller = new ResearchController();

    $research = $controller->getOne();

    if (!$research) {
        http_response_code(404);

        echo json_encode([
            "success" => false,
            "message" => "Research group not found."
        ]);

        exit;
    }

    echo json_encode([
        "success" => true,
        "data" => $research
    ]);

} catch (InvalidArgumentException $e) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

} catch (Throwable $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Internal server error."
    ]);

}