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

function runStoredProcedureAction(string $procedureName): array
{
    try {
        return runStoredProcedure($procedureName);
    } catch (InvalidArgumentException $exception) {
        sendResponse(
            [
                "error" => 400,
                "code" => "PROCEDURE_NOT_ALLOWED",
                "message" => "Die angeforderte Datenbankfunktion ist nicht erlaubt."
            ],
            400
        );
    } catch (RuntimeException $exception) {
        sendResponse(
            [
                "error" => 500,
                "code" => "STORED_PROCEDURE_FAILED",
                "message" => "Die Datenbankfunktion konnte nicht ausgeführt werden."
            ],
            500
        );
    }
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

    case "get_bp1_resources_below_min":
        $response['result'] = runStoredProcedureAction(
            'getRessourcesBelowMin'
        );
        break;

    case "get_bp1_resources_at_risk":
        $response['result'] = runStoredProcedureAction(
            'getRessourcesAtRisk'
        );
        break;

    case "get_bp1_replenishment_requirements":
        $response['result'] = runStoredProcedureAction(
            'getNachschubanforderungen'
        );
        break;

    case "get_bp1_resources_with_storage":
        $response['result'] = runStoredProcedureAction(
            'getRessourcenWithLager'
        );
        break;

    case "get_sql_result":
        if (!isset($_GET['file'])) {
            sendResponse([
                "error" => 400,
                "message" => "Stored Procedure not specified!"
            ], 400);
        }

        $procedure = preg_replace('/\.sql$/i', '', $_GET['file']);
        
        if (empty($procedure)) {
            sendResponse([
                "error" => 400,
                "message" => "Invalid Stored Procedure name!"
            ], 400);
        }

        try {
            $stmt = $pdo->prepare("CALL `$procedure`()");
            $stmt->execute();

            $response['result'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

            while ($stmt->nextRowset()) {
            }

            $stmt->closeCursor();
        } catch (PDOException $e) {
            sendResponse([
                "error" => 500,
                "message" => $e->getMessage()
            ], 500);
        }

        break;

    case "get_sql_result_old":
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
            $fullPath = $path . $file;

            if (is_dir($fullPath) || !is_file($fullPath)) {
                continue;
            }

            try {
                $sqlContent = file_get_contents($fullPath);

                if (empty(trim($sqlContent))) {
                    continue;
                }

                $queryResult = runSqlFile($fullPath);

                $tableName = pathinfo($file, PATHINFO_FILENAME);
                $allTables[$tableName] = [
                    "result" => $queryResult,
                    "sql" => $sqlContent
                ];
            } catch (\Throwable $e) {
                continue;
            }
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
