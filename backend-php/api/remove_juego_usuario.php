<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$id_usuario = isset($input["id_usuario"]) ? (int)$input["id_usuario"] : 0;
$id_juego = isset($input["id_juego"]) ? (int)$input["id_juego"] : 0;

if ($id_usuario <= 0 || $id_juego <= 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "ID de usuario y juego requeridos"]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM guarda WHERE id_usuario = :id_usuario AND id_juego = :id_juego");
    $stmt->execute([
        ":id_usuario" => $id_usuario,
        ":id_juego" => $id_juego,
    ]);

    echo json_encode([
        "ok" => true,
        "message" => "Juego eliminado correctamente",
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error al eliminar el juego",
        "detalle" => $e->getMessage(),
    ]);
}
