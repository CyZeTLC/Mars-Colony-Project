# AP9 – Revision Implementierung

Status: abgeschlossen / überarbeitet

## 1. Ziel des Arbeitspakets

In AP9 wird geprüft, ob die vorhandene Implementierung zum reduzierten Projektfokus passt.

Nach dem Feedback von Prof. Dr. Becking stehen nur noch zwei Businessprozesse im Mittelpunkt:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Die Implementierung soll diese Prozesse nachvollziehbar unterstützen, ohne den Projektumfang unnötig zu vergrößern.

## 2. Ausgangspunkt vor der Revision

| Bereich | Stand vor der Revision |
|---|---|
| WebApp | React/TypeScript-WebApp mit Dashboard und Tabellenansichten ist vorhanden. |
| API | Eine PHP-API ist vorhanden und stellt Daten im JSON-Format bereit. |
| Datenbank | MariaDB/MySQL wird als aktuelle Datenbanklinie verwendet. |
| SQL-Dateien | SQL-Build-Dateien und fachliche Abfragen sind im Repository vorhanden. |
| Stored Procedures | 38 passende Stored Procedures sind vorhanden; die API-Anbindung ist offen. |
| Testdaten | In `sql/build/mysql.sql` sind Beispieldaten für die Demonstration enthalten. |

## 3. Bewertung nach Feedback

| Prüffrage | Ergebnis |
|---|---|
| Passt die Implementierung zu Prozess 1? | Ja. Ressourcenbestände, Mindestwerte und Lagerdaten sind bereits in der Datenbank vorhanden und können über SQL-Abfragen ausgewertet werden. |
| Passt die Implementierung zu Prozess 6? | Ja, nach Erweiterung. Für den Verkaufsprozess wurden zusätzliche Tabellen und Beispieldaten ergänzt. |
| Muss die gesamte WebApp neu gebaut werden? | Nein. Die vorhandene WebApp bleibt die zentrale Oberfläche. |
| Müssen Transport, Energie und Personal technisch weiter ausgebaut werden? | Nein. Diese Bereiche bleiben vorhanden, sind aber nicht Teil des aktuellen Kernumfangs. |

## 4. Umgesetzte Anpassungen

| Bereich | Anpassung | Nutzen |
|---|---|---|
| SQL-Build-Skripte | Verkaufstabellen in `marskolonie_mysql.sql` und `mysql.sql` ergänzt. | Prozess 6 kann datenbankseitig abgebildet werden. |
| Beispieldaten | Seed-Daten für externe Unternehmen, Überschussbewertungen und Verkaufspositionen ergänzt. | Der Verkaufsprozess ist in einer Präsentation leichter erklärbar. |
| BP1-Dashboard | Ressourcenverbrauch und Bestand gegen Mindestbestand ergänzt. | Der Applikationsbezug von BP1 ist direkt sichtbar. |
| Bestandsbewegungen | `BESTANDSBEWEGUNG` in `mysql.sql` sowie `resourceGraphsMigration.sql` ergänzt. | Verbrauchsdaten können über zwölf Monate demonstriert werden. |
| Ressourcenbezug | Verkaufspositionen beziehen sich auf konkrete Ressourcen und Lager. | Die Verbindung zwischen Lagerbestand und Verkauf bleibt nachvollziehbar. |
| Dokumentation | AP5, AP10, AP11, AP12 und AP13 wurden auf den Zwei-Prozess-Fokus ausgerichtet. | Implementierung und Dokumentation erzählen dieselbe fachliche Linie. |

## 5. Technische Unterstützung der Use Cases

| Use Case | Technische Unterstützung |
|---|---|
| Ressourcenbestand anzeigen | Vorhandene Ressourcen- und Lagerdaten in `RESSOURCE`, `LAGER` und `IST_GELAGERT_IN`. |
| Kritische Ressourcen anzeigen | Vergleich von `MENGE` und `MIN_SCHWELLENWERT` in `RESSOURCE`. |
| Nachschubbedarf erkennen | Ableitung aus kritischen Beständen und Lagerbezug. |
| Überschüssige Ressourcen anzeigen | Ableitung aus Menge, Mindestreserve und Lagerdaten. |
| Verkaufspotenzial bewerten | Tabelle `RESSOURCEN_UEBERSCHUSS_BEWERTUNG`. |
| Externe Abgabe vorbereiten | Tabellen `RESSOURCEN_VERKAUF` und `RESSOURCEN_VERKAUF_POSITION`. |

## 6. Bewusste Abgrenzung

Nicht umgesetzt wird ein vollständiges Verkaufs- und Zahlungssystem mit Rechnung, Vertrag und Zahlungsstatus.

Nicht weiter ausgebaut werden außerdem Transportplanung, Energieverteilung, Personalplanung und vollständige Bewohnerverwaltung. Diese Bereiche bleiben als spätere Erweiterungen möglich, gehören aber nicht zum aktuellen Fokus.

## 7. Ergebnis der Revision

Die Implementierung passt zum reduzierten Projektumfang.

Prozess 1 wird durch vorhandene Ressourcen-, Lager- und Mindestbestandsdaten unterstützt. Prozess 6 wurde durch neue Verkaufstabellen und Seed-Daten ergänzt.

Die aktuelle PHP-API führt weiterhin SQL-Dateien aus. Die Stored Procedures sind vollständig vorbereitet, müssen gemäß Gesprächsprotokoll 03 aber noch produktiv angebunden werden.

Damit kann die Anwendung in der Präsentation als datenbankgestützte Unterstützung der zwei ausgewählten Businessprozesse erklärt werden.

## 8. Kurzfazit

AP9 zeigt, dass die vorhandene technische Grundlage nicht ersetzt werden muss. Die Implementierung wurde fachlich auf Ressourcenüberwachung und Ressourcenverkauf zugespitzt. Dadurch bleibt das Projekt realistisch, demonstrierbar und passend zur überarbeiteten Case Study.

## Dauer

Dauer: 2 Tage
