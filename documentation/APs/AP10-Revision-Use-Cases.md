# AP10 – Revision Use Cases

## 1. Ziel des Arbeitspakets

In AP10 werden die Use Cases nach dem Feedback von Prof. Dr. Becking überarbeitet und reduziert. Der Fokus liegt nicht mehr auf einer möglichst großen Sammlung möglicher Use Cases, sondern nur noch auf den Use Cases, die direkt zu den ausgewählten Businessprozessen gehören.

Die ausgewählten Businessprozesse sind:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Alle Use Cases in dieser Datei müssen einen direkten Bezug zu einem dieser beiden Businessprozesse haben.

## 2. Grund für die Reduktion

Ursprünglich gab es viele mögliche Use Cases aus Case Study, WebApp, SQL-Abfragen und Projektideen. Dazu gehörten zum Beispiel Transport, Energie, Personal, Städte, Bewohner und allgemeine SQL-Auswertungen.

Nach dem Feedback wurde entschieden, dass diese Breite für das Semesterprojekt zu groß ist. Die Projektarbeit soll sich auf wenige zentrale Prozesse konzentrieren, die sauber beschrieben, modelliert und technisch nachvollziehbar unterstützt werden können.

Deshalb werden in AP10 nur noch Use Cases aufgenommen, die zu den beiden ausgewählten Businessprozessen passen. Andere Use Cases werden nicht verworfen, aber sie gehören nicht zum aktuellen Hauptfokus.

## 3. Abgrenzung: Businessprozess, Use Case und SQL-Query

| Begriff | Bedeutung im Projekt |
|---|---|
| Businessprozess | Größerer fachlicher Ablauf mit wirtschaftlichem oder organisatorischem Ziel. |
| Use Case | Konkrete Handlung eines Nutzers mit dem System innerhalb eines Businessprozesses. |
| SQL-Query / Stored Procedure | Technische Unterstützung, um Daten für einen Use Case bereitzustellen. |

Wichtig: SQL-Queries sind keine Use Cases. Eine SQL-Datei wie `getRessourcesBelowMin.sql` ist also nicht der Use Case selbst, sondern kann einen Use Case technisch unterstützen.

Beispiel:

| Ebene | Beispiel |
|---|---|
| Businessprozess | Kritische Ressourcen überwachen und Nachschub auslösen |
| Use Case | Kritische Ressourcen anzeigen |
| Technische Unterstützung | Abfrage von Ressourcenbeständen und Mindestwerten |

## 4. Final ausgewählte Use Cases

| Nr. | Finaler Use Case | Zugehöriger Businessprozess | Beschreibung | Priorität |
|---:|---|---|---|---|
| 1 | Ressourcenbestand anzeigen | Kritische Ressourcen überwachen und Nachschub auslösen | Nutzer sieht vorhandene Ressourcen mit Menge, Einheit und Lagerbezug. | Hoch |
| 2 | Kritische Ressourcen anzeigen | Kritische Ressourcen überwachen und Nachschub auslösen | Nutzer erkennt Ressourcen, deren Bestand unter einem Mindestwert liegt oder kritisch werden kann. | Hoch |
| 3 | Nachschubbedarf erkennen | Kritische Ressourcen überwachen und Nachschub auslösen | Nutzer kann aus kritischen Beständen ableiten, dass Nachschub vorbereitet werden muss. | Hoch |
| 4 | Überschüssige Ressourcen anzeigen | Überschüssige Ressourcen an externe Unternehmen verkaufen | Nutzer erkennt Ressourcen, die über dem notwendigen Mindestbestand liegen könnten. | Hoch |
| 5 | Verkaufspotenzial bewerten | Überschüssige Ressourcen an externe Unternehmen verkaufen | Nutzer bewertet, welche Ressourcen wirtschaftlich für eine externe Abgabe geeignet sein könnten. | Mittel |
| 6 | Verkauf oder externe Abgabe vorbereiten | Überschüssige Ressourcen an externe Unternehmen verkaufen | Nutzer bereitet auf Basis der Ressourcendaten eine mögliche Abgabe an externe Unternehmen fachlich vor. | Mittel |

Diese sechs Use Cases bilden den aktuellen Fokus. Sie wurden ausgewählt, weil sie direkt aus den beiden Businessprozessen entstehen und zur überarbeiteten Case Study passen.

## 5. Nicht mehr im Hauptfokus

| Nicht priorisierter Use Case | Grund |
|---|---|
| Transportmissionen anzeigen | Gehört nicht zu den zwei ausgewählten Businessprozessen. |
| Fahrzeugverfügbarkeit prüfen | Unterstützt eher Transportprozesse, nicht den aktuellen Ressourcenfokus. |
| Energieengpässe anzeigen | Fachlich sinnvoll, aber nach Feedback nicht Teil des engeren Fokus. |
| Ablaufende Ressourcen priorisieren | Kann später wieder aufgegriffen werden, steht aber nicht im Mittelpunkt der zwei ausgewählten Prozesse. |
| Personalverfügbarkeit prüfen | Gehört eher zur Personalplanung und nicht direkt zur Ressourcenüberwachung oder zum Ressourcenverkauf. |
| Bewohnerdaten anzeigen | Stammdatenverwaltung, aber kein direkter Use Case der beiden Hauptprozesse. |
| SQL-Auswertungen prüfen | Technische Funktion, aber kein fachlicher Use Case der Kolonieleitung. |

Diese Punkte bleiben als mögliche spätere Erweiterung erhalten. Sie werden in dieser AP10-Revision aber bewusst nicht weiter ausgearbeitet, damit der Projektumfang klar und realistisch bleibt.

## 6. Technische Unterstützung der ausgewählten Use Cases

| Finaler Use Case | Benötigte Daten | Mögliche technische Unterstützung | Bemerkung |
|---|---|---|---|
| Ressourcenbestand anzeigen | Ressourcentyp, Menge, Einheit, Lagerbezug | Vorhandene Ressourcen- und Lagerabfragen können diesen Use Case unterstützen. | Direkter Bezug zur Ressourcenübersicht. |
| Kritische Ressourcen anzeigen | Menge, Mindestschwellenwert, Lagerinformationen | Vorhandene oder ableitbare Abfragen zu Ressourcen unter Mindestbestand können unterstützen. | Zentral für Prozess 1. |
| Nachschubbedarf erkennen | Kritische Bestände, Mindestwerte, Lagerort | Lässt sich aus kritischen Ressourcen und Lagerdaten ableiten. | Keine vollständige automatische Bestellung notwendig. |
| Überschüssige Ressourcen anzeigen | Aktuelle Menge, Mindestbedarf, Lagerdaten | Lässt sich aus Ressourcenbestand, Mindestwerten und Lagerübersicht ableiten. | Zentral für Prozess 6. |
| Verkaufspotenzial bewerten | Überschussmenge, Ressourcentyp, Lagerort | Kann durch vorhandene Ressourcen- und Lagerdaten vorbereitet werden. | Vollständige Verkaufslogik ist noch nicht Kernumfang. |
| Verkauf oder externe Abgabe vorbereiten | Verkaufbare Ressource, Menge, Begründung der Abgabe | Kann in einer späteren Projektphase durch ein Verkaufsmodul ergänzt werden. | Aktuell vor allem fachliche Vorbereitung. |

## 7. Ergebnis der Use-Case-Revision

- Die Use Cases wurden nach dem Feedback reduziert.
- Es werden nur noch Use Cases aufgenommen, die direkt zu den ausgewählten Businessprozessen passen.
- Der Schwerpunkt liegt auf kritischen Ressourcen, Nachschubbedarf, Ressourcenüberschüssen und Verkaufspotenzial.
- Transport, Energie, Personal, Bewohnerverwaltung und allgemeine SQL-Übersichten werden nicht mehr als Haupt-Use-Cases behandelt.
- SQL-Abfragen werden nur als technische Unterstützung eingeordnet.
- Der Projektumfang ist dadurch klarer, realistischer und besser auf die weitere Arbeit ausgerichtet.

## 8. Kurzfazit

AP10 zeigt jetzt nur noch die Use Cases, die direkt zum aktuellen Fokus der Mars Logistik Verwaltung [ALS] gehören. Damit wird deutlich, dass sich das Projekt nach dem Feedback bewusst auf kritische Ressourcen und den wirtschaftlichen Umgang mit Ressourcenüberschüssen konzentriert.
