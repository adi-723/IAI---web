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

$language = $_GET["language"] ?? "es";

if ($language !== "es" && $language !== "en") {
    $language = "es";
}

try {

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

        WHERE pt.language = :language

        ORDER BY p.publication_date DESC, p.id DESC
    ";

    $stmt = $db->prepare($sql);

    $stmt->execute([
        ":language" => $language
    ]);

    $papers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(
        $papers,
        JSON_UNESCAPED_UNICODE
    );

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "error" => "Error al obtener los papers."
    ]);
}