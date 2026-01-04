<?php
require 'server.php';
header("Content-Type: application/json");

$dev = true;

if ($dev) {
    $token = bin2hex(random_bytes(16));
    echo json_encode(["success" => true, "token" => $token]);
} else {
    $host = 'localhost';
    $db   = 'deine_datenbank';
    $user = 'root';
    $pass = '';

    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'];
    $password = $input['password'];

    $stmt = $pdo->prepare("SELECT id, password_hash FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $token = bin2hex(random_bytes(16));
        echo json_encode(["success" => true, "token" => $token]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Login fehlgeschlagen"]);
    }
}
