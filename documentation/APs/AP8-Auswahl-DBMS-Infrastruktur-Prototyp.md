# AP8 – Auswahl DBMS, Infrastruktur und Prototyp

Status: abgeschlossen, Stand 03.07.2026

## Entscheidung

Für den aktuellen Projektstand wird **MariaDB/MySQL** verwendet. Die Datenbank läuft in der vorhandenen Serverumgebung; ein neues Oracle-Schema ist nicht erforderlich. Oracle-Skripte bleiben als Alt-/Alternativstand im Repository.

## Infrastruktur

| Bereich | Umsetzung |
|---|---|
| Frontend | React 19, TypeScript 6 und Vite 8 |
| Backend | PHP-REST-API |
| Datenbankzugriff | PDO |
| Datenbank | MariaDB/MySQL |
| Datenbankschema | `sql/build/mysql.sql` und `sql/build/marskolonie_mysql.sql` |
| Migration für Diagramme | `sql/build/resourceGraphsMigration.sql` |
| Sicherheit | Login, PHP-Session und CSRF-Token |
| Betrieb | vorhandene externe Serverumgebung; lokale Entwicklung über Vite |

Zugangsdaten, Tokens und private Serverdetails werden nicht dokumentiert.

## Datenbanklogik

Die fachlichen SQL-Dateien und Stored Procedures sind identisch nach `bp1`, `bp2`, `shared` und `general` strukturiert. Es bestehen 38 Query-/Procedure-Paare.

Die aktuelle PHP-API führt SQL-Dateien über PDO aus. Die im dritten Gesprächsprotokoll geforderte produktive Ausführung über Stored Procedures ist noch nicht angebunden und bleibt der zentrale Integrationspunkt.

## Prototyp

Die Webanwendung enthält Seiten für Dashboard, Ressourcen, Fahrzeuge, Mitarbeitende, Städte, Bewohner und SQL-Übersicht. Für BP1 sind besonders relevant:

- Ressourcen- und Lageransichten,
- Diagramm zum Ressourcenverbrauch,
- Diagramm zum Verhältnis von Bestand und Mindestbestand,
- BP1-Abfragen und passende Stored Procedures.

BP2 wird durch Verkaufstabellen, Beispieldaten und drei fachliche Stored Procedures unterstützt; eine vollständige Verkaufsoberfläche gehört nicht zum aktuellen Kern.

## Ergebnis

DBMS, Infrastruktur und Prototyp sind für den Projektumfang festgelegt. Die technische Linie ist React/TypeScript → PHP-API → MariaDB/MySQL. Stored Procedures bilden den vorgesehenen nächsten Datenzugriffsschritt.

## Dauer

Dauer: 2 Tage
