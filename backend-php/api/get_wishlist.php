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
    // Wishlist = juegos con estado "pendiente"
    $stmt = $pdo->prepare("
        SELECT 
            j.id_juego,
            j.titulo,
            j.portada,
            (SELECT AVG(nota) FROM reseña WHERE id_juego = j.id_juego) AS rating
        FROM guarda g
        INNER JOIN juego j ON g.id_juego = j.id_juego
        WHERE g.id_usuario = :id_usuario AND g.estado = 'pendiente'
        ORDER BY g.fecha_agregado DESC
    ");
    $stmt->execute([":id_usuario" => $id_usuario]);
    $rows = $stmt->fetchAll();

    $wishlist = [];

    foreach ($rows as $row) {
        $rating = null;
        if ($row["rating"] !== null) {
            $rating = round((float)$row["rating"], 1);
        }

        $wishlist[] = [
            "id" => (int)$row["id_juego"],
            "nombre" => $row["titulo"],
            "imagen" => $row["portada"],
            "rating" => $rating,
        ];
    }

    echo json_encode($wishlist);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "No se pudo obtener la wishlist",
        "detalle" => $e->getMessage(),
    ]);
}
