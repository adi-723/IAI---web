
<?php

require_once __DIR__ . "/../../config/auth.php";
require_once __DIR__ . "/../../controllers/AuthController.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {

    jsonResponse(405, [
        "success" => false,
        "message" => "Método no permitido."
    ]);
}

$auth = new AuthController();

$auth->me();
