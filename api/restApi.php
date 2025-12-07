<?php
require "./server.php";
ini_set('display_errors', 0);
$json = json_decode("{}", true);

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $given_csrf = $_POST['csrf'];
    $current_csrf = $_SESSION['csrf']['token'];

    if ($current_csrf == $given_csrf) {
        if ($_SESSION['csrf']['time'] + (1000 * 60 * 60 * 24) > time()) {
            if ($action == "get_active_vehicles_count") {
                $data = runSqlFile("../sql/getActiveVehiclesCount.sql");
                $json['active_vehicles'] = $data;
            } else if ($action == "get_citizens_count") {
                $data = runSqlFile("../sql/getCitizensCount.sql");
                $json['citizens_count'] = $data;
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