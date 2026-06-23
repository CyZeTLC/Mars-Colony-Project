# Dokumentationsstruktur

Stand: 23.06.2026

Die Dokumentation befindet sich im Ordner `documentation/`.  
Der aktuelle Projektfokus liegt nach dem Feedback von Prof. Dr. Becking auf zwei Businessprozessen:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Ältere oder breiter angelegte Inhalte bleiben teilweise erhalten, stehen aber nicht mehr im Hauptfokus.

---

## Aktuelle Ordnerstruktur

```text
documentation/
├── README.md
├── documentation-structure.md
├── businessprozesse-v2.md
├── datenbankabfragen-v4.md
├── lastenheft-und-pflichtenheft-v2.md
├── APs/
│   ├── Gruppenanmeldung.md
│   ├── AP1-Gruppe-finden.md
│   ├── AP2-Kommunikation-sichern.md
│   ├── AP3-Sprecherin-waehlen.md
│   ├── AP4-Auswahl-Case-Study.md
│   ├── AP5-Revision-Case-Study-v2.md
│   ├── AP6-Verantwortungen-festlegen.md
│   ├── AP7-Revision-Datenbankentwurf.md
│   ├── AP8-Auswahl-DBMS-Infrastruktur-Prototyp.md
│   ├── AP9-Revision-Implementierung.md
│   ├── AP10-Revision-Use-Cases.md
│   ├── AP11-BPMN-Modellierung-BP1-Kritische RessourcenÜberwachenUndNachschubAuslösen.md
│   ├── AP11-BPMN-Modellierung-BP2-Ueberschuessige-Ressourcen-an-externe-Unternehmen-verkaufen.md
│   ├── AP12-Spezifikation.md
│   ├── AP13-Proposal-Vorbereitung.md
│   ├── AP13-Proposal-Ausgearbeitet.md
│   └── AP14-Methodenwahl.md
├── Gesprächsprotokoll/
│   ├── 01-Gesprächsprotokoll.md
│   └── 02-Gesprächsprotokoll.md
├── docu-assets/
│   └── 1-mars-logistik-verwaltung-als-kritische-ressourcen-ueberwachen.png
└── archive/
    ├── AP5-Revision-Case-Study.md
    ├── businessprozesse-v1.md
    ├── datenbankabfragen-v1.md
    ├── datenbankabfragen-v2.md
    ├── datenbankabfragen-v3.md
    ├── lastenheft-und-pflichtenheft-v1.md
    ├── Mars_Colony_Riskante_LagerbestaendeEduard.bpmn
    └── diagramEduard.svg
```

---

## Zentrale Dokumente

| Datei | Zweck |
|---|---|
| `businessprozesse-v2.md` | Aktuelle Businessprozess-Auswahl nach der Revision. |
| `APs/AP5-Revision-Case-Study-v2.md` | Überarbeitete Case Study mit reduziertem Fokus. |
| `APs/AP10-Revision-Use-Cases.md` | Use Cases passend zu den zwei ausgewählten Businessprozessen. |
| `APs/AP11-BPMN-Modellierung-BP1-Kritische RessourcenÜberwachenUndNachschubAuslösen.md` | BPMN-Dokumentation für Prozess 1. |
| `APs/AP11-BPMN-Modellierung-BP2-Ueberschuessige-Ressourcen-an-externe-Unternehmen-verkaufen.md` | BPMN-Dokumentation für Prozess 2. |
| `lastenheft-und-pflichtenheft-v2.md` | Aktuelle Spezifikation für den reduzierten Projektumfang. |
| `APs/AP12-Spezifikation.md` | Arbeitspaket-Zusammenfassung zur Spezifikation. |
| `APs/AP13-Proposal-Ausgearbeitet.md` | Ausgearbeitetes Projektproposal mit Projektplan, Aufwand und Kriterienbezug. |
| `datenbankabfragen-v4.md` | Aktuelle Übersicht der SQL-Abfragen mit BP1-, BP2-, Shared- und General-Zuordnung sowie passenden Stored Procedures. |

---

## Arbeitspakete

| AP | Datei | Inhalt |
|---:|---|---|
| AP1 | `AP1-Gruppe-finden.md` | Gruppenbildung |
| AP2 | `AP2-Kommunikation-sichern.md` | Kommunikationswege und Organisation |
| AP3 | `AP3-Sprecherin-waehlen.md` | Sprecherrolle |
| AP4 | `AP4-Auswahl-Case-Study.md` | ursprüngliche breite Case-Study-Auswahl |
| AP5 | `AP5-Revision-Case-Study-v2.md` | aktuelle Case-Study-Revision |
| AP6 | `AP6-Verantwortungen-festlegen.md` | Verantwortlichkeiten |
| AP7 | `AP7-Revision-Datenbankentwurf.md` | Datenbankentwurf und neue Verkaufstabellen |
| AP8 | `AP8-Auswahl-DBMS-Infrastruktur-Prototyp.md` | DBMS, Infrastruktur und Prototyp |
| AP9 | `AP9-Revision-Implementierung.md` | Implementierungsstand nach Revision |
| AP10 | `AP10-Revision-Use-Cases.md` | aktuelle Use Cases |
| AP11 | zwei BPMN-Dateien | BPMN-Modellierung der zwei Hauptprozesse |
| AP12 | `AP12-Spezifikation.md` | Lastenheft und Pflichtenheft |
| AP13 | `AP13-Proposal-Vorbereitung.md`, `AP13-Proposal-Ausgearbeitet.md` | Proposal-Vorbereitung und ausgearbeitete Fassung |
| AP14 | `AP14-Methodenwahl.md` | Methodenwahl |

---

## Kurze AP-Beschreibungen

| AP | Beschreibung |
|---:|---|
| AP1 | Die Arbeitsgruppe wurde gebildet und das Projektteam festgelegt. |
| AP2 | Kommunikationswege und Organisationstools wurden ausgewählt und eingerichtet. |
| AP3 | Die Sprecherrolle bzw. Ansprechperson für das Projekt wurde festgelegt. |
| AP4 | Eine geeignete Case Study für die Mars Logistik Verwaltung wurde ausgewählt. |
| AP5 | Die Case Study wurde nach Feedback auf zwei zentrale Businessprozesse reduziert. |
| AP6 | Verantwortlichkeiten und Aufgaben wurden im Team verteilt. |
| AP7 | Der Datenbankentwurf wurde geprüft und für den Ressourcenverkauf erweitert. |
| AP8 | DBMS, Infrastruktur und Prototyp-Grundlage wurden ausgewählt und dokumentiert. |
| AP9 | Die vorhandene Implementierung wurde auf den reduzierten Projektfokus geprüft. |
| AP10 | Die Use Cases wurden überarbeitet und den zwei Businessprozessen zugeordnet. |
| AP11 | Die zwei ausgewählten Businessprozesse wurden beschrieben und als BPMN vorbereitet. |
| AP12 | Lastenheft und Pflichtenheft wurden für den reduzierten Projektumfang formuliert. |
| AP13 | Das Projektproposal wurde vortragsfähig vorbereitet und ausgearbeitet. |
| AP14 | Die Entwicklungsmethode wurde ausgewählt und für das Projekt begründet. |

---

## Archiv

Der Ordner `archive/` enthält ältere oder nicht mehr zentrale Dateien. Diese Dateien bleiben zur Nachvollziehbarkeit erhalten, gehören aber nicht zum aktuellen Hauptstand der Dokumentation.

| Datei | Bedeutung |
|---|---|
| `AP5-Revision-Case-Study.md` | ältere Case-Study-Revision |
| `businessprozesse-v1.md` | ältere Businessprozess-Sammlung vor der Reduktion |
| `datenbankabfragen-v1.md` | ältere vollständige SQL-Übersicht vor der Zwei-Prozess-Revision |
| `datenbankabfragen-v2.md` | ältere fokussierte SQL-Dokumentation für die zwei ausgewählten Businessprozesse |
| `datenbankabfragen-v3.md` | ältere SQL-Dokumentation mit Erklärung der Ordnerstruktur |
| `lastenheft-und-pflichtenheft-v1.md` | ältere Spezifikationsfassung vor Version 2 |
| `Mars_Colony_Riskante_LagerbestaendeEduard.bpmn` | älteres BPMN-Modell |
| `diagramEduard.svg` | ältere Diagrammdatei |

---

## Hinweis

Die Dokumentation soll nicht alle denkbaren Bereiche der Marskolonie gleich stark behandeln. Für Proposal, BPMN, Use Cases, Spezifikation und Datenbankrevision ist der aktuelle Hauptstand der Zwei-Prozess-Fokus:

- kritische Ressourcen erkennen und Nachschubbedarf vorbereiten,
- überschüssige Ressourcen erkennen, bewerten und eine externe Abgabe vorbereiten.
