<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$id_lista = isset($input["id_lista"]) ? (int)$input["id_lista"] : 0;
$id_juego = isset($input["id_juego"]) ? (int)$input["id_juego"] : 0;

if ($id_lista <= 0 || $id_juego <= 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "ID de lista y juego requeridos"]);
    exit;
}

try {
    // Verificar que la lista existe y pertenece al usuario (opcional, para seguridad)
    $stmt = $pdo->prepare("SELECT id_lista FROM lista WHERE id_lista = :id");
    $stmt->execute([":id" => $id_lista]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(["ok" => false, "message" => "Lista no encontrada"]);
        exit;
    }

    $stmt = $pdo->prepare("
        INSERT INTO contiene (id_lista, id_juego, orden)
        VALUES (:id_lista, :id_juego, 0)
        ON DUPLICATE KEY UPDATE orden = orden
    ");

    $stmt->execute([
        ":id_lista" => $id_lista,
        ":id_juego" => $id_juego,
    ]);

    echo json_encode([
        "ok" => true,
        "message" => "Juego añadido a la lista correctamente",
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error al añadir el juego a la lista",
        "detalle" => $e->getMessage(),
    ]);
}
