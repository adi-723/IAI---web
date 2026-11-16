
<?php

class Database
{
    private $host = "localhost";
    private $database = "instituto_iai";
    private $username = "root";
    private $password = "";

    private $connection = null;

    public function connect()
    {
        if ($this->connection === null) {

            try {

                $this->connection = new PDO(
                    "mysql:host={$this->host};dbname={$this->database};charset=utf8mb4",
                    $this->username,
                    $this->password,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,

                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,

                        PDO::ATTR_EMULATE_PREPARES => false
                    ]
                );

            } catch (PDOException $e) {

                error_log("Error de conexión: " . $e->getMessage());

                throw new Exception(
                    "No se pudo conectar con la base de datos."
                );

            }
        }

        return $this->connection;
    }
}
