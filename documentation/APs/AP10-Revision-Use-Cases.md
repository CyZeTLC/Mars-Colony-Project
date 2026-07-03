# AP10 – Revision Use Cases v2

Stand: 03.07.2026

## 1. Ziel der zweiten Revision

Die Use Cases wurden nach dem zweiten Gespräch mit Prof. Dr. Becking erneut überarbeitet. Das wichtigste Ergebnis des Feedbacks war, dass das Projekt nicht zu viele Geschäftsprozesse und damit auch nicht zu viele Use Cases gleichzeitig behandeln soll.

Deshalb wird AP10 in dieser zweiten Revision bewusst enger gefasst. Im Mittelpunkt stehen nur noch Use Cases, die direkt zu den zwei ausgewählten Businessprozessen passen:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Andere mögliche Use Cases aus Transport, Energie, Personal, Städten, Bewohnern oder allgemeinen SQL-Auswertungen bleiben fachlich interessant, gehören aber nicht mehr zum aktuellen Hauptfokus dieser Revision.

## 2. Ausgangslage

Die ursprüngliche Use-Case-Sammlung zur Mars Logistik Verwaltung [ALS] war sehr breit angelegt. Sie enthielt viele mögliche Systemhandlungen, die aus der WebApp, den SQL-Dateien, der Datenbankstruktur und der allgemeinen Case Study abgeleitet wurden.

Diese Breite passt zwar grundsätzlich zur Idee einer Marskolonie, ist für das Semesterprojekt aber zu umfangreich. Laut Feedback soll nicht möglichst viel beschrieben werden, sondern eine kleinere Auswahl sauber, nachvollziehbar und passend zu den Businessprozessen ausgearbeitet werden.

Die vorhandene technische Grundlage bleibt weiterhin wichtig. SQL-Abfragen, Stored Procedures und WebApp-Seiten werden aber nur dort als Unterstützung genannt, wo sie einen direkten Bezug zu den ausgewählten Use Cases haben.

## 3. Anlass der Überarbeitung

Im zweiten Gesprächsprotokoll wurde festgehalten, dass ursprünglich sechs mögliche Businessprozesse vorbereitet wurden. Prof. Dr. Becking hat empfohlen, sich auf ein bis zwei zentrale Prozesse zu konzentrieren, damit BPMN-Modellierung, Dokumentation und technische Umsetzung realistisch bleiben.

Für AP10 bedeutet das: Die Use Cases werden nicht mehr aus allen vorhandenen Projektbereichen gesammelt, sondern aus den zwei ausgewählten Hauptprozessen abgeleitet.

| Nr. | Ausgewählter Businessprozess | Bedeutung für die Use Cases |
|---:|---|---|
| 1 | Kritische Ressourcen überwachen und Nachschub auslösen | Use Cases müssen zeigen, wie Ressourcenbestände sichtbar werden, kritische Bestände erkannt und Nachschubbedarf fachlich vorbereitet wird. |
| 6 | Überschüssige Ressourcen an externe Unternehmen verkaufen | Use Cases müssen zeigen, wie Ressourcenüberschüsse erkannt, wirtschaftlich bewertet und eine mögliche externe Abgabe vorbereitet wird. |

## 4. Abgrenzung: Businessprozess, Use Case und SQL-Query

| Begriff | Bedeutung im Projekt |
|---|---|
| Businessprozess | Größerer fachlicher Ablauf mit wirtschaftlichem oder organisatorischem Ziel. |
| Use Case | Konkrete Handlung eines Nutzers mit dem System innerhalb eines Businessprozesses. |
| SQL-Query / Stored Procedure | Technische Unterstützung, um Daten für einen Use Case bereitzustellen. |

Wichtig: SQL-Queries sind keine eigenen Use Cases. Eine SQL-Datei wie `sql/queries/bp1/getRessourcesBelowMin.sql` ist also nicht der Use Case selbst, sondern unterstützt den Use Case „Kritische Ressourcen anzeigen“ technisch.

Beispiel:

| Ebene | Beispiel |
|---|---|
| Businessprozess | Kritische Ressourcen überwachen und Nachschub auslösen |
| Use Case | Kritische Ressourcen anzeigen |
| Technische Unterstützung | Abfrage von Ressourcenbeständen und Mindestwerten |

## 5. Final ausgewählte Use Cases

| Nr. | Finaler Use Case | Zugehöriger Businessprozess | Beschreibung | Priorität |
|---:|---|---|---|---|
| 1 | Ressourcenbestand anzeigen | Kritische Ressourcen überwachen und Nachschub auslösen | Die Kolonieleitung sieht vorhandene Ressourcen mit Menge, Einheit und Lagerbezug. | Hoch |
| 2 | Kritische Ressourcen anzeigen | Kritische Ressourcen überwachen und Nachschub auslösen | Das System macht sichtbar, welche Ressourcen unter einem Mindestbestand liegen oder kritisch werden können. | Hoch |
| 3 | Nachschubbedarf erkennen | Kritische Ressourcen überwachen und Nachschub auslösen | Aus kritischen Beständen wird fachlich ableitbar, für welche Ressourcen Nachschub vorbereitet werden muss. | Hoch |
| 4 | Überschüssige Ressourcen anzeigen | Überschüssige Ressourcen an externe Unternehmen verkaufen | Die Kolonieleitung erkennt Ressourcen, die über dem notwendigen Mindestbestand liegen könnten. | Hoch |
| 5 | Verkaufspotenzial bewerten | Überschüssige Ressourcen an externe Unternehmen verkaufen | Überschüsse werden anhand von Ressourcentyp, Menge und Lagerbezug als mögliche externe Abgabe bewertet. | Mittel |
| 6 | Externe Abgabe vorbereiten | Überschüssige Ressourcen an externe Unternehmen verkaufen | Auf Basis der Ressourcendaten wird eine mögliche Abgabe oder ein späterer Verkauf fachlich vorbereitet. | Mittel |

Diese ausgewählten Use Cases bilden den aktuellen Fokus. Sie wurden ausgewählt, weil sie direkt aus den beiden Businessprozessen entstehen und zur überarbeiteten Case Study passen.

Für die Abschlusspräsentation werden die Use Cases 1 bis 3 aus BP1 priorisiert. Die Use Cases 4 bis 6 bleiben dokumentierter Projektumfang.

## 6. Fachlicher Fokus nach Feedback

| Bereich | Gehört zum aktuellen Fokus? | Begründung |
|---|---|---|
| Ressourcenbestand anzeigen | Ja | Grundlage für beide ausgewählten Businessprozesse. |
| Kritische Ressourcen erkennen | Ja | Direkter Bestandteil des Prozesses „Kritische Ressourcen überwachen und Nachschub auslösen“. |
| Nachschubbedarf ableiten | Ja | Fachlicher Folgeschritt aus der Erkennung kritischer Ressourcen. |
| Überschüssige Ressourcen erkennen | Ja | Direkter Bestandteil des Prozesses „Überschüssige Ressourcen an externe Unternehmen verkaufen“. |
| Verkaufspotenzial bewerten | Ja | Unterstützt den wirtschaftlichen Nutzen des zweiten Businessprozesses. |
| Transportmissionen anzeigen | Nein, nicht Hauptfokus | Gehört eher zu einem eigenen Transportprozess. |
| Fahrzeugverfügbarkeit prüfen | Nein, nicht Hauptfokus | Unterstützt Transportplanung, aber nicht direkt die zwei ausgewählten Prozesse. |
| Energieengpässe anzeigen | Nein, nicht Hauptfokus | Fachlich sinnvoll, aber nach Feedback nicht Teil der engeren Revision. |
| Personalverfügbarkeit prüfen | Nein, nicht Hauptfokus | Gehört zur Personalplanung und nicht direkt zur Ressourcenüberwachung oder zum Ressourcenverkauf. |
| Bewohnerdaten anzeigen | Nein, nicht Hauptfokus | Stammdatenverwaltung, aber kein direkter Use Case der beiden Hauptprozesse. |
| Allgemeine SQL-Auswertungen prüfen | Nein, technische Unterstützung | SQL-Abfragen unterstützen Use Cases, ersetzen sie aber nicht. |

## 7. Technische Unterstützung der ausgewählten Use Cases

| Finaler Use Case | Benötigte Daten | Mögliche technische Unterstützung | Bemerkung |
|---|---|---|---|
| Ressourcenbestand anzeigen | Ressourcentyp, Menge, Einheit, Lagerbezug | `getRessourcenWithLager()` und `getResourceStockLevels.sql` | Bestandsdiagramm im Dashboard; Ressourcenansicht vorbereitet. |
| Kritische Ressourcen anzeigen | Menge, Mindestbestand, Ablauf- und Lagerinformationen | `getRessourcesBelowMin()` und `getRessourcesAtRisk()` | Zentral für BP1. |
| Nachschubbedarf erkennen | Kritische Bestände, Mindestwerte, Verbrauch und Lagerort | `getNachschubanforderungen()` | Datenbanklogik vorhanden; kein vollständiger Bestellablauf in der UI. |
| Überschüssige Ressourcen anzeigen | Aktuelle Menge, Mindestreserve und Lagerdaten | `getRessourcenUeberschuss()` | Datenbanklogik vorhanden. |
| Verkaufspotenzial bewerten | Überschussmenge, Ressourcentyp, Lagerort und Freigabe | `getVerkaufspotenzial()` | Datenbanklogik vorhanden. |
| Externe Abgabe vorbereiten | Unternehmen, Ressource, Menge und Wert | `getExterneAbgabeVorbereitung()` | Verkaufstabellen und Beispieldaten vorhanden; keine vollständige UI. |

## 8. Abgrenzung

| Nicht im aktuellen Fokus | Grund |
|---|---|
| Transportmissionen planen und auswerten | Zu großer Zusatzumfang für die aktuelle Revision. |
| Energieengpässe erkennen und Lastverteilung einleiten | Fachlich interessant, aber nicht Teil der ausgewählten Hauptprozesse. |
| Personal- und Arbeitseinsätze planen | Gehört nicht direkt zur Ressourcenüberwachung oder zum Ressourcenverkauf. |
| Städte und Bewohner verwalten | Wichtig als Datenbasis, aber kein Haupt-Use-Case der aktuellen Revision. |
| Vollständiges Verkaufsmodul mit Rechnung und Zahlung | Kann später ergänzt werden, ist aber für AP10 nicht notwendig. |
| Automatische Nachschubbestellung | Der Nachschubbedarf soll erkennbar werden; eine vollständige Automatisierung ist später möglich. |

## 9. Ergebnis der Use-Case-Revision

- Die Use Cases wurden nach dem Feedback deutlich reduziert.
- Der Fokus liegt jetzt auf Use Cases zu zwei ausgewählten Businessprozessen.
- Die Dokumentation behandelt nicht mehr alle möglichen Projektideen gleich stark.
- SQL-Abfragen und Stored Procedures werden als technische Unterstützung eingeordnet.
- Transport, Energie, Personal, Bewohnerverwaltung und allgemeine SQL-Übersichten werden nicht mehr als Haupt-Use-Cases behandelt.
- Weitere Themen bleiben als mögliche spätere Erweiterung erhalten.

## 10. Kurzfazit

Die zweite Revision sorgt dafür, dass die Use Cases realistischer und klarer werden. AP10 zeigt jetzt nur noch die Systemhandlungen, die direkt zum aktuellen Fokus der Mars Logistik Verwaltung [ALS] gehören: kritische Ressourcen erkennen, Nachschubbedarf ableiten, Ressourcenüberschüsse sichtbar machen und deren wirtschaftliche Nutzung vorbereiten.

## Dauer

Dauer: 1 Tag
