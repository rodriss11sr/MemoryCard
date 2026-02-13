<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$nombre   = trim($input["username"] ?? "");
$correo   = trim($input["email"] ?? "");
$password = $input["password"] ?? "";

if ($nombre === "" || $correo === "" || $password === "") {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "Faltan campos obligatorios"]);
    exit;
}

try {
    // Comprobar si ya existe usuario con ese correo o nombre
    $stmt = $pdo->prepare("SELECT id_usuario FROM usuario WHERE correo = :correo OR nombre = :nombre");
    $stmt->execute([
        ":correo" => $correo,
        ":nombre" => $nombre,
    ]);

    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(["ok" => false, "message" => "Ya existe un usuario con ese correo o nombre"]);
        exit;
    }

    // Hashear contraseña (seguro)
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $insert = $pdo->prepare("
        INSERT INTO usuario (nombre, correo, contraseña)
        VALUES (:nombre, :correo, :password)
    ");

    $insert->execute([
        ":nombre"   => $nombre,
        ":correo"   => $correo,
        ":password" => $hash,
    ]);

    $id = (int)$pdo->lastInsertId();

    echo json_encode([
        "ok"      => true,
        "message" => "Usuario creado correctamente",
        "user"    => [
            "id"     => $id,
            "nombre" => $nombre,
            "correo" => $correo,
        ],
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok"      => false,
        "message" => "Error al registrar el usuario",
        "detalle" => $e->getMessage(),
    ]);
}

