# AP17 – Implementierung vorbereitet

Status: abgeschlossen

## Ziel

Eine technologische Infrastruktur für den Implementierungsprozess wurde ausgewählt und aufgesetzt.

## Vorbereitete Infrastruktur

Für die Umsetzung der Mars Logistik Verwaltung wurde eine Webanwendungsstruktur mit getrenntem Frontend, Backend und Datenbankbereich vorbereitet.

| Bereich | Umsetzung |
|---|---|
| Frontend | React mit TypeScript und Vite |
| Backend | PHP-REST-API |
| Datenbank | MySQL / MariaDB mit SQL-Build-Skripten |
| Datenzugriff | aktuell SQL-Dateien über PDO; Stored Procedures als Ziel |
| Versionierung | GitHub mit Branches, Commits und Pull Requests |
| Organisation | ClickUp, Discord und regelmäßige Abstimmung im Praktikum |

## Technische Vorbereitung

Das Repository enthält die grundlegende Projektstruktur für die Implementierung:

- `src/` für Frontend-Komponenten, Seiten und Hilfsfunktionen
- `api/` für PHP-Backend, Login und REST-API
- `sql/` für Datenbankskripte, SQL-Abfragen und Stored Procedures
- `documentation/` für Arbeitspakete, Spezifikation, Businessprozesse und Projektdokumentation

Die Webanwendung kann Daten über die REST-API abrufen. Das Backend führt im aktuellen Code freigegebene SQL-Dateien über PDO aus und gibt die Ergebnisse als JSON an das Frontend zurück. Die passenden Stored Procedures sind vorhanden, aber noch nicht in die API eingebunden.

## Bezug zu den Businessprozessen

Die vorbereitete Infrastruktur unterstützt den aktuellen Projektfokus auf zwei Businessprozesse:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Die SQL- und Stored-Procedure-Struktur ist nach fachlichen Bereichen gegliedert. Dadurch können Abfragen für BP1 und BP2 getrennt gepflegt und in der Dokumentation nachvollziehbar beschrieben werden.

Für den BP1-Applikationsbezug wurden außerdem zwei Dashboarddiagramme und die Tabelle `BESTANDSBEWEGUNG` einschließlich Migration vorbereitet.

## Abgrenzung

AP17 beschreibt die Vorbereitung der Implementierungsumgebung. Eine vollständige Fertigstellung aller Funktionen ist nicht Bestandteil dieses Arbeitspakets.

Nicht dokumentiert werden geheime Zugangsdaten, Passwörter, Tokens oder private Serverkonfigurationen.

## Ergebnis

Die technische Grundlage ist vorbereitet. Offen bleibt vor allem die produktive Stored-Procedure-Anbindung in der PHP-API.

## Dauer

Dauer: 2 Tage
