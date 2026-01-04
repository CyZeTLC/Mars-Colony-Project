<?php
require 'server.php';
header("Content-Type: application/json");

$dev = false;

if ($dev) {
    $token = bin2hex(random_bytes(16));
    echo json_encode(["success" => true, "token" => $token]);
} else {
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'];
    $password = $input['password'];

    $stmt = $pdo->prepare("SELECT MITARBEITER_ID, PASSWORT FROM MITARBEITER WHERE `login` = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['PASSWORT'])) {
        $token = bin2hex(random_bytes(16));
        echo json_encode(["success" => true, "token" => $token]);
    } else {
        //http_response_code(401);
        echo json_encode(["success" => false, "message" => "Login fehlgeschlagen"]);
    }
}
