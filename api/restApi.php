<?php
require "./server.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

generate_csrf();                //debug
ini_set('display_errors', 0);
$json = json_decode("{}", true);

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    $given_csrf = $_GET['csrf'];
    $current_csrf = $_SESSION['csrf']['token'];

    //debug
    $given_csrf = $current_csrf;

    if ($current_csrf == $given_csrf) {
        if ($_SESSION['csrf']['time'] + (1000 * 60 * 60 * 24) > time()) {
            if ($action == "get_active_vehicles_count") {
                $data = runSqlFile("../sql/getActiveVehiclesCount.sql");
                $json['active_vehicles'] = $data;
            } else if ($action == "get_citizens_count") {
                $data = runSqlFile("../sql/getCitizensCount.sql");
                $json['citizens_count'] = $data;
            } else if ($action == "get_sql_files") {
                $path = "../sql/";
                $files = array_diff(scandir($path), array('.', '..'));
                $files = array_values($files);
                $last_file = end($files);

                foreach ($files as $file) {
                    $fileContent = file_get_contents($path . $file);
                    echo $file . ":\n" . $fileContent;

                    if ($file !== $last_file) {
                        echo "\n\n";
                    }
                }
            }
        } else {
            $json['error'] = 403;
            $json['message'] = "CSRF-Token expired!";
        }
    } else {
        $json['error'] = 403;
        $json['message'] = "Invaild CSRF-Token!";
    }
} else {
    $json['error'] = 501;
    $json['message'] = "Invaild request!";
}

if (count($json) > 0) {
    echo json_encode($json);
}
