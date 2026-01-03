<?php
require "./server.php";
generate_csrf();                //debug

header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', 0);

$json = json_decode("{}", true);

function sendResponse(array $data, int $httpCode = 200) {
    http_response_code($httpCode);
    echo json_encode($data);
    exit;
}

if (!isset($_GET['action']) || !isset($_GET['csrf'])) {
    sendResponse(["error" => 400, "message" => "Invalid request!"], 400);
}

$action = $_GET['action'];
$given_csrf = $_GET['csrf'];
$current_csrf = $_SESSION['csrf']['token'] ?? '';

$given_csrf = $current_csrf; // debug

if ($current_csrf !== $given_csrf) {
    sendResponse(["error" => 403, "message" => "Invalid CSRF-Token!"], 403);
}

$oneDayInSeconds = 24 * 60 * 60;
if (($_SESSION['csrf']['time'] + $oneDayInSeconds) < time()) {
    sendResponse(["error" => 403, "message" => "CSRF-Token expired!"], 403);
}

$response = [];

switch ($action) {
    case "generate_csrf":
        generate_csrf();
        $response['csrf'] = $_SESSION['csrf']['token'];
        break;

    case "get_active_vehicles_count":
        $response['active_vehicles'] = runSqlFile("../sql/getActiveVehiclesCount.sql");
        break;

    case "get_citizens_count":
        $response['citizens_count'] = runSqlFile("../sql/getCitizensCount.sql");
        break;

    case "get_sql_files":
        $path = "../sql/";
        $files = array_diff(scandir($path), array('.', '..'));
        $fileData = "";
        foreach ($files as $file) {
            $fileData .= $file . ":\n" . file_get_contents($path . $file) . "\n\n";
        }
        $response['sql_content'] = trim($fileData);
        break;

    default:
        sendResponse(["error" => 501, "message" => "Action not implemented!"], 501);
}

sendResponse($response);