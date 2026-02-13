<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

// Aceptar ambos formatos: id_seguidor/id_seguido o id_usuario_seguidor/id_usuario_seguido
$id_seguidor = isset($input["id_seguidor"]) ? (int)$input["id_seguidor"] : (isset($input["id_usuario_seguidor"]) ? (int)$input["id_usuario_seguidor"] : 0);
$id_seguido = isset($input["id_seguido"]) ? (int)$input["id_seguido"] : (isset($input["id_usuario_seguido"]) ? (int)$input["id_usuario_seguido"] : 0);

if ($id_seguidor <= 0 || $id_seguido <= 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "IDs de usuario requeridos"]);
    exit;
}

if ($id_seguidor === $id_seguido) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "No puedes seguirte a ti mismo"]);
    exit;
}

try {
    // Verificar que el usuario a seguir existe
    $stmt = $pdo->prepare("SELECT id_usuario FROM usuario WHERE id_usuario = :id");
    $stmt->execute([":id" => $id_seguido]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(["ok" => false, "message" => "Usuario no encontrado"]);
        exit;
    }

    // Insertar relación (si ya existe, no hace nada)
    $stmt = $pdo->prepare("
        INSERT INTO sigue (id_usuario_seguidor, id_usuario_seguido)
        VALUES (:id_seguidor, :id_seguido)
        ON DUPLICATE KEY UPDATE id_usuario_seguidor = id_usuario_seguidor
    ");

    $stmt->execute([
        ":id_seguidor" => $id_seguidor,
        ":id_seguido" => $id_seguido,
    ]);

    echo json_encode([
        "ok" => true,
        "message" => "Usuario seguido correctamente",
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error al seguir al usuario",
        "detalle" => $e->getMessage(),
    ]);
}
