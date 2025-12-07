<?php
require 'config.inc.php';

use PDO;
use DateTime;

/* DateTime */
$dateTime = new DateTime();

/* Errors */
ini_set('display_errors', 1);
ini_set("log_errors", 1);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

/* Security Headers */
header('X-XSS-Protection: 1; mode=block');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Strict-Transport-Security: max-age=17280000');
header('Referrer-Policy: no-referrer');
header('Feature-Policy: camera "none"; microphone "none"; geolocation "none"; payment "none";');
header('permissions-policy: camera=(), microphone=(), geolocation=()');

/* Session */
session_start();
$_SESSION['last_page_load'] = $dateTime;
$_SESSION['version'] = "0.2";

/* MySQL Connection */
$dsn = 'mysql:host=' . $mysqlCredentials['host'] . ';dbname=' . $mysqlCredentials['schema'];
$pdo = new PDO($dsn, $mysqlCredentials['user'], $mysqlCredentials['passwd']);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); /* Enable exceptions on errors */

/**
 * Generates a CSRF token and stores it in the session.
 */
function generate_csrf()
{
    $token = md5(uniqid(rand(), true));
    $_SESSION['csrf']['token'] = $token;
    $_SESSION['csrf']['time'] = time();
}

/**
 * Konvertiert einen HTML-String in reinen Text.
 *
 * @param string $str Der HTML-String.
 * @return string Der konvertierte reine Text.
 */
function htmlToPlainText($str)
{
    $str = str_replace('&nbsp;', ' ', $str);
    $str = html_entity_decode($str, ENT_QUOTES | ENT_COMPAT, 'UTF-8');
    $str = html_entity_decode($str, ENT_HTML5, 'UTF-8');
    $str = html_entity_decode($str);
    $str = htmlspecialchars_decode($str);
    $str = strip_tags($str);

    return $str;
}

/**
 * Führt eine SQL-Datei aus und gibt die Ergebnisse als Array zurück.
 *
 * @param string $sqlFilePath Der Pfad zur SQL-Datei.
 * @param array $params Optionale Parameter für das Prepared Statement.
 * @return array Die Ergebnisse der SQL-Abfrage als assoziatives Array.
 * @throws Exception Wenn die SQL-Datei nicht gefunden wird.
 */
function runSqlFile(string $sqlFilePath, array $params = []): array
{
    if (!file_exists($sqlFilePath)) {
        throw new Exception("SQL-Datei nicht gefunden: " . $sqlFilePath);
    }

    $sql = file_get_contents($sqlFilePath);

    global $pdo; // Verwende die globale PDO-Variable
    $stmt = $pdo->prepare($sql);

    $stmt->execute($params);

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


/**
 * Führt eine SQL-Abfrage aus und gibt die Ergebnisse als JSON-String aus.
 *
 * @param string $sql Die auszuführende SQL-Abfrage (SELECT-Statement).
 * @param array $params Optionale Parameter für das Prepared Statement.
 * @return void Gibt den JSON-String direkt aus und beendet das Skript.
 */
function outputQueryResultsAsJson(string $sql, array $params = []): void {
    header('Content-Type: application/json');

    try {
        global $pdo; // Verwende die globale PDO-Variable
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $json_output = json_encode([
            'success' => true,
            'count' => count($results),
            'data' => $results
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        echo $json_output;

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Datenbankfehler: ' . $e->getMessage()
        ]);
    }
    
    exit;
}