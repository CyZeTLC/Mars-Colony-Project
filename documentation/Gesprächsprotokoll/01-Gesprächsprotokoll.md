# Gesprächsprotokoll – 1. Termin mit Herrn Becking

**Datum:** 29.04.2026  
**Aufgeschrieben von:** Leonardo Parrino  
**Projekt:** ALS  
**Thema:** Geschäftsprozesse, BPMN-Modellierung und Projektplanung

---

## 1. Hauptfokus des Termins

Der zentrale Punkt des Termins war, dass wir zuerst die **Geschäftsprozesse** sauber ausarbeiten sollen.

Die vorhandene UI ist grundsätzlich hilfreich, steht aber nicht am Anfang der Planung.  
Zuerst müssen die fachlichen Abläufe klar sein. Danach kann die UI passend dazu aufgebaut oder angepasst werden.

Kurz gesagt:

**Erst Prozesse verstehen und modellieren, danach die UI daraus ableiten.**

Im Mittelpunkt steht deshalb nicht nur, welche Daten angezeigt werden, sondern welcher reale Ablauf dahintersteht, welche Rollen beteiligt sind, welche Entscheidungen getroffen werden und welche Datenbanklogik dafür benötigt wird.

---

## 2. Geschäftsprozesse als Grundlage

Für das Projekt sollen mehrere sinnvolle Geschäftsprozesse ausgewählt und beschrieben werden.

Zu jedem Geschäftsprozess sollen wir klären:

1. Was löst den Prozess aus?
2. Welche Personen oder Rollen sind beteiligt?
3. Welche Daten werden benötigt?
4. Aus welchen Tabellen oder Quellen kommen diese Daten?
5. Was passiert Schritt für Schritt?
6. Welche Entscheidungen gibt es im Ablauf?
7. Welche Fehlerfälle, Fristen oder Sonderfälle können auftreten?
8. Was ist das Ergebnis des Prozesses?
9. Wie wird das Ergebnis später in der Anwendung dargestellt?
10. Welche Stored Procedures werden für diesen Prozess benötigt?

---

## 3. BPMN-Modellierung

Zu den ausgewählten Geschäftsprozessen sollen jeweils passende **BPMN-Modelle** erstellt werden.

Die BPMN-Modelle sollen sich an der Notation aus den Folien orientieren.

Wichtig sind dabei vor allem:

1. Start-Event
2. Aktivitäten
3. Gateways für Entscheidungen
4. Sequence Flows für den Ablauf innerhalb eines Prozesses
5. Message Flows bei Kommunikation zwischen Beteiligten
6. Pools und Lanes für unterschiedliche Rollen oder Prozessparteien
7. End-Events
8. Datenobjekte oder Datenspeicher, wenn Daten im Prozess verwendet werden

Das Ziel ist nicht nur ein optisch sauberes Diagramm.  
Das BPMN-Modell soll zeigen, dass wir den Prozess fachlich verstanden haben und ihn später technisch in der Datenbank und Anwendung umsetzen können.

---

## 4. Projektplan und Workload

Zusätzlich sollen wir einen strukturierten Projektplan erstellen.

Dabei soll jeder Task mit einem geschätzten Workload versehen werden.

Der Workload kann zum Beispiel in Stunden oder Personentagen angegeben werden.

Beispielhafte Struktur:

| Nr. | Task | Ergebnis | Workload |
|---:|---|---|---:|
| 1 | Geschäftsprozesse sammeln | Liste möglicher Prozesse | 2 h |
| 2 | Hauptprozesse auswählen | priorisierte Prozessliste | 1 h |
| 3 | Prozess 1 fachlich beschreiben | Prozessbeschreibung | 2 h |
| 4 | Prozess 1 als BPMN modellieren | BPMN-Diagramm | 3 h |
| 5 | benötigte Datenquellen bestimmen | Tabellen-/Datenliste | 2 h |
| 6 | Stored Procedures ableiten | Procedure-Liste | 3 h |
| 7 | UI-Anforderungen aus dem Prozess ableiten | Screens/Funktionsliste | 2 h |
| 8 | Fehlerfälle und Fristen ergänzen | Sonderfallliste | 2 h |
| 9 | Projektplan finalisieren | Meilensteinplan | 2 h |
| 10 | Präsentation vorbereiten | Folien für Herrn Becking | 3 h |

---

## 5. Präsentation bei Herrn Becking

Alle Ergebnisse sollen strukturiert aufbereitet und Herrn Becking persönlich vorgestellt werden.

Die Präsentation soll zeigen:

1. welche Geschäftsprozesse wir ausgewählt haben
2. warum diese Prozesse sinnvoll sind
3. welchen wirtschaftlichen oder organisatorischen Nutzen sie haben
4. welche Daten dafür benötigt werden
5. wie die Prozesse in BPMN modelliert wurden
6. welche Stored Procedures daraus entstehen
7. welcher Workload für die Umsetzung geplant ist
8. welche Aufgaben im Team verteilt werden
9. was sicher umgesetzt wird
10. was optional ist, falls der Umfang zu groß wird

---

## 6. Wichtigste Erkenntnis

Die UI ist nicht der Startpunkt des Projekts, sondern folgt aus den Geschäftsprozessen.

Wichtiger ist zuerst:

1. Geschäftsprozesse sauber verstehen
2. Prozesse fachlich beschreiben
3. BPMN-Modelle nach der Foliennotation erstellen
4. Datenbedarf und Datenquellen bestimmen
5. Stored Procedures aus den Prozessen ableiten
6. Projektplan mit Workload pro Task erstellen
7. Ergebnisse strukturiert Herrn Becking vorstellen