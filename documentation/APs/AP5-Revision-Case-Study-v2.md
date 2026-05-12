# AP5 – Revision Case Study v2

## 1. Ziel der zweiten Revision

Die Case Study wurde nach dem zweiten Gespräch mit Prof. Dr. Becking erneut überarbeitet. Das wichtigste Ergebnis des Feedbacks war, dass sich das Projekt nicht auf zu viele Geschäftsprozesse gleichzeitig konzentrieren soll.

Deshalb wird die Case Study in dieser zweiten Revision bewusst enger gefasst. Im Mittelpunkt stehen nur noch die fachlichen Bereiche, die direkt zu den ausgewählten Businessprozessen passen:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Andere Themen wie Transport, Energie, Personal oder komplexe Lageroptimierung bleiben fachlich interessant, gehören aber nicht mehr zum aktuellen Hauptfokus dieser Revision.

## 2. Ausgangslage

Die ursprüngliche Case Study zur Mars Logistik Verwaltung [ALS] war sehr breit angelegt. Sie umfasste Ressourcen, Lager, Transport, Energieversorgung, Städte, Bewohner, Mitarbeitende, Fahrzeuge und weitere Verwaltungsbereiche.

Diese Breite passt zwar grundsätzlich zur Idee einer Marskolonie, ist für das Semesterprojekt aber zu umfangreich. Laut Feedback soll nicht möglichst viel beschrieben werden, sondern eine kleinere Auswahl sauber und realistisch ausgearbeitet werden.

Die vorhandene technische Grundlage bleibt weiterhin wichtig. SQL-Abfragen, WebApp und Datenbankstruktur werden aber nur dort einbezogen, wo sie die ausgewählten Businessprozesse direkt unterstützen.

## 3. Anlass der Überarbeitung

Im zweiten Gesprächsprotokoll wurde festgehalten, dass sechs mögliche Businessprozesse vorbereitet wurden. Prof. Dr. Becking hat empfohlen, sich auf ein bis zwei zentrale Prozesse zu konzentrieren, damit Umfang, BPMN-Modellierung, Dokumentation und technische Umsetzung realistisch bleiben.

Die Gruppe hat sich deshalb auf folgende zwei Businessprozesse festgelegt:

| Nr. | Ausgewählter Businessprozess | Grund für die Auswahl |
|---:|---|---|
| 1 | Kritische Ressourcen überwachen und Nachschub auslösen | Dieser Prozess passt direkt zur Kernidee der Marskolonie, weil lebenswichtige Ressourcen wie Sauerstoff, Wasser, Nahrung oder Ersatzteile überwacht werden müssen. |
| 6 | Überschüssige Ressourcen an externe Unternehmen verkaufen | Dieser Prozess erzeugt wirtschaftlichen Nutzen, weil überschüssige oder lokal produzierte Ressourcen kontrolliert verwertet werden können. |

Diese beiden Prozesse passen am besten zum vorhandenen Datenbankstand und können mit weniger strukturellen Änderungen umgesetzt oder dokumentiert werden.

## 4. Überarbeitete Case Study

Die Mars Logistik Verwaltung [ALS] ist eine datenbankgestützte Webanwendung zur Verwaltung kritischer Ressourcen einer simulierten Marskolonie.

Die Kolonie ist auf eine stabile Versorgung angewiesen. Wenn wichtige Ressourcen unter einen Mindestbestand fallen, entstehen Risiken für Betrieb, Produktion und Überleben der Kolonie. Deshalb soll das System kritische Ressourcen sichtbar machen und die Grundlage dafür liefern, rechtzeitig Nachschubmaßnahmen einzuleiten.

Gleichzeitig können Ressourcenüberschüsse entstehen. Diese Überschüsse sollen nicht unkontrolliert gelagert werden, sondern wirtschaftlich bewertet und perspektivisch an externe Unternehmen verkauft werden. Dadurch können Lagerkosten reduziert und zusätzliche Einnahmen für die Kolonie erzielt werden.

Die Case Study konzentriert sich damit nicht mehr auf alle möglichen Verwaltungsbereiche der Marskolonie, sondern auf den Kern: **Ressourcen erkennen, bewerten, absichern und wirtschaftlich nutzen.**

## 5. Fachlicher Fokus nach Feedback

| Bereich | Gehört zum aktuellen Fokus? | Begründung |
|---|---|---|
| Ressourcenbestände anzeigen | Ja | Grundlage für beide ausgewählten Businessprozesse. |
| Kritische Ressourcen erkennen | Ja | Direkt Teil des Prozesses „Kritische Ressourcen überwachen und Nachschub auslösen“. |
| Nachschubbedarf ableiten | Ja | Fachlicher Folgeschritt aus der Erkennung kritischer Ressourcen. |
| Überschüssige Ressourcen erkennen | Ja | Direkt Teil des Prozesses „Überschüssige Ressourcen an externe Unternehmen verkaufen“. |
| Verkaufspotenzial bewerten | Ja | Unterstützt den wirtschaftlichen Nutzen der Case Study. |
| Transportmissionen | Nein, nicht Hauptfokus | Wurde im Feedback nicht als zentraler Prozess für die weitere Umsetzung ausgewählt. |
| Energieversorgung | Nein, nicht Hauptfokus | Fachlich sinnvoll, aber aktuell nicht Teil der engeren Revision. |
| Personalplanung | Nein, nicht Hauptfokus | Bleibt mögliche Erweiterung, gehört aber nicht zu den zwei ausgewählten Prozessen. |
| Vollständige Abrechnung | Nein, spätere Erweiterung | Ein vollständiges Verkaufs- und Zahlungssystem ist für den aktuellen Projektumfang zu groß. |

## 6. Bezug zu den ausgewählten Businessprozessen

| Businessprozess | Bezug zur Case Study | Nutzen |
|---|---|---|
| Kritische Ressourcen überwachen und Nachschub auslösen | Das System zeigt Ressourcenbestände, Mindestwerte und kritische Versorgungslagen. | Engpässe können früher erkannt und Nachschubmaßnahmen fachlich vorbereitet werden. |
| Überschüssige Ressourcen an externe Unternehmen verkaufen | Das System nutzt Ressourcen- und Lagerdaten, um mögliche Überschüsse sichtbar zu machen. | Überschüsse können wirtschaftlich bewertet und perspektivisch verkauft werden. |

Die Case Study wird damit bewusst auf diese zwei Prozesse reduziert. Use Cases, SQL-Abfragen und WebApp-Funktionen sollen nur dann in den Vordergrund gestellt werden, wenn sie diese beiden Prozesse direkt unterstützen.

## 7. Abgrenzung

| Nicht im aktuellen Fokus | Grund |
|---|---|
| Transportmissionen planen und auswerten | Zu großer Zusatzumfang für die aktuelle Revision. |
| Energieengpässe erkennen und Lastverteilung einleiten | Fachlich interessant, aber nicht Teil der ausgewählten Hauptprozesse. |
| Personal- und Arbeitseinsätze planen | Gehört nicht direkt zur Ressourcenüberwachung oder zum Ressourcenverkauf. |
| Vollständiges Verkaufsmodul mit Rechnung und Zahlung | Kann später ergänzt werden, ist aber nicht notwendig für die aktuelle Case Study. |
| Automatische Nachschubbestellung | Der Nachschubbedarf soll erkennbar werden; eine vollständige Automatisierung ist später möglich. |

## 8. Ergebnis der Case-Study-Revision

- Die Case Study wurde nach dem Feedback deutlich reduziert.
- Der Fokus liegt jetzt auf zwei ausgewählten Businessprozessen.
- Die Dokumentation soll nicht mehr alle möglichen Projektideen gleich stark behandeln.
- Use Cases werden nur noch aufgenommen, wenn sie direkt zu den ausgewählten Businessprozessen passen.
- SQL-Abfragen bleiben technische Unterstützung und sind keine eigenen Use Cases.
- Weitere Themen bleiben als mögliche spätere Erweiterung erhalten, stehen aber nicht im Mittelpunkt.

## 9. Kurzfazit

Die zweite Revision sorgt dafür, dass die Case Study realistischer und klarer wird. Mars Logistik Verwaltung [ALS] konzentriert sich jetzt auf die Überwachung kritischer Ressourcen und die wirtschaftliche Nutzung überschüssiger Ressourcen, weil genau diese Prozesse nach dem Feedback als sinnvoller Hauptfokus ausgewählt wurden.
