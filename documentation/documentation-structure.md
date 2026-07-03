# Dokumentationsstruktur

Stand: 03.07.2026

Die Gesprächsprotokolle sind die Referenz für Projektumfang und Prioritäten. Aktuell bleiben BP1 und BP2 Bestandteil des Projekts; für die Abschlusspräsentation hat BP1 Vorrang.

## Struktur

```text
documentation/
├── README.md
├── documentation-structure.md
├── businessprozesse-v2.md
├── datenbankabfragen-v4.md
├── lastenheft-und-pflichtenheft-v2.md
├── APs/
│   ├── Gruppenanmeldung.md
│   └── AP1 ... AP19
├── Gesprächsprotokoll/
│   ├── 01-Gesprächsprotokoll.md
│   ├── 02-Gesprächsprotokoll.md
│   ├── 03-Gesprächsprotokoll.md
│   └── 04-Gesprächsprotokoll.md
├── projektentscheidungen/
│   ├── README.md
│   ├── 01 - 2026-06-11-prisma-und-rest-api.md
│   ├── 02 - 2026-06-24-bp1-fokus-abschlusspräsentation.md
│   └── 03 - 2026-07-03-prisma-verworfen-bp1-fokus.md
├── docu-assets/
└── archive/
```

Die ausführbaren BPMN-Dateien liegen zentral im Repository-Ordner `bpmn/`. Der aktuelle BP1-Stand ist `BP1V2Update_Kritische_Ressourcen_v11_final.bpmn`; ältere Versionen bleiben für die Entwicklungshistorie erhalten.

## Aktuelle Hauptdokumente

| Datei | Zweck |
|---|---|
| `businessprozesse-v2.md` | Zwei-Prozess-Umfang und BP1-Priorität |
| `APs/AP10-Revision-Use-Cases.md` | Use Cases für BP1 und BP2 |
| `APs/AP11-BPMN-Modellierung-BP1-...md` | Fachliche Beschreibung des finalen BP1-BPMN |
| `APs/AP11-BPMN-Modellierung-BP2-...md` | Fachliche Vorbereitung für BP2 |
| `lastenheft-und-pflichtenheft-v2.md` | Aktuelle Spezifikation |
| `datenbankabfragen-v4.md` | Query-/Stored-Procedure-Zuordnung und Diagrammabfragen |
| `projektentscheidungen/02 - ...md` | BP1-Fokus der Abschlusspräsentation |
| `projektentscheidungen/03 - ...md` | Verzicht auf Prisma zugunsten des BP1-Fokus |

## Arbeitspakete

| AP | Inhalt |
|---:|---|
| 1–3 | Gruppe, Kommunikation und Sprecherrolle |
| 4–5 | Case Study und Revision auf zwei Businessprozesse |
| 6 | Verantwortlichkeiten |
| 7–9 | Datenbankentwurf, Infrastruktur und Implementierungsrevision |
| 10 | Use Cases |
| 11 | BPMN-Modellierung |
| 12 | Lastenheft und Pflichtenheft |
| 13 | Projektproposal |
| 14 | Methodenwahl |
| 15 | Zuständigkeiten |
| 16 | Architekturentwurf |
| 17 | Implementierungsvorbereitung |
| 18 | Dokumentationsmethode |
| 19 | Zwischenvortrag |

## Statusregeln

- `archive/` enthält historische, nicht mehr maßgebliche Fassungen.
- AP4 und AP13 dokumentieren bewusst frühere Projektphasen; spätere Revisionen und Gesprächsprotokolle haben Vorrang.
- Projektentscheidungen werden bei einer Ablösung als überholt markiert, nicht nachträglich gelöscht.
- Zugangsdaten, Tokens und private Serverkonfigurationen gehören nicht in die Dokumentation.
