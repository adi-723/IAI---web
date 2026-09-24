<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


/*
|--------------------------------------------------------------------------
| OPTIONS
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(200);

    exit;

}


/*
|--------------------------------------------------------------------------
| Método
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "message" =>
            "Método no permitido."
    ], JSON_UNESCAPED_UNICODE);

    exit;

}


/*
|--------------------------------------------------------------------------
| Comprobar imagen
|--------------------------------------------------------------------------
*/

if (!isset($_FILES["image"])) {

    http_response_code(400);

    echo json_encode([
        "message" =>
            "No se recibió ninguna imagen."
    ], JSON_UNESCAPED_UNICODE);

    exit;

}


$image = $_FILES["image"];


/*
|--------------------------------------------------------------------------
| Error de subida
|--------------------------------------------------------------------------
*/

if (
    $image["error"] !==
    UPLOAD_ERR_OK
) {

    http_response_code(400);

    echo json_encode([
        "message" =>
            "Ocurrió un error al subir la imagen."
    ], JSON_UNESCAPED_UNICODE);

    exit;

}


/*
|--------------------------------------------------------------------------
| Tipos permitidos
|--------------------------------------------------------------------------
*/

$allowedTypes = [

    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"

];


if (
    !in_array(
        $image["type"],
        $allowedTypes
    )
) {

    http_response_code(400);

    echo json_encode([
        "message" =>
            "El formato de imagen no está permitido."
    ], JSON_UNESCAPED_UNICODE);

    exit;

}


/*
|--------------------------------------------------------------------------
| Extensión
|--------------------------------------------------------------------------
*/

$extension =
    strtolower(
        pathinfo(
            $image["name"],
            PATHINFO_EXTENSION
        )
    );


/*
|--------------------------------------------------------------------------
| Nombre nuevo
|--------------------------------------------------------------------------
*/

$fileName =
    uniqid(
        "news_",
        true
    ) .
    "." .
    $extension;


/*
|--------------------------------------------------------------------------
| Carpeta frontend
|--------------------------------------------------------------------------
*/

$uploadDirectory =
    __DIR__ .
    "/../../../frontend/public/images/news/";


/*
|--------------------------------------------------------------------------
| Crear carpeta
|--------------------------------------------------------------------------
*/

if (
    !is_dir(
        $uploadDirectory
    )
) {

    mkdir(
        $uploadDirectory,
        0777,
        true
    );

}


/*
|--------------------------------------------------------------------------
| Ruta final
|--------------------------------------------------------------------------
*/

$filePath =
    $uploadDirectory .
    $fileName;


/*
|--------------------------------------------------------------------------
| Mover archivo
|--------------------------------------------------------------------------
*/

if (
    !move_uploaded_file(
        $image["tmp_name"],
        $filePath
    )
) {

    http_response_code(500);

    echo json_encode([
        "message" =>
            "No se pudo guardar la imagen."
    ], JSON_UNESCAPED_UNICODE);

    exit;

}


/*
|--------------------------------------------------------------------------
| Ruta pública
|--------------------------------------------------------------------------
*/

$imageUrl =
    "/images/news/" .
    $fileName;


/*
|--------------------------------------------------------------------------
| Respuesta
|--------------------------------------------------------------------------
*/

echo json_encode([

    "message" =>
        "Imagen subida correctamente.",

    "image" =>
        $imageUrl

], JSON_UNESCAPED_UNICODE);