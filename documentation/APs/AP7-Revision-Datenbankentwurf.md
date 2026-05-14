# AP7 – Revision Datenbankentwurf – Vorlage

Status: Vorlage / Zwischenstand  
Finale Ausarbeitung erfolgt nach dem zweiten Feedback von Prof. Dr. Becking.

## 1. Ziel des Arbeitspakets

Diese Datei dient als Vorlage für die Revision des Datenbankentwurfs. Nach dem Feedback von Prof. Dr. Becking soll besonders geprüft werden, ob der Datenbankentwurf die zwei ausgewählten Hauptprozesse ausreichend unterstützt.

Ziel ist es, nach dem Feedback nachvollziehbar zu dokumentieren, welche Punkte am Datenbankentwurf geprüft, angepasst oder bewusst unverändert gelassen wurden.

## 2. Phase der Bearbeitung

| Feld | Eintrag |
|---|---|
| Aktuelle Phase | ______________________________ |
| Datum des Feedbacks | ______________________________ |
| Feedback erhalten von | Prof. Dr. Becking |
| Zuständige Person im Team | ______________________________ |
| Stand der Revision | [ ] offen [ ] in Bearbeitung [ ] abgeschlossen |

## 3. Ausgangspunkt vor der Revision

| Bereich | Vorläufiger Stand | Anmerkung / später ausfüllen |
|---|---|---|
| Datenbankmodell | PowerDesigner-Dateien und SQL-Build-Skripte sind im Repository vorhanden. | ______________________________ |
| Tabellenstruktur | Tabellen für Ressourcen, Lager, Städte, Bewohner, Mitarbeitende, Fahrzeuge, Transport und Energie sind erkennbar. Für die aktuelle Revision sind vor allem Ressourcen- und Lagerdaten relevant. | ______________________________ |
| Beziehungen | Primär- und Fremdschlüssel sind in den Build-Skripten erkennbar. | ______________________________ |
| Testdaten | Aufbau- und Insert-Strukturen sind vorhanden. | ______________________________ |
| Businessprozess-Bezug | Datenmodell soll die ausgewählten Businessprozesse unterstützen. | ______________________________ |

## 4. Feedbackpunkte

| Nr. | Feedbackpunkt | Betroffener Bereich | Entscheidung | Notiz |
|---:|---|---|---|---|
| 1 | ______________________________ | ______________________________ | [ ] übernehmen [ ] prüfen [ ] nicht übernehmen | ______________________________ |
| 2 | ______________________________ | ______________________________ | [ ] übernehmen [ ] prüfen [ ] nicht übernehmen | ______________________________ |
| 3 | ______________________________ | ______________________________ | [ ] übernehmen [ ] prüfen [ ] nicht übernehmen | ______________________________ |
| 4 | ______________________________ | ______________________________ | [ ] übernehmen [ ] prüfen [ ] nicht übernehmen | ______________________________ |

## 5. Geplante Anpassungen am Datenbankentwurf

| Bereich | Geplante Änderung | Begründung | Status |
|---|---|---|---|
| Tabellen | ______________________________ | ______________________________ | [ ] offen [ ] erledigt |
| Beziehungen | ______________________________ | ______________________________ | [ ] offen [ ] erledigt |
| Ressourcen / Lager | Prüfen, ob Bestände, Mindestwerte und Lagerbezug für kritische Ressourcen ausreichend abbildbar sind. | Grundlage für Prozess 1 und Prozess 6. | [ ] offen [ ] erledigt |
| Nachschubbedarf | Prüfen, ob Nachschubbedarf aus Bestand, Mindestbestand und Lagerdaten fachlich ableitbar ist. | Keine vollständige automatische Bestellung notwendig. | [ ] offen [ ] erledigt |
| Überschüssige Ressourcen | Prüfen, ob Ressourcenüberschüsse aus vorhandenen Daten ableitbar sind. | Grundlage für Verkaufspotenzial. | [ ] offen [ ] erledigt |
| Verkaufsprozess | Prüfen, ob für die aktuelle Revision eine fachliche Vorbereitung reicht oder ob spätere Verkaufstabellen nötig werden. | Vollständiges Verkaufsmodul ist spätere Erweiterung. | [ ] offen [ ] erledigt |
| Städte / Standorte | Vorerst keine Hauptanpassung geplant. | Bleibt Datenbasis, aber nicht Hauptprozess. | [ ] offen [ ] erledigt |
| Fahrzeuge / Transport | Vorerst keine Hauptanpassung geplant. | Nach Feedback nicht Teil der zwei Hauptprozesse. | [ ] offen [ ] erledigt |
| Energieversorgung / Personal | Vorerst keine Hauptanpassung geplant. | Mögliche spätere Erweiterung. | [ ] offen [ ] erledigt |

## 6. Offene Prüfpunkte

- [ ] Finales DBMS bestätigen: ______________________________
- [ ] Verbindliches Datenbankmodell festlegen: ______________________________
- [ ] Prüfen, ob ERD, CDM, PDM und SQL-Skripte zusammenpassen: ______________________________
- [ ] Prüfen, ob die Tabellen die zwei ausgewählten Businessprozesse ausreichend unterstützen: ______________________________
- [ ] Prüfen, ob zusätzliche Tabellen oder Beziehungen notwendig sind: ______________________________
- [ ] Prüfen, ob Testdaten für die spätere Demonstration ausreichen: ______________________________

## 7. Ergebnis nach der Revision

Dieser Abschnitt wird erst nach dem Feedback ausgefüllt.

| Ergebnisfrage | Antwort |
|---|---|
| Wurde der Datenbankentwurf angepasst? | ______________________________ |
| Welche wichtigsten Änderungen wurden vorgenommen? | ______________________________ |
| Welche Punkte bleiben offen? | ______________________________ |
| Ist der Datenbankentwurf für die weitere Umsetzung geeignet? | ______________________________ |

## 8. Kurzfazit

Kurzfazit nach Feedback:

____________________________________________________________

____________________________________________________________
