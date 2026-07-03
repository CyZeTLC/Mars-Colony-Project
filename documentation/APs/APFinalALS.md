# APFinalALS – Gesamtübersicht der Arbeitspakete

Status: abgeschlossen
Stand: 03.07.2026
Projekt: Mars Logistik Verwaltung [ALS]

Dieses Dokument bündelt den vollständigen Projektkontext und die Ergebnisse der Arbeitspakete AP1 bis AP23. Es ist so aufgebaut, dass es einzeln heruntergeladen und ohne die übrige Repository-Struktur gelesen werden kann.

Die Links zu Einzeldateien sind optionale Vertiefungen, falls das Dokument innerhalb des GitHub-Repositorys geöffnet wird. Alle für das Verständnis des Projekts notwendigen Kernaussagen stehen direkt in dieser Datei.

## Inhaltsverzeichnis

- [Projektüberblick](#projektueberblick)
- [Team und Zusammenarbeit](#team)
- [Fachlicher Umfang](#fachlicher-umfang)
- [Technische Umsetzung](#technische-umsetzung)
- [Test- und Abschlussstand](#abschlussstand)
- [AP1 – Gruppe finden](#ap1)
- [AP2 – Kommunikation sichern](#ap2)
- [AP3 – Sprecher:in wählen](#ap3)
- [AP4 – Case Study auswählen](#ap4)
- [AP5 – Case Study revidieren](#ap5)
- [AP6 – Verantwortungen festlegen](#ap6)
- [AP7 – Datenbankentwurf revidieren](#ap7)
- [AP8 – DBMS, Infrastruktur und Prototyp auswählen](#ap8)
- [AP9 – Implementierung revidieren](#ap9)
- [AP10 – Use Cases revidieren](#ap10)
- [AP11 – BPMN modellieren](#ap11)
- [AP12 – Spezifikation erstellen](#ap12)
- [AP13 – Proposal vorbereiten](#ap13)
- [AP14 – Methode auswählen](#ap14)
- [AP15 – Zuständigkeiten festlegen](#ap15)
- [AP16 – Architektur entwerfen](#ap16)
- [AP17 – Implementierung vorbereiten](#ap17)
- [AP18 – Software-Dokumentation gewährleisten](#ap18)
- [AP19 – Zwischenvortrag vorbereiten](#ap19)
- [AP20 – Applikation fertigstellen](#ap20)
- [AP21 – Software testen](#ap21)
- [AP22 – Vorstellung vorbereiten](#ap22)
- [AP23 – Projektbericht erstellen](#ap23)
- [Optionale Repository-Quellen](#zentrale-projektdokumente)

---

<a id="projektueberblick"></a>
## Projektüberblick

| Merkmal | Inhalt |
|---|---|
| Projekt | Mars Logistik Verwaltung [ALS] |
| Semester | Sommersemester 2026 |
| Praktikumsgruppe | 1 |
| Betreuung | Prof. Dr. Dominic Becking |
| Ziel | Datenbankgestützte Verwaltung und Überwachung einer simulierten Marskolonie |
| Schwerpunkt der Abschlusspräsentation | BP1 – Kritische Ressourcen überwachen und Nachschub auslösen |
| Status | Projektumfang, Anwendung, Tests, Präsentation und Dokumentation abgeschlossen |

Die Anwendung verbindet eine Weboberfläche mit einer PHP-REST-API und einer MariaDB-/MySQL-Datenbank. Ressourcen-, Lager-, Stadt-, Bewohner-, Mitarbeiter- und Fahrzeugdaten können ausgewertet und in Dashboard- oder Tabellenansichten dargestellt werden.

Die Gesprächsprotokolle mit Prof. Dr. Becking bildeten die Referenz für die schrittweise Eingrenzung des Projekts. Aus einem zunächst breiten Verwaltungsansatz wurden zwei zentrale Businessprozesse ausgewählt. Für die Abschlusspräsentation wurde BP1 als durchgehendes Beispiel priorisiert.

[Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="team"></a>
## Team und Zusammenarbeit

Zur angemeldeten Projektgruppe gehören:

- Baisangur Aslambekov
- Tom Coombs
- Leonardo Parrino
- Nikita Töws
- Sergiu Curmei
- Eduard Flaming

Tom Coombs übernahm die zentrale technische Verantwortung und war Ansprechperson der Gruppe. Leonardo Parrino / Ph4ntomic arbeitete schwerpunktmäßig an Dokumentation, Meeting Minutes, Businessprozessen, SQL-/Stored-Procedure-Einordnung, BPMN 1, Präsentationen und organisatorischer Abstimmung.

Die Zusammenarbeit wurde leichtgewichtig und Kanban-orientiert organisiert:

| Werkzeug | Verwendung |
|---|---|
| GitHub | Versionierung, Branches, Pull Requests und Dokumentation |
| ClickUp | Aufgabenverwaltung und Statusübersicht |
| Discord | fachliche Kommunikation und Besprechungen |
| WhatsApp | kurze organisatorische Absprachen |
| Canva | gemeinsame und parallele Bearbeitung der Präsentationen |
| Praktikum | Feedback, Kontrolle und Abstimmung mit der Betreuung |

Leonardo legte die Präsentationen mit Canva Pro an und lud das Team ein. Die Vortragsteile wurden verteilt; die jeweiligen Personen leiteten ihre Folientexte aus der GitHub-Dokumentation ab und präsentierten ihren Abschnitt.

[Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="fachlicher-umfang"></a>
## Fachlicher Umfang

### Businessprozess 1

**Kritische Ressourcen überwachen und Nachschub auslösen**

BP1 dient der Versorgungssicherheit. Bestände werden mit Mindestwerten verglichen, Risiken bewertet und Nachschubmaßnahmen vorbereitet.

Der Ablauf des finalen BPMN-v11-Modells:

1. Bestands- und Sensordaten gehen ein und werden aktualisiert.
2. Das System vergleicht Ist- und Mindestbestand.
3. Ohne Unterschreitung bleibt der Normalbetrieb gesichert.
4. Bei einer Unterschreitung wird eine Warnung ausgelöst.
5. Kritikalität und Nachschubbedarf werden bestimmt.
6. Eine interne Lösung wird produziert und eingelagert.
7. Ist keine interne Lösung möglich, wird externer Nachschub angefordert.
8. Bei externer Verfügbarkeit folgen Transport, Empfang und Einlagerung.
9. Ohne externe Verfügbarkeit wird der Notfallmodus eingeleitet.
10. Nach erfolgreicher Versorgung wird der Bestand aktualisiert.

### Businessprozess 2

**Überschüssige Ressourcen an externe Unternehmen verkaufen**

BP2 bewertet, welche Ressourcen nach Mindestreserve und Sicherheitspuffer extern abgegeben werden können. Verkaufstabellen, Überschussbewertungen und vorbereitete Verkaufspositionen bilden den Prozess datenbankseitig ab. Ein vollständiges Zahlungs- oder Vertragsmodul gehört nicht zum finalen Umfang.

### Präsentationsleitlinie

```text
Use Case → Businessprozess → BPMN-Modell → Stored Procedures → Applikationsbezug
```

BP1 wird vollständig entlang dieser Kette vorgestellt. BP2 bleibt Bestandteil des Projekts, wird in der Abschlusspräsentation jedoch nur eingeordnet.

[Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="technische-umsetzung"></a>
## Technische Umsetzung

### Technologie

| Ebene | Umsetzung |
|---|---|
| Frontend | React 19, TypeScript 6 und Vite 8 |
| Oberfläche | Tailwind CSS 3, Material UI und Recharts |
| Backend | PHP-REST-API mit PDO |
| Datenbank | MariaDB/MySQL |
| Datenaustausch | JSON |
| Sicherheit | Login, PHP-Session und CSRF-Token |
| Modellierung | PowerDesigner und BPMN |

### Architektur

```text
React-/TypeScript-Webanwendung
            |
            | HTTPS / JSON / X-CSRF-Token
            v
       PHP-REST-API
            |
            | PDO + runSqlFile()
            v
        SQL-Dateien
            |
            v
    MariaDB-/MySQL-Datenbank
```

Das Frontend greift nicht direkt auf die Datenbank zu. Die PHP-API prüft Anfragen und CSRF-Token, führt freigegebene SQL-Dateien aus und liefert JSON-Antworten.

### Datenbanklogik

Im Repository bestehen 38 fachliche Query-Dateien und 38 passende Stored Procedures in den Bereichen:

- `bp1` für kritische Ressourcen und Nachschub,
- `bp2` für Überschüsse und externe Abgaben,
- `shared` für gemeinsame Ressourcen- und Lagerlogik,
- `general` für die übrigen Verwaltungsansichten.

Für BP1 sind insbesondere relevant:

| Funktion | Zweck |
|---|---|
| `getRessourcesBelowMin()` | Ressourcen unter Mindestbestand erkennen |
| `getRessourcesAtRisk()` | Ablauf- und Bestandsrisiken bewerten |
| `getNachschubanforderungen()` | Bedarf und empfohlene Maßnahme ableiten |
| `getRessourcenWithLager()` | Ressourcen mit Lagerbezug anzeigen |
| `getResourceConsumptionHistory.sql` | Ressourcenverbrauch im Zeitverlauf darstellen |
| `getResourceStockLevels.sql` | Bestand relativ zum Mindestbestand darstellen |

Für BP2 sind insbesondere relevant:

| Funktion | Zweck |
|---|---|
| `getRessourcenUeberschuss()` | verkaufbare Überschüsse berechnen |
| `getVerkaufspotenzial()` | Überschüsse fachlich bewerten |
| `getExterneAbgabeVorbereitung()` | vorbereitete externe Abgaben anzeigen |

### Bekannte technische Abgrenzung

Die Stored Procedures wurden vollständig vorbereitet und fachlich zugeordnet. Im finalen Stand führt die PHP-API weiterhin SQL-Dateien über PDO aus. Die nicht umgesetzte produktive Procedure-Anbindung ist transparent als Abgrenzung des vereinbarten Projektumfangs dokumentiert.

[Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="abschlussstand"></a>
## Test- und Abschlussstand

Die Software wurde technisch geprüft und am **29.06.2026** vorgestellt. Diese Vorstellung diente zugleich als praktischer Funktionstest und als Ausgangspunkt für die Abschlusspräsentation.

| Prüfung | Ergebnis |
|---|---|
| TypeScript-Typprüfung | erfolgreich |
| Produktionsbuild | erfolgreich |
| Webanwendung und Dashboard | erfolgreich vorgestellt |
| Ressourcendiagramme | erfolgreich vorgestellt |
| Query-/Stored-Procedure-Struktur | geprüft und dokumentiert |
| BP1-Zusammenhang | nachvollziehbar dargestellt |
| Dokumentationslinks | geprüft |
| ESLint | sieben bekannte Abweichungen; keine Blockade für Build oder Präsentation |

Nach der Vorstellung wurden Dokumentation und Folientexte bereinigt, die Abschlusspräsentation in Canva erstellt und die Vortragsteile im Team verteilt.

Die vollständige Markdown-Dokumentation liegt im Repository. Canva-Präsentationen, finale PDF und ILIAS-Abgabe werden extern verwaltet und enthalten deshalb keine öffentlichen Zugangsdaten oder Freigabelinks in dieser Datei.

[Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

<a id="ap1"></a>
## AP1 – Gruppe finden

Die Projektgruppe wurde gebildet und die Zusammenarbeit für das Semesterprojekt aufgenommen.

[Detaildokument AP1](AP1-Gruppe-finden.md) · [Gruppenanmeldung](Gruppenanmeldung.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap2"></a>
## AP2 – Kommunikation sichern

WhatsApp, Discord, GitHub und ClickUp wurden als Kommunikations- und Organisationswerkzeuge festgelegt.

[Detaildokument AP2](AP2-Kommunikation-sichern.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap3"></a>
## AP3 – Sprecher:in wählen

Die Sprecherrolle wurde als rotierende Aufgabe organisiert, damit verschiedene Teammitglieder Projektergebnisse vorstellen können.

[Detaildokument AP3](AP3-Sprecherin-waehlen.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap4"></a>
## AP4 – Case Study auswählen

Als Case Study wurde die datenbankgestützte Verwaltung einer Marskolonie ausgewählt. AP4 dokumentiert den ursprünglichen breiten Projektansatz.

[Detaildokument AP4](AP4-Auswahl-Case-Study.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap5"></a>
## AP5 – Case Study revidieren

Die Case Study wurde nach dem Feedback auf zwei zentrale Businessprozesse reduziert: kritische Ressourcen und Ressourcenüberschüsse.

[Detaildokument AP5](AP5-Revision-Case-Study-v2.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap6"></a>
## AP6 – Verantwortungen festlegen

Die grundlegenden Verantwortlichkeiten für Organisation, Dokumentation und technische Umsetzung wurden verteilt.

[Detaildokument AP6](AP6-Verantwortungen-festlegen.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap7"></a>
## AP7 – Datenbankentwurf revidieren

Der Datenbankentwurf wurde für BP1 und BP2 geprüft und um Bestandsbewegungen, Verkaufsstrukturen und Beispieldaten ergänzt.

[Detaildokument AP7](AP7-Revision-Datenbankentwurf.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap8"></a>
## AP8 – DBMS, Infrastruktur und Prototyp auswählen

MariaDB/MySQL, PHP-REST-API und React/TypeScript wurden als technische Projektlinie festgelegt und der Prototyp eingeordnet.

[Detaildokument AP8](AP8-Auswahl-DBMS-Infrastruktur-Prototyp.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap9"></a>
## AP9 – Implementierung revidieren

Die vorhandene Implementierung wurde auf den Zwei-Prozess-Fokus ausgerichtet und um BP1-Diagramme sowie BP2-Datenbankstrukturen ergänzt.

[Detaildokument AP9](AP9-Revision-Implementierung.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap10"></a>
## AP10 – Use Cases revidieren

Die Use Cases wurden auf BP1 und BP2 reduziert. Für die Abschlusspräsentation stehen die BP1-Use-Cases im Mittelpunkt.

[Detaildokument AP10](AP10-Revision-Use-Cases.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap11"></a>
## AP11 – BPMN modellieren

BP1 wurde als finales BPMN-v11-Modell ausgearbeitet. BP2 bleibt als fachlich beschriebener zweiter Prozess dokumentiert.

[BP1-Dokumentation](AP11-BPMN-Modellierung-BP1-Kritische%20RessourcenÜberwachenUndNachschubAuslösen.md) · [BP2-Dokumentation](AP11-BPMN-Modellierung-BP2-Ueberschuessige-Ressourcen-an-externe-Unternehmen-verkaufen.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap12"></a>
## AP12 – Spezifikation erstellen

Lastenheft, Pflichtenheft, Anforderungen, Abgrenzungen und Abnahmekriterien wurden für den finalen Projektumfang dokumentiert.

[Detaildokument AP12](AP12-Spezifikation.md) · [Ausführliche Spezifikation](../lastenheft-und-pflichtenheft-v2.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap13"></a>
## AP13 – Proposal vorbereiten

Das Projektproposal wurde vorbereitet und als vortragsfähige Fassung ausgearbeitet.

[Proposal-Vorbereitung](AP13-Proposal-Vorbereitung.md) · [Ausgearbeitetes Proposal](AP13-Proposal-Ausgearbeitet.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap14"></a>
## AP14 – Methode auswählen

Ein leichtgewichtiges Kanban-Vorgehen wurde gewählt. Präsentationen werden gemeinsam und parallel in Canva bearbeitet.

[Detaildokument AP14](AP14-Methodenwahl.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap15"></a>
## AP15 – Zuständigkeiten festlegen

Dokumentations-, Organisations- und Technikaufgaben wurden nachvollziehbar den Verantwortlichen zugeordnet.

[Detaildokument AP15](AP15-Zustaendigkeiten-festlegen.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap16"></a>
## AP16 – Architektur entwerfen

Ist- und Soll-Architektur wurden dokumentiert. Die fehlende produktive Stored-Procedure-Anbindung ist als technische Abgrenzung festgehalten.

[Detaildokument AP16](AP16-Architektur-Entwurf.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap17"></a>
## AP17 – Implementierung vorbereiten

Frontend, Backend, Datenbank, SQL-Struktur und Arbeitsumgebung wurden für die Umsetzung vorbereitet.

[Detaildokument AP17](AP17-Implementierung-vorbereitet.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap18"></a>
## AP18 – Software-Dokumentation gewährleisten

Die Dokumentation wurde als versionierte Markdown-Struktur mit Archiv, Assets, Gesprächsprotokollen und Projektentscheidungen umgesetzt.

[Detaildokument AP18](AP18-SW-Doku-gewährleistet.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap19"></a>
## AP19 – Zwischenvortrag vorbereiten

Der Zwischenvortrag wurde über eine gemeinsam bearbeitete Canva-Präsentation vorbereitet und für ILIAS bereitgestellt.

[Detaildokument AP19](AP19-Zwischenvortrag-vorbereiten.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap20"></a>
## AP20 – Applikation fertigstellen

Die Applikation wurde für den vereinbarten Projektumfang fertiggestellt und mit BPMN, Datenbanklogik und Dokumentation zusammengeführt.

[Detaildokument AP20](AP20-Applikation-fertiggestellt.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap21"></a>
## AP21 – Software testen

Die Software wurde geprüft und am 29.06.2026 vorgestellt. Bekannte Lint-Abweichungen sind dokumentiert und blockieren Build oder Präsentation nicht.

[Detaildokument AP21](AP21-Software-getestet.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap22"></a>
## AP22 – Vorstellung vorbereiten

Die Abschlusspräsentation wurde in Canva angelegt, im Team geteilt und anhand des BP1-Ablaufs vorbereitet.

[Detaildokument AP22](AP22-Vorstellung-vorbereitet.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

<a id="ap23"></a>
## AP23 – Projektbericht erstellen

Die Projektdokumentation wurde vollständig zusammengeführt, bereinigt und für die externe PDF- und ILIAS-Abgabe vorbereitet.

[Detaildokument AP23](AP23-Projektbericht-erstellen.md) · [Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)

---

<a id="zentrale-projektdokumente"></a>
## Optionale Repository-Quellen

Dieser Abschnitt ist nur relevant, wenn `APFinalALS.md` innerhalb des vollständigen Repositorys geöffnet wird. Das Abschlussdokument selbst enthält bereits den notwendigen Projektkontext und alle AP-Ergebnisse.

- [Dokumentations-README](../README.md)
- [Dokumentationsstruktur](../documentation-structure.md)
- [Businessprozesse](../businessprozesse-v2.md)
- [Datenbankabfragen](../datenbankabfragen-v4.md)
- [Lastenheft und Pflichtenheft](../lastenheft-und-pflichtenheft-v2.md)
- [Gesprächsprotokolle](../Gesprächsprotokoll/)
- [Projektentscheidungen](../projektentscheidungen/)

[Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)
