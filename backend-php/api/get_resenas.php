<?php
require_once __DIR__ . "/../config/db_connect.php";

$idJuego = isset($_GET["id_juego"]) ? (int)$_GET["id_juego"] : 0;

try {
    // Intentar usar la vista primero, si falla usar consulta directa
    if ($idJuego > 0) {
        try {
            $stmt = $pdo->prepare(
                "SELECT * FROM vista_reseñas_completas WHERE id_juego = :id_juego ORDER BY fecha_publicacion DESC"
            );
            $stmt->execute([":id_juego" => $idJuego]);
        } catch (PDOException $e) {
            // Si la vista no existe, usar consulta directa
            $stmt = $pdo->prepare("
                SELECT 
                    r.id_reseña,
                    r.id_juego,
                    r.texto,
                    r.nota,
                    r.fecha_publicacion,
                    u.nombre AS nombre_usuario,
                    u.avatar AS avatar_usuario,
                    j.titulo AS titulo_juego,
                    j.portada AS portada_juego
                FROM reseña r
                INNER JOIN usuario u ON r.id_usuario = u.id_usuario
                INNER JOIN juego j ON r.id_juego = j.id_juego
                WHERE r.id_juego = :id_juego
                ORDER BY r.fecha_publicacion DESC
            ");
            $stmt->execute([":id_juego" => $idJuego]);
        }
    } else {
        try {
            $stmt = $pdo->query("SELECT * FROM vista_reseñas_completas ORDER BY fecha_publicacion DESC");
        } catch (PDOException $e) {
            // Si la vista no existe, usar consulta directa
            $stmt = $pdo->query("
                SELECT 
                    r.id_reseña,
                    r.id_juego,
                    r.texto,
                    r.nota,
                    r.fecha_publicacion,
                    u.nombre AS nombre_usuario,
                    u.avatar AS avatar_usuario,
                    j.titulo AS titulo_juego,
                    j.portada AS portada_juego
                FROM reseña r
                INNER JOIN usuario u ON r.id_usuario = u.id_usuario
                INNER JOIN juego j ON r.id_juego = j.id_juego
                ORDER BY r.fecha_publicacion DESC
            ");
        }
    }

    $rows = $stmt->fetchAll();

    $resenas = [];

    foreach ($rows as $row) {
        $fecha = null;
        if (!empty($row["fecha_publicacion"])) {
            $dateObj = new DateTime($row["fecha_publicacion"]);
            $fecha = $dateObj->format("d/m/Y");
        }

        $resenas[] = [
            "id"         => (int)$row["id_reseña"],
            "juegoId"    => (int)$row["id_juego"],
            "usuario"    => $row["nombre_usuario"] ?? null,
            "avatar"     => $row["avatar_usuario"] ?? null,
            "titulo"     => $row["titulo_juego"] ?? null,
            "contenido"  => $row["texto"] ?? "",
            "puntuacion" => $row["nota"] !== null ? (float)$row["nota"] : null,
            "imagen"     => $row["portada_juego"] ?? null,
            "fecha"      => $fecha,
        ];
    }

    echo json_encode($resenas);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "No se pudieron obtener las reseñas",
        "detalle" => $e->getMessage(),
        "trace" => $e->getTraceAsString(),
    ]);
}

