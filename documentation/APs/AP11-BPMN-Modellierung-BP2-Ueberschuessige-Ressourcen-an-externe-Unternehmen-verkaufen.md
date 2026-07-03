# AP11: BPMN-Modellierung

## Prozess 2: Überschüssige Ressourcen an externe Unternehmen verkaufen

Status: fachlich beschrieben; kein finales BPMN-Modell im Repository

## Ziel

Dieses Arbeitspaket beschreibt den Businessprozess „Überschüssige Ressourcen an externe Unternehmen verkaufen“ und bereitet ihn für die BPMN-Modellierung vor.

Der Prozess gehört zu den zwei Hauptprozessen der Mars Logistik Verwaltung [ALS], weil überschüssige oder lokal produzierte Ressourcen nicht unkontrolliert gelagert werden sollen. Stattdessen sollen sie wirtschaftlich bewertet und bei Eignung für eine externe Abgabe vorbereitet werden.

BP2 bleibt Bestandteil des Projekts. Nach dem Gespräch vom 24.06.2026 wird für die Abschlusspräsentation jedoch BP1 priorisiert; ein finales BP2-BPMN-Modell ist deshalb kein Bestandteil des aktuellen Repository-Stands.

---

## Prozessbeschreibung

Der Prozess startet, wenn aktuelle Ressourcen- und Lagerdaten vorliegen.

Das System zeigt die vorhandenen Ressourcenbestände mit Menge, Einheit, Mindestbestand und Lagerbezug an.

Danach wird geprüft, ob Ressourcen oberhalb des benötigten Mindestbestands liegen. Wenn keine Überschüsse erkennbar sind, bleibt der Bestand im normalen Lagerbetrieb.

Wenn ein möglicher Überschuss erkannt wird, bewertet die Kolonieleitung, ob die Ressource für die Marskolonie weiterhin benötigt wird oder ob eine externe Abgabe grundsätzlich möglich ist.

Ist die Ressource nicht für eine Abgabe geeignet, bleibt sie im Bestand oder wird für interne Zwecke reserviert.

Ist die Ressource geeignet, wird das Verkaufspotenzial fachlich bewertet. Dazu gehören Ressourcentyp, Menge, Lagerort, Sicherheitsreserve und möglicher wirtschaftlicher Nutzen.

Anschließend wird eine externe Abgabe vorbereitet. Ein vollständiges Verkaufsmodul mit Rechnung, Zahlung und Vertrag ist nicht Teil des aktuellen Kernumfangs, kann aber später ergänzt werden.

Der Prozess endet, sobald entschieden ist, ob die Ressource im Bestand bleibt oder für eine externe Abgabe vorbereitet wird.

---

## Beteiligte Bereiche

| Bereich | Aufgabe |
|---|---|
| System / Datenbank | Ressourcenbestände, Mindestwerte und Lagerdaten bereitstellen |
| Kolonieleitung | Überschüsse fachlich bewerten und Entscheidung treffen |
| Lagerverwaltung | Verfügbarkeit und Sicherheitsreserve prüfen |
| Externe Partner / Unternehmen | Mögliche Abnehmer für überschüssige Ressourcen |

---

## Zentrale Entscheidungen

| Entscheidung | Ergebnis |
|---|---|
| Überschuss vorhanden? | Ja: Bewertung wird gestartet. Nein: normaler Lagerbetrieb |
| Ressource weiterhin intern nötig? | Ja: Ressource bleibt reserviert. Nein: Verkaufspotenzial wird geprüft |
| Externe Abgabe sinnvoll? | Ja: Abgabe wird vorbereitet. Nein: Ressource bleibt im Bestand |

---

## Bezug zur Datenbank

Der Prozess kann durch vorhandene SQL-Abfragen und Stored Procedures unterstützt werden.

Relevante Datenbankaufgaben:

| Aufgabe | Zweck |
|---|---|
| Ressourcenbestand prüfen | aktuelle Mengen auslesen |
| Mindestbestand vergleichen | mögliche Überschüsse erkennen |
| Lagerbezug prüfen | Lagerort und verfügbare Menge nachvollziehen |
| Sicherheitsreserve berücksichtigen | interne Versorgung nicht gefährden |
| Verkaufspotenzial vorbereiten | wirtschaftliche Entscheidung fachlich unterstützen |

Konkret umgesetzte Stored Procedures für BP2:

| Stored Procedure | Prozessschritt | Ergebnis |
|---|---|---|
| `sql/storedProcedure/bp2/getRessourcenUeberschuss.sql` | Überschuss erkennen und Sicherheitsreserve prüfen | zeigt verkaufbare Mengen mit 7-Sol-Sicherheitspuffer und Überschuss-Status |
| `sql/storedProcedure/bp2/getVerkaufspotenzial.sql` | Verkaufspotenzial bewerten | verbindet berechnete Überschüsse mit vorhandenen Überschussbewertungen und empfohlener Maßnahme |
| `sql/storedProcedure/bp2/getExterneAbgabeVorbereitung.sql` | externe Abgabe vorbereiten | zeigt vorbereitete Verkäufe mit Unternehmen, Positionen, Werten und Abgabe-Status |

---

## Bezug zur Webanwendung

Die Webanwendung kann den Prozess über eine Ressourcen- oder Lagerübersicht sichtbar machen.

Mögliche Anzeigen:

| Anzeige | Nutzen |
|---|---|
| aktuelle Ressourcenbestände | Überblick über verfügbare Mengen |
| Mindestbestände | Grundlage für Überschussbewertung |
| Lagerinformationen | Prüfung, wo Ressourcen verfügbar sind |
| mögliche Überschüsse | Entscheidungsgrundlage für externe Abgabe |
| fachliche Begründung der Abgabe | Nachvollziehbarkeit für Dokumentation und Präsentation |

---

## Ergebnis

Die fachliche Modellierung zeigt, wie überschüssige Ressourcen erkannt, bewertet und für eine mögliche externe Abgabe vorbereitet werden.

Der Prozess ist fachlich sinnvoll, weil er den wirtschaftlichen Nutzen der Marskolonie sichtbar macht. Gleichzeitig bleibt der Umfang realistisch, weil kein vollständiges Verkaufs- und Zahlungssystem umgesetzt werden muss.

---

## Offene Punkte

| Punkt | Status |
|---|---|
| Finales BPMN-Modell erstellen | offen / nach BP1 priorisiert |
| BPMN-Grafik in Projektdokumentation einfügen | offen / nach BP1 priorisiert |
| SQL-Abfragen konkret zuordnen | erledigt |
| Prüfen, ob spätere Verkaufstabellen benötigt werden | erledigt |
| Feedback von Prof. Dr. Becking einarbeiten | erledigt |

---

## Dauer

Dauer: 1,5 Tage

Hinweis: AP11 dokumentiert beide Prozesse getrennt. Der geschätzte Gesamtaufwand für die fachliche Ausarbeitung von Prozess 1 und Prozess 2 beträgt 3 Tage.
