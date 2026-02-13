<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$id_usuario = isset($_GET["id_usuario"]) ? (int)$_GET["id_usuario"] : 0;

if ($id_usuario <= 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "ID de usuario requerido"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id_usuario, nombre, correo, fecha_creacion, avatar FROM usuario WHERE id_usuario = :id");
    $stmt->execute([":id" => $id_usuario]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(["ok" => false, "message" => "Usuario no encontrado"]);
        exit;
    }

    // Formatear fecha
    $fecha = null;
    if (!empty($user["fecha_creacion"])) {
        $dateObj = new DateTime($user["fecha_creacion"]);
        $fecha = $dateObj->format("d-m-Y");
    }

    // Contar estadísticas
    $stats = [
        "juegos" => 0,
        "reseñas" => 0,
        "listas" => 0,
        "seguidores" => 0,
        "siguiendo" => 0,
    ];

    // Juegos guardados
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM guarda WHERE id_usuario = :id");
    $stmt->execute([":id" => $id_usuario]);
    $stats["juegos"] = (int)$stmt->fetchColumn();

    // Reseñas
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM reseña WHERE id_usuario = :id");
    $stmt->execute([":id" => $id_usuario]);
    $stats["reseñas"] = (int)$stmt->fetchColumn();

    // Listas
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM lista WHERE id_usuario = :id");
    $stmt->execute([":id" => $id_usuario]);
    $stats["listas"] = (int)$stmt->fetchColumn();

    // Seguidores (usuarios que me siguen)
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM sigue WHERE id_usuario_seguido = :id");
    $stmt->execute([":id" => $id_usuario]);
    $stats["seguidores"] = (int)$stmt->fetchColumn();

    // Siguiendo (usuarios que sigo)
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM sigue WHERE id_usuario_seguidor = :id");
    $stmt->execute([":id" => $id_usuario]);
    $stats["siguiendo"] = (int)$stmt->fetchColumn();

    echo json_encode([
        "ok" => true,
        "user" => [
            "id" => (int)$user["id_usuario"],
            "nombre" => $user["nombre"],
            "correo" => $user["correo"],
            "avatar" => $user["avatar"],
            "fecha_creacion" => $fecha,
        ],
        "stats" => $stats,
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error al obtener el perfil",
        "detalle" => $e->getMessage(),
    ]);
}
