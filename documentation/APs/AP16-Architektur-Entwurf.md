# AP16 – Architektur Entwurf

Status: abgeschlossen

## Ziel

Die geplante Architektur des Softwaresystems wurde entworfen und dokumentiert.

## Architekturüberblick

Die Anwendung ist als mehrschichtige Webanwendung aufgebaut.

```text
Webanwendung
    |
    v
Businessprozesse BP1 und BP2
    |
    v
Stored Procedures
    |
    v
MariaDB-Datenbank
```

Im Mittelpunkt stehen die zwei ausgewählten Businessprozesse:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Die Webanwendung stellt die fachlichen Funktionen für diese Prozesse bereit. Die Daten werden über eine REST-API aus dem Backend geladen und als JSON an das Frontend zurückgegeben.

## Technische Architektur

| Ebene | Umsetzung |
|---|---|
| Frontend | React mit TypeScript und Vite |
| API / Backend | PHP-REST-API |
| Datenzugriff | SQL-Abfragen und Stored Procedures |
| Datenbank | MariaDB-Datenbank mit Ressourcen-, Lager- und Bestandsdaten |
| Sicherheit | Login, Session, CSRF-Token und Ablaufzeiten |

Das Frontend sendet Anfragen an die REST-API und übergibt dabei Parameter wie den gewünschten Endpunkt, Query-Namen oder Session-Informationen.

Das PHP-Backend prüft die Anfrage, validiert CSRF-Token und Session-Daten, führt die passenden SQL-Abfragen oder Stored Procedures aus und sendet die Ergebnisse als JSON zurück.

## Stored Procedures

Die SQL-Abfragen aus dem vorherigen Projektstand wurden strukturiert und teilweise als Stored Procedures vorbereitet.

Für die zwei Hauptprozesse sind besonders relevant:

- `getNachschubanforderungen()`
- `getExterneAbgabeVorbereitung()`

Dadurch bleibt die fachliche Logik näher an der Datenbank. Das Backend muss nicht die vollständige Query-Logik kennen, sondern kann definierte Datenbankfunktionen aufrufen.

## Weiterentwicklung

Aktuell wird das Backend über PHP umgesetzt. Perspektivisch kann die Backend-Logik vollständig in eine modernere Webarchitektur überführt werden, zum Beispiel in eine Next.js-basierte API-Struktur.

## Ergebnis

Die Architektur ist für den aktuellen Projektumfang ausreichend beschrieben. Frontend, REST-API, Backend, Stored Procedures und Datenbank sind als zusammenhängende Systembestandteile dokumentiert.

## Dauer

Dauer: 2 Tage
