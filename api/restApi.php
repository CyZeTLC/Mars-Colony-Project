<?php
require "./server.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-CSRF-Token, Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json; charset=utf-8');

ini_set('display_errors', 0);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$json = json_decode("{}", true);

function sendResponse(array $data, int $httpCode = 200)
{
    http_response_code($httpCode);
    echo json_encode($data);
    exit;
}

if (!isset($_GET['action'])) {
    sendResponse(["error" => 400, "message" => "Invalid request!"], 400);
}

$action = $_GET['action'];
$given_csrf = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
$current_csrf = $_SESSION['csrf']['token'] ?? '';

if ($action !== "generate_csrf") {
    if (!isset($_SERVER['HTTP_X_CSRF_TOKEN'])) {
        sendResponse(["error" => 400, "message" => "Missing CSRF"], 400);
    }

    $given_csrf = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $current_csrf = $_SESSION['csrf']['token'] ?? '';

    if (!hash_equals($current_csrf, $given_csrf)) {
        sendResponse(["error" => 403, "message" => "Invalid CSRF-Token!"], 403);
    }

    $oneDayInSeconds = 24 * 60 * 60;
    if (($_SESSION['csrf']['time'] + $oneDayInSeconds) < time()) {
        sendResponse(["error" => 403, "message" => "CSRF-Token expired!"], 403);
    }
}

$response = [];

switch ($action) {
    case "generate_csrf":
        session_regenerate_id(true);
        generate_csrf();
        $response['csrf'] = $_SESSION['csrf']['token'];
        break;

    case "get_sql_result":
        if (!isset($_GET['file'])) {
            sendResponse(["error" => 400, "message" => "SQL file not specified!"], 400);
        }
        $file = basename($_GET['file']);
        $allowedFiles = array_diff(scandir("../sql/"), array('.', '..'));
        if (!in_array($file, $allowedFiles)) {
            sendResponse(["error" => 400, "message" => "SQL file not found!"], 400);
        }
        $response['result'] = runSqlFile("../sql/" . $file);
        break;

    case "get_active_vehicles_count":
        $response['active_vehicles'] = runSqlFile("../sql/getActiveVehiclesCount.sql");
        break;

    case "get_citizens_count":
        $response['citizens_count'] = runSqlFile("../sql/getCitizensCount.sql");
        break;
    
    case "search_citizens_by_name":
        if (!isset($_GET['name'])) {
            sendResponse(["error" => 400, "message" => "Name parameter is missing!"], 400);
        }
        $name = $_GET['name'];
        $response['result'] = runSqlFile("../sql/getAllCitizensByName.sql", [$name]);
        break;

    case "get_dashboard_stats":
        $response = [
            "citizens_count" => runSqlFile("../sql/getCitizensCount.sql"),
            "cities_count" => runSqlFile("../sql/getCitiesCount.sql"),
            "vehicles" => runSqlFile("../sql/getActiveVehicles.sql"),
            "energy_power" => runSqlFile("../sql/getCurrentEnergieLeistung.sql")
        ];
        break;

    case "get_all_tables":
        $path = "../sql/";
        $files = array_diff(scandir($path), array('.', '..'));
        $allTables = [];

        foreach ($files as $file) {
            $queryResult = runSqlFile($path . $file);
            $tableName = pathinfo($file, PATHINFO_FILENAME);
            $allTables[$tableName] = [
                "result" => $queryResult,
                "sql" => file_get_contents($path . $file)
            ];
        }

        $response['tables'] = $allTables;
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
