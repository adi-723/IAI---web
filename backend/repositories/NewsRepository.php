<?php

require_once __DIR__ . "/../config/database.php";

class NewsRepository
{
    private $connection;

    public function __construct()
    {
        // Creamos una conexión con la base de datos
        $database = new Database();

        // Guardamos la conexión para utilizarla
        // en los diferentes métodos
        $this->connection = $database->connect();
    }


    /*
    |--------------------------------------------------------------------------
    | OBTENER TODAS LAS NOTICIAS
    |--------------------------------------------------------------------------
    */

    public function getAll($language = "es")
    {
        $sql = "
            SELECT
                n.id,
                n.image,
                n.publish_date,
                n.created_at,

                t.title,
                t.summary,
                t.content

            FROM news n

            INNER JOIN news_translations t
                ON n.id = t.news_id

            WHERE t.language = :language

            ORDER BY n.publish_date DESC
        ";

        // Preparamos la consulta
        $statement = $this->connection->prepare($sql);

        // Indicamos el idioma que queremos
        $statement->bindParam(
            ":language",
            $language
        );

        // Ejecutamos la consulta
        $statement->execute();

        // Devolvemos todas las noticias
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }


    /*
    |--------------------------------------------------------------------------
    | OBTENER UNA NOTICIA
    |--------------------------------------------------------------------------
    */

    public function getOne($id, $language = "es")
    {
        $sql = "
            SELECT
                n.id,
                n.image,
                n.publish_date,
                n.created_at,

                t.title,
                t.summary,
                t.content

            FROM news n

            INNER JOIN news_translations t
                ON n.id = t.news_id

            WHERE n.id = :id
            AND t.language = :language

            LIMIT 1
        ";

        // Preparamos la consulta
        $statement = $this->connection->prepare($sql);

        // ID de la noticia
        $statement->bindParam(
            ":id",
            $id,
            PDO::PARAM_INT
        );

        // Idioma
        $statement->bindParam(
            ":language",
            $language
        );

        // Ejecutamos
        $statement->execute();

        // Obtenemos una sola noticia
        $result = $statement->fetch(PDO::FETCH_ASSOC);

        // Si no existe, devolvemos null
        return $result ?: null;
    }


    /*
    |--------------------------------------------------------------------------
    | CREAR NOTICIA
    |--------------------------------------------------------------------------
    */

    public function create($data)
    {
        /*
        Iniciamos una transacción porque vamos a insertar
        información en DOS tablas:

        1. news
        2. news_translations

        Si algo falla, podemos deshacer todo.
        */

        $this->connection->beginTransaction();

        try {

            /*
            Primero insertamos la información general
            de la noticia.
            */

            $sql = "
                INSERT INTO news
                (
                    image,
                    publish_date
                )
                VALUES
                (
                    :image,
                    :publish_date
                )
            ";

            $statement = $this->connection->prepare($sql);

            $statement->execute([
                ":image" => $data["image"] ?? null,
                ":publish_date" => $data["publish_date"] ?? null
            ]);


            /*
            Obtenemos el ID que MySQL acaba de crear.

            Por ejemplo:

            INSERT -> noticia creada con ID 5

            $newsId = 5
            */

            $newsId = $this->connection->lastInsertId();


            /*
            Ahora insertamos las traducciones.
            */

            $translationSql = "
                INSERT INTO news_translations
                (
                    news_id,
                    language,
                    title,
                    summary,
                    content
                )
                VALUES
                (
                    :news_id,
                    :language,
                    :title,
                    :summary,
                    :content
                )
            ";

            $translationStatement = $this->connection->prepare(
                $translationSql
            );


            /*
            Recorremos todas las traducciones
            que vienen desde el frontend.
            */

            foreach ($data["translations"] as $translation) {

                $translationStatement->execute([
                    ":news_id" => $newsId,
                    ":language" => $translation["language"],
                    ":title" => $translation["title"],
                    ":summary" => $translation["summary"] ?? null,
                    ":content" => $translation["content"] ?? null
                ]);
            }


            /*
            Si todo salió correctamente,
            confirmamos los cambios.
            */

            $this->connection->commit();

            return $newsId;


        } catch (Exception $error) {

            /*
            Si algo falla, deshacemos los INSERT.
            */

            $this->connection->rollBack();

            throw $error;
        }
    }


    /*
    |--------------------------------------------------------------------------
    | ACTUALIZAR NOTICIA
    |--------------------------------------------------------------------------
    */

    public function update($id, $data)
    {
        $this->connection->beginTransaction();

        try {

            /*
            Actualizamos la información general
            de la noticia.
            */

            $sql = "
                UPDATE news
                SET
                    image = :image,
                    publish_date = :publish_date
                WHERE id = :id
            ";

            $statement = $this->connection->prepare($sql);

            $statement->execute([
                ":id" => $id,
                ":image" => $data["image"] ?? null,
                ":publish_date" => $data["publish_date"] ?? null
            ]);


            /*
            Si vienen traducciones,
            actualizamos cada idioma.
            */

            if (isset($data["translations"])) {

                $translationSql = "
                    UPDATE news_translations
                    SET
                        title = :title,
                        summary = :summary,
                        content = :content
                    WHERE news_id = :news_id
                    AND language = :language
                ";

                $translationStatement = $this->connection->prepare(
                    $translationSql
                );


                foreach ($data["translations"] as $translation) {

                    $translationStatement->execute([
                        ":news_id" => $id,
                        ":language" => $translation["language"],
                        ":title" => $translation["title"],
                        ":summary" => $translation["summary"] ?? null,
                        ":content" => $translation["content"] ?? null
                    ]);
                }
            }


            /*
            Confirmamos los cambios.
            */

            $this->connection->commit();

            return true;


        } catch (Exception $error) {

            /*
            Si algo falla,
            deshacemos los cambios.
            */

            $this->connection->rollBack();

            throw $error;
        }
    }


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR NOTICIA
    |--------------------------------------------------------------------------
    */

    public function delete($id)
    {
        $this->connection->beginTransaction();

        try {

            /*
            Eliminamos la noticia.

            Gracias a:

            ON DELETE CASCADE

            también se eliminarán automáticamente
            sus traducciones.
            */

            $statement = $this->connection->prepare(
                "DELETE FROM news
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