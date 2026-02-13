<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$id_lista = isset($_GET["id_lista"]) ? (int)$_GET["id_lista"] : 0;

if ($id_lista <= 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "ID de lista requerido"]);
    exit;
}

try {
    // Obtener información de la lista
    $stmt = $pdo->prepare("
        SELECT 
            l.id_lista,
            l.nombre,
            l.descripcion,
            l.fecha_creacion,
            u.id_usuario,
            u.nombre AS autor,
            u.avatar AS avatar_autor
        FROM lista l
        INNER JOIN usuario u ON l.id_usuario = u.id_usuario
        WHERE l.id_lista = :id_lista
    ");
    $stmt->execute([":id_lista" => $id_lista]);
    $lista = $stmt->fetch();

    if (!$lista) {
        http_response_code(404);
        echo json_encode(["ok" => false, "message" => "Lista no encontrada"]);
        exit;
    }

    // Obtener todos los juegos de la lista
    $stmtJuegos = $pdo->prepare("
        SELECT 
            j.id_juego,
            j.titulo AS nombre,
            j.portada AS imagen,
            j.descripcion,
            c.orden
        FROM contiene c
        INNER JOIN juego j ON c.id_juego = j.id_juego
        WHERE c.id_lista = :id_lista
        ORDER BY c.orden ASC, c.fecha_agregado ASC
    ");
    $stmtJuegos->execute([":id_lista" => $id_lista]);
    $juegos = $stmtJuegos->fetchAll();

    $juegosArray = [];
    foreach ($juegos as $juego) {
        $juegosArray[] = [
            "id" => (int)$juego["id_juego"],
            "nombre" => $juego["nombre"],
            "imagen" => $juego["imagen"],
            "descripcion" => $juego["descripcion"],
            "orden" => (int)$juego["orden"],
        ];
    }

    $fecha_creacion = null;
    if (!empty($lista["fecha_creacion"])) {
        $dateObj = new DateTime($lista["fecha_creacion"]);
        $fecha_creacion = $dateObj->format("d/m/Y");
    }

    echo json_encode([
        "ok" => true,
        "lista" => [
            "id" => (int)$lista["id_lista"],
            "nombre" => $lista["nombre"],
            "descripcion" => $lista["descripcion"],
            "fecha_creacion" => $fecha_creacion,
            "autor" => [
                "id" => (int)$lista["id_usuario"],
                "nombre" => $lista["autor"],
                "avatar" => $lista["avatar_autor"],
            ],
            "juegos" => $juegosArray,
        ],
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error al obtener la lista",
        "detalle" => $e->getMessage(),
    ]);
}
