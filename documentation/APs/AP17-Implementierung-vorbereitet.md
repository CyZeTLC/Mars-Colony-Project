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
| Datenzugriff | SQL-Abfragen und Stored Procedures |
| Versionierung | GitHub mit Branches, Commits und Pull Requests |
| Organisation | ClickUp, Discord und regelmäßige Abstimmung im Praktikum |

## Technische Vorbereitung

Das Repository enthält die grundlegende Projektstruktur für die Implementierung:

- `src/` für Frontend-Komponenten, Seiten und Hilfsfunktionen
- `api/` für PHP-Backend, Login und REST-API
- `sql/` für Datenbankskripte, SQL-Abfragen und Stored Procedures
- `documentation/` für Arbeitspakete, Spezifikation, Businessprozesse und Projektdokumentation

Die Webanwendung kann Daten über die REST-API abrufen. Das Backend führt die passenden SQL-Abfragen oder Stored Procedures aus und gibt die Ergebnisse als JSON an das Frontend zurück.

## Bezug zu den Businessprozessen

Die vorbereitete Infrastruktur unterstützt den aktuellen Projektfokus auf zwei Businessprozesse:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Die SQL- und Stored-Procedure-Struktur ist nach fachlichen Bereichen gegliedert. Dadurch können Abfragen für BP1 und BP2 getrennt gepflegt und in der Dokumentation nachvollziehbar beschrieben werden.

## Abgrenzung

AP17 beschreibt die Vorbereitung der Implementierungsumgebung. Eine vollständige Fertigstellung aller Funktionen ist nicht Bestandteil dieses Arbeitspakets.

Nicht dokumentiert werden geheime Zugangsdaten, Passwörter, Tokens oder private Serverkonfigurationen.

## Ergebnis

Die technische Grundlage für die weitere Implementierung ist vorbereitet. Frontend, Backend, Datenbankskripte, Stored Procedures, Repository-Struktur und Arbeitsorganisation sind so eingerichtet, dass die ausgewählten Businessprozesse schrittweise umgesetzt und dokumentiert werden können.

## Dauer

Dauer: 2 Tage
