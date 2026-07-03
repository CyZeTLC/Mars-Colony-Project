# AP16 – Architekturentwurf

Status: abgeschlossen, Stand 03.07.2026

## Ziel

Die Architektur der Mars Logistik Verwaltung wird nachvollziehbar in Frontend, API, Datenbanklogik und Datenbank getrennt.

## Ist-Architektur

```text
React-/TypeScript-Webanwendung
            |
            | HTTPS / JSON, X-CSRF-Token
            v
       PHP-REST-API
            |
            | PDO + runSqlFile()
            v
        SQL-Dateien
            |
            v
    MariaDB-/MySQL-Datenbank
```

| Ebene | Aktueller Stand |
|---|---|
| Frontend | React 19, TypeScript 6, Vite 8 |
| Oberfläche | Tailwind CSS 3, Material UI und Recharts |
| API / Backend | `api/restApi.php`, `api/login.php` und `api/server.php` |
| Datenzugriff | PDO; derzeit Ausführung freigegebener SQL-Dateien |
| Datenbank | MariaDB/MySQL |
| Sicherheit | Login, PHP-Session, einstündige Frontend-Anmeldung und CSRF-Token mit 24 Stunden Laufzeit |

Das Frontend lädt Daten über die REST-API. Bis auf `generate_csrf` erwarten API-Anfragen den CSRF-Token im Header `X-CSRF-Token`. Die API gibt JSON zurück.

## Soll-Architektur für Datenbankzugriffe

Das dritte Gesprächsprotokoll legt Stored Procedures als technischen Datenbankzugriff fest:

```text
Webanwendung → PHP-REST-API → Stored Procedures → MariaDB/MySQL
```

Im Repository bestehen 38 Query-/Stored-Procedure-Paare. Besonders relevant für BP1 sind:

- `getRessourcesBelowMin()`
- `getRessourcesAtRisk()`
- `getNachschubanforderungen()`
- `getRessourcenWithLager()`

Die Procedures sind noch nicht in `api/restApi.php` angebunden. Die derzeitige API-Ausführung über `runSqlFile()` ist daher als Übergangsstand dokumentiert.

## Businessprozessbezug

BP1 wird in der Abschlusspräsentation als Kette aus Use Case, Businessprozess, finalem BPMN-v11-Modell, Stored Procedures und Applikationsbezug gezeigt. Das Dashboard unterstützt diesen Bezug bereits mit Ressourcenverbrauch und Bestand-gegen-Mindestbestand.

BP2 bleibt datenbankseitig durch Überschuss-, Bewertungs- und Verkaufsstrukturen abgedeckt, steht in der Abschlusspräsentation aber nicht im Mittelpunkt.

## Ergebnis

Die Ist- und Soll-Architektur sind getrennt dokumentiert. Der zentrale offene technische Schritt ist die Umstellung der PHP-API von SQL-Dateien auf Stored-Procedure-Aufrufe.

## Dauer

Dauer: 2 Tage
