
<?php

// Este archivo solamente puede ejecutarse desde la terminal.
if (PHP_SAPI !== "cli") {
    http_response_code(403);
    exit("Acceso no permitido.");
}

require_once __DIR__ . "/../config/database.php";

$email = "admin@academicos.uta.cl";
$username = "admin";
$temporaryPassword = "AdminIAI2026";

try {

    $database = new Database();
    $pdo = $database->connect();

    // Buscar el rol administrador
    $stmt = $pdo->prepare("
        SELECT id
        FROM roles
        WHERE LOWER(name) = LOWER(:name)
        LIMIT 1
    ");

    $stmt->execute([
        "name" => "Administrador"
    ]);

    $role = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$role) {
        throw new Exception(
            "No existe el rol Administrador en la tabla roles."
        );
    }

    // Cifrar contraseña
    $passwordHash = password_hash(
        $temporaryPassword,
        PASSWORD_DEFAULT
    );

    // Crear o actualizar cuenta
    $sql = "
        INSERT INTO users (
            role_id,
            investigator_id,
            username,
            email,
            password,
            active,
            email_verified_at,
            must_change_password
        )
        VALUES (
            :role_id,
            NULL,
            :username,
            :email,
            :password,
            1,
            NOW(),
            1
        )
        ON DUPLICATE KEY UPDATE
            role_id = VALUES(role_id),
            password = VALUES(password),
            active = 1,
            email_verified_at = NOW(),
            must_change_password = 1
    ";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        "role_id" => $role["id"],
        "username" => $username,
        "email" => $email,
        "password" => $passwordHash
    ]);

    echo "Administrador creado correctamente.\n";
    echo "Correo: " . $email . "\n";
    echo "Contraseña temporal: " . $temporaryPassword . "\n";

} catch (Throwable $e) {

    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}
