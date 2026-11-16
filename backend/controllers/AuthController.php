
<?php

require_once __DIR__ . "/../config/database.php";

class AuthController
{
    private $pdo;

    public function __construct()
    {
        $database = new Database();
        $this->pdo = $database->connect();
    }

    // =========================================
    // INICIAR SESIÓN
    // =========================================

    public function login($email, $password)
    {
        try {

            $sql = "
                SELECT
                    u.id,
                    u.username,
                    u.email,
                    u.password,
                    u.active,
                    u.email_verified_at,
                    u.must_change_password,
                    u.investigator_id,
                    r.name AS role

                FROM users u

                INNER JOIN roles r
                    ON r.id = u.role_id

                WHERE u.email = :email

                LIMIT 1
            ";

            $stmt = $this->pdo->prepare($sql);

            $stmt->execute([
                "email" => $email
            ]);

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Credenciales incorrectas
            if (
                !$user ||
                !password_verify($password, $user["password"])
            ) {
                jsonResponse(401, [
                    "success" => false,
                    "message" => "Correo o contraseña incorrectos."
                ]);
            }

            // Cuenta deshabilitada
            if (!$user["active"]) {

                jsonResponse(403, [
                    "success" => false,
                    "message" => "Esta cuenta se encuentra deshabilitada."
                ]);
            }

            // Correo sin verificar
            if (empty($user["email_verified_at"])) {

                jsonResponse(403, [
                    "success" => false,
                    "message" => "Debes verificar tu correo institucional."
                ]);
            }

            // Comprobar roles permitidos
            $allowedRoles = [
                "Administrador",
                "Editor",
                "Investigador"
            ];

            if (!in_array($user["role"], $allowedRoles, true)) {

                jsonResponse(403, [
                    "success" => false,
                    "message" => "El rol de esta cuenta no está autorizado."
                ]);
            }

            // Renovar identificador de sesión
            session_regenerate_id(true);

            // Guardar información del usuario
            $_SESSION["user"] = [
                "id" => (int) $user["id"],
                "username" => $user["username"],
                "email" => $user["email"],
                "role" => $user["role"],
                "investigator_id" => $user["investigator_id"]
                    ? (int) $user["investigator_id"]
                    : null
            ];

            jsonResponse(200, [
                "success" => true,
                "message" => "Inicio de sesión exitoso.",
                "user" => $_SESSION["user"],
                "must_change_password" =>
                    (bool) $user["must_change_password"]
            ]);

        } catch (Exception $e) {

            error_log($e->getMessage());

            jsonResponse(500, [
                "success" => false,
                "message" => "Error al iniciar sesión."
            ]);
        }
    }

    // =========================================
    // CONSULTAR SESIÓN
    // =========================================

    public function me()
    {
        if (!isset($_SESSION["user"])) {

            jsonResponse(401, [
                "success" => false,
                "message" => "No hay una sesión activa."
            ]);
        }

        $sql = "
            SELECT must_change_password
            FROM users
            WHERE id = :id AND active = 1
            LIMIT 1
        ";

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            "id" => $_SESSION["user"]["id"]
        ]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {

            $_SESSION = [];
            session_destroy();

            jsonResponse(401, [
                "success" => false,
                "message" => "La cuenta ya no está disponible."
            ]);
        }

        jsonResponse(200, [
            "success" => true,
            "user" => $_SESSION["user"],
            "must_change_password" =>
                (bool) $user["must_change_password"]
        ]);
    }

    // =========================================
    // CERRAR SESIÓN
    // =========================================

    public function logout()
    {
        $_SESSION = [];

        if (ini_get("session.use_cookies")) {

            $params = session_get_cookie_params();

            setcookie(
                session_name(),
                "",
                [
                    "expires" => time() - 42000,
                    "path" => $params["path"],
                    "domain" => $params["domain"],
                    "secure" => $params["secure"],
                    "httponly" => $params["httponly"],
                    "samesite" => $params["samesite"]
                ]
            );
        }

        session_destroy();

        jsonResponse(200, [
            "success" => true,
            "message" => "Sesión cerrada correctamente."
        ]);
    }
}
