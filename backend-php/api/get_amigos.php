<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$id_usuario = isset($_GET["id_usuario"]) ? (int)$_GET["id_usuario"] : 0;
$tipo = isset($_GET["tipo"]) ? $_GET["tipo"] : "siguiendo"; // "siguiendo" o "seguidores"

if ($id_usuario <= 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "ID de usuario requerido"]);
    exit;
}

try {
    if ($tipo === "seguidores") {
        // Usuarios que me siguen
        $stmt = $pdo->prepare("
            SELECT 
                u.id_usuario,
                u.nombre,
                u.avatar,
                (SELECT COUNT(*) FROM guarda WHERE id_usuario = u.id_usuario) AS juegos
            FROM sigue s
            INNER JOIN usuario u ON s.id_usuario_seguidor = u.id_usuario
            WHERE s.id_usuario_seguido = :id_usuario
        ");
    } else {
        // Usuarios que sigo
        $stmt = $pdo->prepare("
            SELECT 
                u.id_usuario,
                u.nombre,
                u.avatar,
                (SELECT COUNT(*) FROM guarda WHERE id_usuario = u.id_usuario) AS juegos
            FROM sigue s
            INNER JOIN usuario u ON s.id_usuario_seguido = u.id_usuario
            WHERE s.id_usuario_seguidor = :id_usuario
        ");
    }

    $stmt->execute([":id_usuario" => $id_usuario]);
    $rows = $stmt->fetchAll();

    $amigos = [];

    foreach ($rows as $row) {
        $amigos[] = [
            "id" => (int)$row["id_usuario"],
            "nombre" => $row["nombre"],
            "avatar" => $row["avatar"],
            "juegos" => (int)$row["juegos"],
        ];
    }

    echo json_encode($amigos);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "No se pudieron obtener los amigos",
        "detalle" => $e->getMessage(),
    ]);
}
