
<?php

require_once __DIR__ . "/../config/database.php";

class ResearchRepository
{
    private $db;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->connect();
    }

    /*
    |--------------------------------------------------------------------------
    | Obtener todas las áreas de investigación
    |--------------------------------------------------------------------------
    | Incluye la cantidad de investigadores y papers asociados.
    */
    public function getAll($language = "es")
    {
        $sql = "
            SELECT
                rg.id,
                rg.slug,
                rg.image,
                rgt.name,
                rgt.summary,
                rgt.description,

                COUNT(DISTINCT ig.investigator_id)
                    AS researchers_count,

                COUNT(DISTINCT prg.paper_id)
                    AS papers_count

            FROM research_groups rg

            INNER JOIN research_group_translations rgt
                ON rg.id = rgt.research_group_id

            LEFT JOIN investigator_group ig
                ON rg.id = ig.research_group_id

            LEFT JOIN paper_research_group prg
                ON rg.id = prg.research_group_id

            WHERE rgt.language = :language

            GROUP BY
                rg.id,
                rg.slug,
                rg.image,
                rgt.name,
                rgt.summary,
                rgt.description

            ORDER BY rgt.name ASC
        ";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            ":language" => $language
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    /*
    |--------------------------------------------------------------------------
    | Obtener una área de investigación por su slug
    |--------------------------------------------------------------------------
    | Incluye sus investigadores y sus papers.
    */
    public function getOne($slug, $language = "es")
    {
        // 1. Obtener información del área.

        $sql = "
            SELECT
                rg.id,
                rg.slug,
                rg.image,
                rgt.name,
                rgt.summary,
                rgt.description

            FROM research_groups rg

            INNER JOIN research_group_translations rgt
                ON rg.id = rgt.research_group_id

            WHERE
                rg.slug = :slug
                AND rgt.language = :language

            LIMIT 1
        ";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            ":slug" => $slug,
            ":language" => $language
        ]);

        $research = $stmt->fetch(PDO::FETCH_ASSOC);

        // Si el área no existe, devolvemos null.

        if (!$research) {
            return null;
        }


        // 2. Obtener investigadores asociados al área.

        $sql = "
            SELECT
                i.id,
                i.slug,
                i.image,
                i.email,
                it.name,
                it.last_name,
                it.degree,
                it.position,
                it.area,
                it.summary

            FROM investigator_group ig

            INNER JOIN investigators i
                ON ig.investigator_id = i.id

            INNER JOIN investigator_translations it
                ON i.id = it.investigator_id

            WHERE
                ig.research_group_id = :research_group_id
                AND it.language = :language

            ORDER BY it.name ASC
        ";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            ":research_group_id" => $research["id"],
            ":language" => $language
        ]);

        $research["investigators"] = $stmt->fetchAll(PDO::FETCH_ASSOC);


        // 3. Obtener papers asociados al área.

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

            FROM paper_research_group prg

            INNER JOIN papers p
                ON prg.paper_id = p.id

            LEFT JOIN paper_translations pt
                ON p.id = pt.paper_id
                AND pt.language = :language

            WHERE prg.research_group_id = :research_group_id

            ORDER BY p.publication_date DESC, p.id DESC
        ";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            ":language" => $language,
            ":research_group_id" => $research["id"]
        ]);

        $papers = $stmt->fetchAll(PDO::FETCH_ASSOC);


        // 4. Obtener los autores de cada paper.

        $sqlAuthors = "
            SELECT
                pa.paper_id,
                pa.name,
                pa.investigator_id,
                i.slug AS investigator_slug

            FROM paper_authors pa

            LEFT JOIN investigators i
                ON pa.investigator_id = i.id

            WHERE pa.paper_id = :paper_id

            ORDER BY pa.id ASC
        ";

        $stmtAuthors = $this->db->prepare($sqlAuthors);

        foreach ($papers as &$paper) {

            $stmtAuthors->execute([
                ":paper_id" => $paper["id"]
            ]);

            $paper["authors"] = $stmtAuthors->fetchAll(PDO::FETCH_ASSOC);
        }

        unset($paper);


        // 5. Agregar los papers al resultado.

        $research["papers"] = $papers;

        // 6. Devolver toda la información.

        return $research;
    }
}