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

try {
    $stmt = $pdo->prepare("
        DELETE FROM sigue 
        WHERE id_usuario_seguidor = :id_seguidor AND id_usuario_seguido = :id_seguido
    ");

    $stmt->execute([
        ":id_seguidor" => $id_seguidor,
        ":id_seguido" => $id_seguido,
    ]);

    echo json_encode([
        "ok" => true,
        "message" => "Dejaste de seguir al usuario",
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error al dejar de seguir al usuario",
        "detalle" => $e->getMessage(),
    ]);
}
