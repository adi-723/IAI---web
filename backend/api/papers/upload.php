<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// =====================================================
// CORS - OPTIONS
// =====================================================

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(200);

    exit;

}


// =====================================================
// RESPUESTA JSON
// =====================================================

header("Content-Type: application/json; charset=UTF-8");


// =====================================================
// SOLO POST
// =====================================================

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "error" => "Método no permitido."
    ]);

    exit;

}


// =====================================================
// COMPROBAR QUE EXISTE EL ARCHIVO
// =====================================================

if (!isset($_FILES["paper"])) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "No se recibió ningún archivo PDF."
    ]);

    exit;

}


$file = $_FILES["paper"];


// =====================================================
// COMPROBAR ERRORES DE SUBIDA
// =====================================================

if ($file["error"] !== UPLOAD_ERR_OK) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "Ocurrió un error al subir el archivo."
    ]);

    exit;

}


// =====================================================
// COMPROBAR EXTENSIÓN
// =====================================================

$extension = strtolower(
    pathinfo($file["name"], PATHINFO_EXTENSION)
);


if ($extension !== "pdf") {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "Solo se permiten archivos PDF."
    ]);

    exit;

}


// =====================================================
// COMPROBAR TIPO MIME REAL
// =====================================================

$finfo = new finfo(FILEINFO_MIME_TYPE);

$mimeType = $finfo->file($file["tmp_name"]);


if ($mimeType !== "application/pdf") {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "El archivo seleccionado no es un PDF válido."
    ]);

    exit;

}


// =====================================================
// TAMAÑO MÁXIMO
// =====================================================

$maxSize = 20 * 1024 * 1024; // 20 MB


if ($file["size"] > $maxSize) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "El PDF no puede superar los 20 MB."
    ]);

    exit;

}


// =====================================================
// NOMBRE ÚNICO
// =====================================================

$fileName = "paper-" . uniqid() . ".pdf";


// =====================================================
// CARPETA DE DESTINO
// =====================================================

$uploadDirectory = "../../upload/papers/";


// Crear carpeta si no existe

if (!is_dir($uploadDirectory)) {

    mkdir(
        $uploadDirectory,
        0777,
        true
    );

}


// =====================================================
// DESTINO FINAL
// =====================================================

$destination = $uploadDirectory . $fileName;


// =====================================================
// MOVER ARCHIVO
// =====================================================

if (!move_uploaded_file(
    $file["tmp_name"],
    $destination
)) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "error" => "No se pudo guardar el PDF en el servidor."
    ]);

    exit;

}


// =====================================================
// RESPUESTA
// =====================================================

echo json_encode([

    "success" => true,

    "message" => "PDF subido correctamente.",

    "file" => $fileName,

    "path" => "/upload/papers/" . $fileName

], JSON_UNESCAPED_UNICODE);

?>