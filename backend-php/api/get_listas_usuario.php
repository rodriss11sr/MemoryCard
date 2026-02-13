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
    // Obtener listas del usuario
    $stmt = $pdo->prepare("
        SELECT 
            l.id_lista,
            l.nombre,
            l.descripcion,
            l.fecha_creacion,
            u.nombre AS autor
        FROM lista l
        INNER JOIN usuario u ON l.id_usuario = u.id_usuario
        WHERE l.id_usuario = :id_usuario
        ORDER BY l.fecha_creacion DESC
    ");
    $stmt->execute([":id_usuario" => $id_usuario]);
    $listas = $stmt->fetchAll();

    $resultado = [];

    foreach ($listas as $lista) {
        // Obtener juegos de cada lista
        $stmtJuegos = $pdo->prepare("
            SELECT 
                j.id_juego,
                j.titulo AS nombre,
                j.portada AS imagen
            FROM contiene c
            INNER JOIN juego j ON c.id_juego = j.id_juego
            WHERE c.id_lista = :id_lista
            ORDER BY c.orden, c.fecha_agregado
            LIMIT 10
        ");
        $stmtJuegos->execute([":id_lista" => $lista["id_lista"]]);
        $juegos = $stmtJuegos->fetchAll();

        $juegosArray = [];
        foreach ($juegos as $juego) {
            $juegosArray[] = [
                "id" => (int)$juego["id_juego"],
                "nombre" => $juego["nombre"],
                "imagen" => $juego["imagen"],
            ];
        }

        $resultado[] = [
            "id" => (int)$lista["id_lista"],
            "nombre" => $lista["nombre"],
            "autor" => $lista["autor"],
            "juegos" => $juegosArray,
        ];
    }

    echo json_encode($resultado);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "No se pudieron obtener las listas del usuario",
        "detalle" => $e->getMessage(),
    ]);
}
