# AP7 – Revision Datenbankentwurf

Status: abgeschlossen / überarbeitet

## 1. Ziel des Arbeitspakets

In AP7 wird der Datenbankentwurf nach dem Feedback von Prof. Dr. Becking überprüft und an den reduzierten Projektfokus angepasst.

Im Mittelpunkt steht die Frage, ob der vorhandene Datenbankentwurf die zwei ausgewählten Businessprozesse ausreichend unterstützt:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

## 2. Anlass der Revision

Die ursprüngliche Projektidee war deutlich breiter angelegt und enthielt viele Bereiche der Marskolonie, zum Beispiel Transport, Energie, Personal, Städte, Bewohner und Fahrzeuge.

Nach dem zweiten Gespräch mit Prof. Dr. Becking wurde entschieden, den Projektumfang zu reduzieren. Dadurch muss der Datenbankentwurf nicht alle möglichen Geschäftsbereiche gleich stark unterstützen, sondern vor allem Ressourcen, Lagerbestände, kritische Mindestwerte und Ressourcenüberschüsse abbilden.

## 3. Ausgangspunkt vor der Revision

| Bereich | Stand vor der Revision |
|---|---|
| Datenbankmodell | PowerDesigner-Dateien und SQL-Build-Skripte sind im Repository vorhanden. |
| Tabellenstruktur | Tabellen für Ressourcen, Lager, Städte, Bewohner, Mitarbeitende, Fahrzeuge, Transport und Energie sind vorhanden. |
| Ressourcen und Lager | `RESSOURCE`, `LAGER` und `IST_GELAGERT_IN` bilden Ressourcenbestände und Lagerbezug ab. |
| Mindestbestand | In `RESSOURCE` ist mit `MIN_SCHWELLENWERT` eine Grundlage für kritische Bestände vorhanden. |
| Testdaten | In `sql/build/mysql.sql` sind Beispieldaten für Ressourcen, Lager und weitere Projektbereiche enthalten. |
| Bestandsverlauf | `BESTANDSBEWEGUNG` speichert Verbrauch, Nachschub und Korrekturen für die BP1-Diagramme. |
| DBMS-Linie | Für die aktuelle Dokumentation steht MariaDB/MySQL im Vordergrund. Oracle bleibt als vorhandene Alt- bzw. Alternativdatei im Repository erhalten. |

## 4. Bewertung nach Feedback

| Prüffrage | Ergebnis |
|---|---|
| Unterstützt das Modell Prozess 1? | Ja. Ressourcenbestände, Mindestwerte und Lagerbezug sind bereits abbildbar. |
| Unterstützt das Modell Prozess 6? | Teilweise. Die vorhandenen Ressourcen- und Lagerdaten reichen zur Erkennung von Überschüssen, für die fachliche Verkaufsvorbereitung wurden zusätzliche Tabellen ergänzt. |
| Sind große Änderungen am bestehenden Modell notwendig? | Nein. Der bestehende Entwurf bleibt erhalten und wird nur additiv erweitert. |
| Müssen Transport, Energie und Personal weiter ausgebaut werden? | Nein. Diese Bereiche bleiben vorhanden, gehören aber nicht zum aktuellen Hauptfokus. |

## 5. Anpassungen am Datenbankentwurf

Für den Prozess „Überschüssige Ressourcen an externe Unternehmen verkaufen“ wurden neue Tabellen ergänzt.

| Neue Tabelle | Zweck |
|---|---|
| `EXTERNES_UNTERNEHMEN` | Speichert externe Firmen, die Ressourcen kaufen oder übernehmen können. |
| `RESSOURCEN_UEBERSCHUSS_BEWERTUNG` | Dokumentiert, welche Ressourcen als Überschuss bewertet wurden. |
| `RESSOURCEN_VERKAUF` | Bildet einen vorbereiteten Verkauf oder eine externe Abgabe ab. |
| `RESSOURCEN_VERKAUF_POSITION` | Speichert die einzelnen Ressourcenpositionen eines vorbereiteten Verkaufs. |

Die Erweiterung wurde bewusst additiv umgesetzt. Bestehende Tabellen wurden nicht gelöscht und nicht grundlegend umgebaut.

## 6. Beziehungen zu bestehenden Tabellen

| Neue Beziehung | Bedeutung |
|---|---|
| Bewertung zu `IST_GELAGERT_IN` | Überschüsse beziehen sich auf eine konkrete Ressource in einem konkreten Lager. |
| Bewertung zu `MITARBEITER` | Eine Bewertung kann einer verantwortlichen Person zugeordnet werden. |
| Verkauf zu `EXTERNES_UNTERNEHMEN` | Jeder vorbereitete Verkauf hat ein externes Unternehmen als Empfänger. |
| Verkauf zu `MITARBEITER` | Ein Verkauf kann einer erstellenden Person zugeordnet werden. |
| Verkaufsposition zu Bewertung | Eine Verkaufsposition kann aus einer vorherigen Überschussbewertung entstehen. |
| Verkaufsposition zu `IST_GELAGERT_IN` | Die verkaufte Ressource bleibt fachlich mit Lager und Ressource verbunden. |

## 7. Testdaten

In `sql/build/mysql.sql` wurden Beispieldaten ergänzt, damit der Verkaufsprozess demonstrierbar ist.

Zusätzlich enthält `sql/build/mysql.sql` reproduzierbare Verbrauchsdaten für Wasser, Sauerstoff und Nahrung. Für bestehende Datenbanken liegt dieselbe Ergänzung als `sql/build/resourceGraphsMigration.sql` vor.

| Bereich | Beispieldaten |
|---|---|
| Externe Unternehmen | Deutsche Mars Bau GmbH, Deutsche Mars Versorgung AG |
| Überschussbewertungen | Eisenerz aus Lager 2, Aluminiumplatten aus Lager 2 |
| Vorbereiteter Verkauf | Verkauf an Deutsche Mars Bau GmbH |
| Verkaufspositionen | 3000 KG Eisenerz, 120 Stück Aluminiumplatten |

## 8. Bewusste Abgrenzung

Ein vollständiges Verkaufsmodul mit Rechnung, Zahlung, Vertrag und Buchhaltung ist nicht Teil des aktuellen Kernumfangs.

Für die aktuelle Revision reicht es, Ressourcenüberschüsse zu erkennen, wirtschaftlich zu bewerten und eine externe Abgabe fachlich vorzubereiten.

## 9. Ergebnis der Revision

Der Datenbankentwurf ist für den reduzierten Projektfokus geeignet.

Prozess 1 wird durch vorhandene Ressourcen-, Lager- und Mindestbestandsdaten unterstützt. Prozess 6 wird durch neue Verkaufstabellen und passende Beispieldaten ergänzt.

Die Datenbankstruktur bleibt damit realistisch, überschaubar und nah an der vorhandenen technischen Grundlage.

## 10. Kurzfazit

AP7 zeigt, dass der Datenbankentwurf nicht vollständig neu erstellt werden muss. Die vorhandene Struktur unterstützt den Ressourcenfokus bereits gut. Für den Verkauf überschüssiger Ressourcen wurden gezielt zusätzliche Tabellen ergänzt, ohne bestehende Projektbereiche unnötig umzubauen.

## Dauer

Dauer: 5 Tage
