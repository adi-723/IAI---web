<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");

require_once "../../config/database.php";

$database = new Database();
$db = $database->connect();

$id = $_GET["id"] ?? null;
$language = $_GET["language"] ?? "es";

if (!$id) {

    http_response_code(400);

    echo json_encode([
        "error" => "No se especificó el paper."
    ]);

    exit;
}

if ($language !== "es" && $language !== "en") {
    $language = "es";
}

try {

    /*
     * Obtener información principal del paper
     */

    $sql = "
        SELECT
            p.id,
            p.image,
            p.doi,
            p.publication_date,
            p.journal,
            p.pdf,
            pt.title,
            pt.abstract,
            pt.keywords

        FROM papers p

        INNER JOIN paper_translations pt
            ON p.id = pt.paper_id

        WHERE p.id = :id
        AND pt.language = :language

        LIMIT 1
    ";

    $stmt = $db->prepare($sql);

    $stmt->execute([
        ":id" => $id,
        ":language" => $language
    ]);

    $paper = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$paper) {

        http_response_code(404);

        echo json_encode([
            "error" => "Paper no encontrado."
        ]);

        exit;
    }


    /*
     * Obtener autores
     */

    $authorsSql = "
        SELECT
            i.id,
            i.slug,
            i.image,
            it.name

        FROM paper_authors pa

        INNER JOIN investigators i
            ON pa.investigator_id = i.id

        INNER JOIN investigator_translations it
            ON i.id = it.investigator_id

        WHERE pa.paper_id = :paper_id
        AND it.language = :language

        ORDER BY it.name ASC
    ";

    $authorsStmt = $db->prepare($authorsSql);

    $authorsStmt->execute([
        ":paper_id" => $id,
        ":language" => $language
    ]);

    $authors = $authorsStmt->fetchAll(PDO::FETCH_ASSOC);

    $paper["authors"] = $authors;


    /*
     * Enviar respuesta
     */

    echo json_encode(
        $paper,
        JSON_UNESCAPED_UNICODE
    );

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Error al obtener el paper."
    ]);
}