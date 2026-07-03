# Projektdokumentation

Stand: 03.07.2026

Diese Dokumentation beschreibt den aktuellen Stand der **Mars Logistik Verwaltung [ALS]**. Verbindliche Referenz für fachliche Entscheidungen und Prioritäten sind die Gesprächsprotokolle.

## Aktueller Fokus

Das Projekt umfasst zwei Businessprozesse:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Für die Abschlusspräsentation wird BP1 als durchgehendes Beispiel verwendet:

```text
Use Case → Businessprozess → BPMN-Modell → Stored Procedures → Applikationsbezug
```

BP2 bleibt Teil des Projekts und der Dokumentation, steht in der Abschlusspräsentation aber nicht im Mittelpunkt.

## Zentrale Dokumente

| Dokument | Inhalt |
|---|---|
| [`Gesprächsprotokoll/`](Gesprächsprotokoll/) | Referenz für Feedback und Projektentscheidungen |
| [`businessprozesse-v2.md`](businessprozesse-v2.md) | Auswahl und Priorisierung der Businessprozesse |
| [`APs/AP10-Revision-Use-Cases.md`](APs/AP10-Revision-Use-Cases.md) | Use Cases für BP1 und BP2 |
| [`APs/AP11-BPMN-Modellierung-BP1-Kritische RessourcenÜberwachenUndNachschubAuslösen.md`](APs/AP11-BPMN-Modellierung-BP1-Kritische%20RessourcenÜberwachenUndNachschubAuslösen.md) | BP1 und finales BPMN-Modell |
| [`APs/AP11-BPMN-Modellierung-BP2-Ueberschuessige-Ressourcen-an-externe-Unternehmen-verkaufen.md`](APs/AP11-BPMN-Modellierung-BP2-Ueberschuessige-Ressourcen-an-externe-Unternehmen-verkaufen.md) | Fachliche BP2-Modellierung |
| [`lastenheft-und-pflichtenheft-v2.md`](lastenheft-und-pflichtenheft-v2.md) | Anforderungen und technischer Umsetzungsstand |
| [`datenbankabfragen-v4.md`](datenbankabfragen-v4.md) | SQL-Abfragen, Stored Procedures und BP1-Diagrammdaten |
| [`documentation-structure.md`](documentation-structure.md) | Vollständige Struktur und Status der Unterlagen |

## Technischer Ist-Stand

| Ebene | Umsetzung |
|---|---|
| Frontend | React 19, TypeScript 6 und Vite 8 |
| UI | Tailwind CSS 3, Material UI und Recharts |
| Backend | PHP-REST-API mit PDO |
| Datenbank | MariaDB/MySQL |
| Sicherheit | Login, PHP-Session und CSRF-Token im Header `X-CSRF-Token` |
| Datenbanklogik | 38 Query-Dateien und 38 passende Stored Procedures |

Die Webanwendung enthält Dashboard, Ressourcen-, Fahrzeug-, Mitarbeiter-, Bürger-, Städte- und SQL-Ansichten. Neu im BP1-Bezug sind Diagramme für Ressourcenverbrauch sowie Bestand gegen Mindestbestand.

Die Stored Procedures bilden gemäß Gesprächsprotokoll 03 die Zielarchitektur für Datenbankzugriffe. Die aktuelle PHP-API führt im Repository noch SQL-Dateien aus; eine produktive Stored-Procedure-Anbindung ist deshalb weiterhin offen.

## Datenbank einrichten

Für einen vollständigen MariaDB-/MySQL-Import:

```text
sql/build/mysql.sql
```

Für eine bestehende Datenbank mit noch fehlenden BP1-Diagrammdaten:

```text
sql/build/resourceGraphsMigration.sql
```

Das aus dem Datenmodell erzeugte Schema liegt zusätzlich unter `sql/build/marskolonie_mysql.sql`. Oracle-Dateien sind nur Alt-/Alternativstände und nicht die aktuelle Projektlinie.

## API-Grundform

```text
GET /api/restApi.php?action={action}
X-CSRF-Token: {token}
```

Der CSRF-Token wird über `generate_csrf` erzeugt und ist 24 Stunden gültig. Er wird als HTTP-Header übertragen, nicht als Queryparameter.

## Historische Dokumente

Der Ordner [`archive/`](archive/) enthält ersetzte Versionen. Sie bleiben zur Nachvollziehbarkeit unverändert und sind nicht als aktueller Projektstand zu lesen.
