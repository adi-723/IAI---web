
<?php

require_once __DIR__ . "/../../config/auth.php";
require_once __DIR__ . "/../../controllers/AuthController.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    jsonResponse(405, [
        "success" => false,
        "message" => "Método no permitido."
    ]);
}

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

if ($email === "" || $password === "") {

    jsonResponse(400, [
        "success" => false,
        "message" => "Debes ingresar correo y contraseña."
    ]);
}

$auth = new AuthController();

$auth->login($email, $password);