<div align="center">
  <img src="https://hsbi.cyzetlc.de/HSBI_Signet-scaled.png" alt="HSBI-Logo" width="600" height="120">

  <h3>Mars Logistik Verwaltung (ALS)</h3>
  <p>Datenbankgestützte Verwaltung einer simulierten Marskolonie</p>
</div>

## Projektfokus

Das Semesterprojekt verbindet eine React-Webanwendung mit einer PHP-REST-API und einer MariaDB-/MySQL-Datenbank. Fachlich umfasst das Projekt zwei Businessprozesse:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Für die Abschlusspräsentation steht gemäß dem Gesprächsprotokoll vom 24.06.2026 der erste Prozess im Mittelpunkt:

```text
Use Case → Businessprozess → BPMN-Modell → Stored Procedures → Applikationsbezug
```

## Technologie

| Bereich | Aktueller Stand |
|---|---|
| Frontend | React 19, TypeScript 6, Vite 8 |
| Oberfläche | Tailwind CSS 3, Material UI, Recharts |
| Backend | PHP mit PDO und JSON-REST-API |
| Datenbank | MariaDB/MySQL; Oracle-Skripte bleiben als Alt-/Alternativstand erhalten |
| Datenbanklogik | SQL-Abfragen und 38 zugeordnete Stored Procedures |
| Sicherheit | Login, Session und CSRF-Token |

## Lokaler Start

Voraussetzung für Vite 8 ist Node.js `^20.19.0` oder `>=22.12.0`.

```bash
git clone https://github.com/CyZeTLC/Mars-Colony-Project.git
cd Mars-Colony-Project
npm install
npm run dev
```

Für die vollständige Anwendung werden zusätzlich PHP, eine konfigurierte Datenbankverbindung in `api/config.inc.php` und ein MariaDB-/MySQL-Schema benötigt.

## Datenbank

- `sql/build/mysql.sql`: vollständiger Import mit Beispieldaten und `BESTANDSBEWEGUNG`
- `sql/build/marskolonie_mysql.sql`: aus dem Datenmodell erzeugtes MySQL-Schema
- `sql/build/resourceGraphsMigration.sql`: Migration und Demo-Verbrauchsdaten für eine bestehende Datenbank
- `sql/queries/`: lesbare Abfragen nach `bp1`, `bp2`, `shared` und `general`
- `sql/storedProcedure/`: passende Stored-Procedure-Varianten

Die zwei Abfragen für die BP1-Diagramme liegen direkt unter `sql/`, da die aktuelle API nur dort einzelne Dateien auflöst.

## API

Basis-URL:

```text
GET /api/restApi.php?action={action}
X-CSRF-Token: {token}
```

`generate_csrf` benötigt keinen Token. Alle anderen Aktionen erwarten ihn im HTTP-Header `X-CSRF-Token`; ein Token ist 24 Stunden gültig.

Wichtiger Implementierungsstand: Die Stored Procedures sind vollständig vorbereitet, die PHP-API führt im aktuellen Repository jedoch noch SQL-Dateien über PDO aus. Die Umstellung des produktiven Datenzugriffs auf Stored-Procedure-Aufrufe bleibt offen und folgt aus dem Feedback im dritten Gesprächsprotokoll.

## Dokumentation

Der Einstiegspunkt ist [`documentation/README.md`](documentation/README.md). Meeting Minutes unter `documentation/Gesprächsprotokoll/` sind die Referenz für Projektumfang, technische Leitlinie und Präsentationsfokus.

## Qualitätssicherung

```bash
npm run type-check
npm run lint
npm run build
```

## Lizenz

Siehe [`LICENSE.txt`](LICENSE.txt) und [`NOTICE.txt`](NOTICE.txt).
