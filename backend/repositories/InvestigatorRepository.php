<?php

require_once __DIR__ . "/../config/database.php";

class InvestigatorRepository
{
    private $connection;

    public function __construct()
    {
        $database = new Database();
        $this->connection = $database->connect();
    }

    public function getAll($language = "es")
    {
        $sql = "
            SELECT
                i.id,
                i.slug,
                i.image,
                i.email,
                i.office,
                i.scholar,
                i.orcid,
                i.researchgate,
                i.website,

                t.name,
                t.degree,
                t.position,
                t.area,
                t.summary,
                t.biography

            FROM investigators i

            INNER JOIN investigator_translations t
                ON i.id = t.investigator_id

            WHERE t.language = :language

            ORDER BY t.name ASC
        ";

        $statement = $this->connection->prepare($sql);

        $statement->bindParam(
            ":language",
            $language
        );

        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getOne($id, $language = "es")
    {
        $sql = "
            SELECT
                i.id,
                i.slug,
                i.image,
                i.email,
                i.office,
                i.scholar,
                i.orcid,
                i.researchgate,
                i.website,

                t.name,
                t.degree,
                t.position,
                t.area,
                t.summary,
                t.biography

            FROM investigators i

            INNER JOIN investigator_translations t
                ON i.id = t.investigator_id

            WHERE i.id = :id
            AND t.language = :language

            LIMIT 1
        ";

        $statement = $this->connection->prepare($sql);

        $statement->bindParam(
            ":id",
            $id,
            PDO::PARAM_INT
        );

        $statement->bindParam(
            ":language",
            $language
        );

        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        return $result ?: null;
    }

    public function create($data)
    {
        $this->connection->beginTransaction();

        try {
            $sql = "
                INSERT INTO investigators
                (
                    slug,
                    image,
                    email,
                    office,
                    scholar,
                    orcid,
                    researchgate,
                    website
                )
                VALUES
                (
                    :slug,
                    :image,
                    :email,
                    :office,
                    :scholar,
                    :orcid,
                    :researchgate,
                    :website
                )
            ";

            $statement = $this->connection->prepare($sql);

            $statement->execute([
                ":slug" => $data["slug"],
                ":image" => $data["image"] ?? null,
                ":email" => $data["email"] ?? null,
                ":office" => $data["office"] ?? null,
                ":scholar" => $data["scholar"] ?? null,
                ":orcid" => $data["orcid"] ?? null,
                ":researchgate" => $data["researchgate"] ?? null,
                ":website" => $data["website"] ?? null
            ]);

            $investigatorId = $this->connection->lastInsertId();

            $translationSql = "
                INSERT INTO investigator_translations
                (
                    investigator_id,
                    language,
                    name,
                    degree,
                    position,
                    area,
                    summary,
                    biography
                )
                VALUES
                (
                    :investigator_id,
                    :language,
                    :name,
                    :degree,
                    :position,
                    :area,
                    :summary,
                    :biography
                )
            ";

            $translationStatement = $this->connection->prepare(
                $translationSql
            );

            foreach ($data["translations"] as $translation) {
                $translationStatement->execute([
                    ":investigator_id" => $investigatorId,
                    ":language" => $translation["language"],
                    ":name" => $translation["name"],
                    ":degree" => $translation["degree"] ?? null,
                    ":position" => $translation["position"] ?? null,
                    ":area" => $translation["area"] ?? null,
                    ":summary" => $translation["summary"] ?? null,
                    ":biography" => $translation["biography"] ?? null
                ]);
            }

            $this->connection->commit();

            return $investigatorId;

        } catch (Exception $error) {
            $this->connection->rollBack();
            throw $error;
        }
    }

    public function update($id, $data)
    {
        $this->connection->beginTransaction();

        try {
            $sql = "
                UPDATE investigators
                SET
                    slug = :slug,
                    image = :image,
                    email = :email,
                    office = :office,
                    scholar = :scholar,
                    orcid = :orcid,
                    researchgate = :researchgate,
                    website = :website
                WHERE id = :id
            ";

            $statement = $this->connection->prepare($sql);

            $statement->execute([
                ":id" => $id,
                ":slug" => $data["slug"],
                ":image" => $data["image"] ?? null,
                ":email" => $data["email"] ?? null,
                ":office" => $data["office"] ?? null,
                ":scholar" => $data["scholar"] ?? null,
                ":orcid" => $data["orcid"] ?? null,
                ":researchgate" => $data["researchgate"] ?? null,
                ":website" => $data["website"] ?? null
            ]);

            if (isset($data["translations"])) {
                $translationSql = "
                    UPDATE investigator_translations
                    SET
                        name = :name,
                        degree = :degree,
                        position = :position,
                        area = :area,
                        summary = :summary,
                        biography = :biography
                    WHERE investigator_id = :investigator_id
                    AND language = :language
                ";

                $translationStatement = $this->connection->prepare(
                    $translationSql
                );

                foreach ($data["translations"] as $translation) {
                    $translationStatement->execute([
                        ":investigator_id" => $id,
                        ":language" => $translation["language"],
                        ":name" => $translation["name"],
                        ":degree" => $translation["degree"] ?? null,
                        ":position" => $translation["position"] ?? null,
                        ":area" => $translation["area"] ?? null,
                        ":summary" => $translation["summary"] ?? null,
                        ":biography" => $translation["biography"] ?? null
                    ]);
                }
            }

            $this->connection->commit();

            return true;

        } catch (Exception $error) {
            $this->connection->rollBack();
            throw $error;
        }
    }

    public function delete($id)
    {
        $this->connection->beginTransaction();

        try {
            $statement = $this->connection->prepare(
                "DELETE FROM investigators
                 WHERE id = :id"
            );

            $statement->execute([
                ":id" => $id
            ]);

            $this->connection->commit();

            return true;

        } catch (Exception $error) {
            $this->connection->rollBack();
            throw $error;
        }
    }
}