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
$estado = isset($input["estado"]) ? $input["estado"] : "pendiente"; // pendiente, jugando, completado, abandonado, en_pausa

if ($id_usuario <= 0 || $id_juego <= 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "ID de usuario y juego requeridos"]);
    exit;
}

if (!in_array($estado, ["pendiente", "jugando", "completado", "abandonado", "en_pausa"])) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "Estado inválido"]);
    exit;
}

try {
    // Verificar que el juego existe
    $stmt = $pdo->prepare("SELECT id_juego FROM juego WHERE id_juego = :id");
    $stmt->execute([":id" => $id_juego]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(["ok" => false, "message" => "Juego no encontrado"]);
        exit;
    }

    // Insertar o actualizar
    $stmt = $pdo->prepare("
        INSERT INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
        VALUES (:id_usuario, :id_juego, :estado, 0)
        ON DUPLICATE KEY UPDATE estado = :estado
    ");

    $stmt->execute([
        ":id_usuario" => $id_usuario,
        ":id_juego" => $id_juego,
        ":estado" => $estado,
    ]);

    echo json_encode([
        "ok" => true,
        "message" => "Juego añadido correctamente",
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error al añadir el juego",
        "detalle" => $e->getMessage(),
    ]);
}
