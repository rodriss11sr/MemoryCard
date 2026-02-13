<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$id_usuario = isset($input["id_usuario"]) ? (int)$input["id_usuario"] : 0;
$nombre = trim($input["nombre"] ?? "");
$descripcion = trim($input["descripcion"] ?? "");
$publica = isset($input["publica"]) ? (bool)$input["publica"] : true;

if ($id_usuario <= 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "ID de usuario requerido"]);
    exit;
}

if ($nombre === "") {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "El nombre de la lista es obligatorio"]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO lista (nombre, descripcion, id_usuario, publica)
        VALUES (:nombre, :descripcion, :id_usuario, :publica)
    ");

    $stmt->execute([
        ":nombre" => $nombre,
        ":descripcion" => $descripcion,
        ":id_usuario" => $id_usuario,
        ":publica" => $publica ? 1 : 0,
    ]);

    $id_lista = (int)$pdo->lastInsertId();

    echo json_encode([
        "ok" => true,
        "message" => "Lista creada correctamente",
        "id_lista" => $id_lista,
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error al crear la lista",
        "detalle" => $e->getMessage(),
    ]);
}
