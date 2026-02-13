<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$query = trim($_GET["q"] ?? "");
$id_usuario_actual = isset($_GET["id_usuario_actual"]) ? (int)$_GET["id_usuario_actual"] : 0;

if ($query === "") {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "Query de búsqueda requerido"]);
    exit;
}

try {
    $sql = "
        SELECT 
            u.id_usuario,
            u.nombre,
            u.avatar,
            (SELECT COUNT(g.id_juego) FROM guarda g WHERE g.id_usuario = u.id_usuario) AS total_juegos,
            (SELECT COUNT(s.id_usuario_seguido) FROM sigue s WHERE s.id_usuario_seguidor = :id_usuario_actual AND s.id_usuario_seguido = u.id_usuario) AS ya_sigues
        FROM usuario u
        WHERE u.nombre LIKE :query OR u.correo LIKE :query
        ORDER BY u.nombre ASC
        LIMIT 20
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":query" => "%" . $query . "%",
        ":id_usuario_actual" => $id_usuario_actual,
    ]);
    $usuarios = $stmt->fetchAll();

    $resultado = [];
    foreach ($usuarios as $usuario) {
        $resultado[] = [
            "id" => (int)$usuario["id_usuario"],
            "nombre" => $usuario["nombre"],
            "avatar" => $usuario["avatar"],
            "juegos" => (int)$usuario["total_juegos"],
            "ya_sigues" => (int)$usuario["ya_sigues"] > 0,
        ];
    }

    echo json_encode(["ok" => true, "usuarios" => $resultado]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error al buscar usuarios",
        "detalle" => $e->getMessage(),
    ]);
}
