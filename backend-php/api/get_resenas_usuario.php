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
    $stmt = $pdo->prepare("
        SELECT 
            r.id_reseña,
            r.id_juego,
            r.texto,
            r.nota,
            r.fecha_publicacion,
            j.titulo AS titulo_juego,
            j.portada AS portada_juego
        FROM reseña r
        INNER JOIN juego j ON r.id_juego = j.id_juego
        WHERE r.id_usuario = :id_usuario
        ORDER BY r.fecha_publicacion DESC
    ");
    $stmt->execute([":id_usuario" => $id_usuario]);
    $rows = $stmt->fetchAll();

    $resenas = [];

    foreach ($rows as $row) {
        $fecha = null;
        if (!empty($row["fecha_publicacion"])) {
            $dateObj = new DateTime($row["fecha_publicacion"]);
            $fecha = $dateObj->format("d/m/Y");
        }

        $resenas[] = [
            "id" => (int)$row["id_reseña"],
            "juegoId" => (int)$row["id_juego"],
            "titulo" => $row["titulo_juego"],
            "contenido" => $row["texto"],
            "puntuacion" => $row["nota"] !== null ? (float)$row["nota"] : null,
            "imagen" => $row["portada_juego"],
            "fecha" => $fecha,
        ];
    }

    echo json_encode($resenas);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "No se pudieron obtener las reseñas del usuario",
        "detalle" => $e->getMessage(),
    ]);
}
