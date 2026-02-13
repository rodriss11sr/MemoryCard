<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$correo   = trim($input["email"] ?? "");
$password = $input["password"] ?? "";

if ($correo === "" || $password === "") {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "Faltan correo o contraseña"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id_usuario, nombre, correo, contraseña, avatar FROM usuario WHERE correo = :correo");
    $stmt->execute([":correo" => $correo]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user["contraseña"])) {
        http_response_code(401);
        echo json_encode(["ok" => false, "message" => "Credenciales incorrectas"]);
        exit;
    }

    // Aquí podrías generar un token JWT o similar; de momento devolvemos los datos básicos
    echo json_encode([
        "ok"      => true,
        "message" => "Login correcto",
        "user"    => [
            "id"     => (int)$user["id_usuario"],
            "nombre" => $user["nombre"],
            "correo" => $user["correo"],
            "avatar" => $user["avatar"],
        ],
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok"      => false,
        "message" => "Error al iniciar sesión",
        "detalle" => $e->getMessage(),
    ]);
}

