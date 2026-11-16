
<?php

// Origen permitido: nuestra aplicación React
$allowedOrigin = "http://localhost:5173";

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: " . $allowedOrigin);
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Configuración de sesión
if (session_status() === PHP_SESSION_NONE) {

    session_set_cookie_params([
        "lifetime" => 0,
        "path" => "/",
        "domain" => "",
        "secure" => false, // true cuando utilicemos HTTPS
        "httponly" => true,
        "samesite" => "Lax"
    ]);

    session_start();
}

// Respuesta a peticiones OPTIONS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// Función para responder JSON
function jsonResponse($status, $data)
{
    http_response_code($status);

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE
    );

    exit;
}
