# AP11 – BPMN-Modellierung BP1

## Kritische Ressourcen überwachen und Nachschub auslösen

Status: finales Modell v11

## Ziel

BP1 ist einer der zwei Hauptprozesse und gemäß dem Gesprächsprotokoll vom 24.06.2026 das durchgehende Beispiel der Abschlusspräsentation:

```text
Use Case → Businessprozess → BPMN-Modell → Stored Procedures → Applikationsbezug
```

Das aktuelle ausführbare Modell liegt unter:

[`../../bpmn/BP1V2Update_Kritische_Ressourcen_v11_final.bpmn`](../../bpmn/BP1V2Update_Kritische_Ressourcen_v11_final.bpmn)

Die zugehörige finale Exportgrafik liegt unter:

![BPMN BP1 kritische Ressourcen v11 final](../docu-assets/bpmnBP1V2Update_Kritische_Ressourcen_v11_final.png)

Die älteren Dateien `v01` bis `v10` dokumentieren die Entwicklung des Modells.

## Beteiligte

| Pool / Lane | Aufgabe |
|---|---|
| System / Sensorik | Bestands- und Sensordaten aktualisieren, Ressourcenstatus überwachen und Warnung versenden |
| Leitstand / Kolonieleitung | Warnung bewerten, Kritikalität einstufen, Nachschubbedarf berechnen und Notfallentscheidung treffen |
| Lager / Produktion | Interne Produktion durchführen und einlagern |
| Logistik / Transport | Externen Nachschub anfordern, Transport koordinieren und Lieferung einlagern |
| Externer Support | Rückmeldung zur externen Verfügbarkeit |

## Ablauf des finalen Modells

1. Neue Bestands- und Sensordaten gehen ein und werden aktualisiert.
2. Das System überwacht den Ressourcenstatus und vergleicht Ist- und Mindestbestand.
3. Ohne Unterschreitung wird der Ist-Bestand aktualisiert; der Normalbetrieb bleibt gesichert.
4. Bei Unterschreitung meldet das System die kritische Ressource und versendet eine Warnung.
5. Die Kolonieleitung stuft parallel die Kritikalität ein und berechnet den Nachschubbedarf. Anschließend wird ein Bedarfsbericht erstellt.
6. Bei einer internen Lösung wird produziert und eingelagert.
7. Andernfalls wird externer Nachschub angefordert und die Rückmeldung abgewartet.
8. Ist eine externe Reserve oder Produktion verfügbar, werden Transport, Empfang und Einlagerung durchgeführt.
9. Ist sie nicht verfügbar, wird der Notfallmodus mit Eskalation eingeleitet.
10. Nach erfolgreicher interner oder externer Versorgung wird der Bestand aktualisiert und der Normalbetrieb gesichert.

## Datenobjekte und Entscheidungen

| Element | Bedeutung |
|---|---|
| Sensordaten / Bestandsdaten | Ausgangsdaten der Überwachung |
| Mindestbestand | Vergleichswert für die Kritikalität |
| Bedarfsbericht | Ergebnis aus Einstufung und Bedarfsberechnung |
| Nachschubauftrag | Übergabe an den externen Ablauf |
| Produktionsplan | Grundlage der internen Lösung |
| Ist-Bestand unter Mindestbestand? | entscheidet zwischen Normalbetrieb und Warnpfad |
| Interne Lösung verfügbar? | entscheidet zwischen Produktion und externem Nachschub |
| Externe Reserve / Produktion verfügbar? | entscheidet zwischen Transport und Eskalation |

## Bezug zu Stored Procedures

| Stored Procedure | BPMN-Bezug |
|---|---|
| `getRessourcesBelowMin()` | Ist- und Mindestbestand vergleichen |
| `getRessourcesAtRisk()` | Ablauf- und Bestandsrisiken ergänzen |
| `getNachschubanforderungen()` | Bedarf, interne Verfügbarkeit und empfohlene Maßnahme ableiten |
| `getRessourcenWithLager()` | Ressourcen einem Lager zuordnen |

Die Dateien liegen unter `sql/storedProcedure/bp1/` und `sql/storedProcedure/shared/`. Entsprechend dem dritten Gesprächsprotokoll bilden sie die zentrale Datenbanklogik. Im aktuellen API-Stand ruft `get_sql_result` diese Procedures generisch per `CALL` auf, sofern die jeweilige Procedure in der MariaDB importiert ist.

## Applikationsbezug

Das Dashboard zeigt bereits:

- Ressourcenverbrauch für Wasser, Sauerstoff und Nahrung,
- Bestand relativ zum Mindestbestand,
- allgemeine Koloniekennzahlen.

Die Ressourcenseite enthält Ansichten für kritische Ressourcen, Lager und Bestände. Zusätzlich zeigt die Nachbestellungsseite die aus `getNachschubanforderungen()` abgeleiteten Anforderungen als Karten mit Priorität, empfohlener Maßnahme, Suche, Filterung und Detaildialog.

Ein vollständig persistenter Ablauf für Nachschubauftrag, externe Rückmeldung und Eskalation ist nicht implementiert; diese Schritte werden im BPMN fachlich modelliert. Die Aktionsbuttons der Nachbestellungsseite erzeugen im aktuellen Frontend nur einen Demo-/Debug-Status.

## Ergebnis

Das finale BPMN-v11-Modell bildet Normalbetrieb, interne Versorgung, externen Nachschub und Notfalleskalation ab. Damit ist BP1 fachlich detailliert und als roter Faden für die Abschlusspräsentation vorbereitet.

## Dauer

Dauer: 1,5 Tage
