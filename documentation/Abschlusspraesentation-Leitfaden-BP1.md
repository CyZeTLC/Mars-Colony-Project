# Abschlusspräsentation – Leitfaden für BP1

Projekt: **Mars Logistik Verwaltung [ALS]**

Praktikumsgruppe: **1**

Betreuung: **Prof. Dr. Dominic Becking**

Zieldauer: **exakt 20:00 Minuten**

Präsentationsfokus: **BP1 – Kritische Ressourcen überwachen und Nachschub auslösen**

Stand: **03.07.2026**

---

## 1. Grundidee und roter Faden

Die Präsentation erzählt nicht alle Projektteile gleich breit. Sie verfolgt einen einzelnen fachlichen Fall vollständig durch das System:

> **Der Wasserbestand fällt unter den Mindestbestand. Wie erkennt die Kolonieleitung den Nachschubbedarf und welche technische Logik unterstützt die Entscheidung?**

Der ausgewählte Leit-Use-Case ist:

> **Nachschubbedarf erkennen**

Die beiden weiteren BP1-Use-Cases „Ressourcenbestand anzeigen“ und „Kritische Ressourcen anzeigen“ werden als notwendige Vorstufen eingeordnet.

Der rote Faden entspricht damit dem Feedback von Prof. Dr. Becking:

```text
Use Case
→ Businessprozess
→ BPMN-Modell
→ Stored Procedures
→ Applikationsbezug
```

Das durchgehende Beispiel verwendet vorhandene Seed-Daten und die vorhandene Berechnungslogik:

| Wert | Beispieldatum | Tatsächlicher Stand |
|---|---:|---|
| Ressource | Wasser | Seed-Datensatz |
| Aktueller Bestand | 900 L | Seed-Datensatz |
| Mindestbestand | 1.000 L | Seed-Datensatz |
| Fehlmenge | 100 L | durch vorhandene SQL-Logik berechenbar |
| Verbrauch pro Sol | 40 L | Seed-Datensatz |
| Sicherheitspuffer für 7 Sol | 280 L | durch vorhandene SQL-Logik berechenbar |
| Berechnete Anforderungsmenge | 380 L | durch `getNachschubanforderungen()` berechenbar |
| Intern zusätzlich verfügbar | 0 L | durch `getNachschubanforderungen()` berechenbar |
| Empfohlene Maßnahme | Externen Nachschub anfordern | durch `getNachschubanforderungen()` ableitbar |

Wichtig: Die Werte ab „Fehlmenge“ sind keine gespeicherten Seed-Datensätze und werden aktuell nicht in der Webanwendung angezeigt. Sie ergeben sich zur Laufzeit aus der vorhandenen Query-/Procedure-Definition. Ein Nachschubauftrag wird dabei weder gespeichert noch automatisch ausgelöst.

---

## 2. Exakter Zeitplan

| Folie | Inhalt | Dauer | Endzeit |
|---:|---|---:|---:|
| 1 | Titel und Leitfrage | 0:30 | 0:30 |
| 2 | Case Study, Geschäftsmodell und Geschäftsbereiche | 1:15 | 1:45 |
| 3 | Ausgewählter Use Case | 1:15 | 3:00 |
| 4 | Datenbedarf und ER-Ausschnitt | 1:30 | 4:30 |
| 5 | Änderungen an der Datenbank | 1:00 | 5:30 |
| 6 | Businessprozess BP1 | 1:30 | 7:00 |
| 7 | BPMN: Beteiligte und Prozessstart | 1:30 | 8:30 |
| 8 | BPMN: Entscheidungswege | 2:00 | 10:30 |
| 9 | Stored Procedures als Prozesslogik | 1:45 | 12:15 |
| 10 | Technischer Durchstich am Wasser-Beispiel | 2:00 | 14:15 |
| 11 | Architektur und Technologien | 1:30 | 15:45 |
| 12 | Live-Demo | 3:00 | 18:45 |
| 13 | Ergebnis, Ausblick und Feedback | 1:15 | 20:00 |

Die Zeiten enthalten Folienwechsel und kurze Übergabesätze. Fragen werden erst nach dem Schlussstatement beantwortet.

---

## 3. Gestaltungsregeln für Canva

- Format: 16:9.
- Pro Folie nur eine Hauptaussage.
- Dunkler Mars-Hintergrund, helle Schrift, Orange/Rot als Warnfarbe und Grün für Normalbetrieb.
- Maximal fünf kurze Stichpunkte pro Folie.
- Keine vollständigen SQL-Abfragen auf Folien.
- Das Wasser-Beispiel auf allen fachlichen Folien mit demselben Tropfen-Symbol markieren.
- Auf Folien 6 bis 10 oben eine kleine Fortschrittsleiste verwenden:

```text
Use Case → Businessprozess → BPMN → Stored Procedures → Anwendung
```

- Im BPMN nicht das gesamte breite Modell unlesbar verkleinern. Für Folien 7 und 8 mit hervorgehobenen Ausschnitten arbeiten.
- Sprechertexte gehören in die Canva-Notizen, nicht auf die Folien.

---

# 4. Vollständige Folien

## Folie 1 – Vom kritischen Wasserbestand zur Nachschubentscheidung

**Zeit:** 0:00–0:30

### Text auf der Folie

**Mars Logistik Verwaltung [ALS]**

### Vom kritischen Wasserbestand zur Nachschubentscheidung

**BP1: Kritische Ressourcen überwachen und Nachschub auslösen**

Praktikumsgruppe 1 · Sommersemester 2026

### Visual

Links ein Mars-/Koloniemotiv, rechts eine kompakte Kette:

```text
900 L Wasser
→ Mindestbestand unterschritten
→ Procedure berechnet 380 L Bedarf
```

### Sprechertext

„Unsere Marskolonie verfügt noch über 900 Liter Wasser. Der festgelegte Mindestbestand liegt aber bei 1.000 Litern. An diesem konkreten Beispiel zeigen wir heute durchgehend, wie aus einem fachlichen Use Case ein Businessprozess, ein BPMN-Modell, Datenbanklogik und schließlich eine sichtbare Funktion in unserer Anwendung werden.“

### Übergang

„Dafür ordnen wir zuerst kurz ein, welches Problem unsere Case Study löst.“

---

## Folie 2 – Case Study und Geschäftsmodell

**Zeit:** 0:30–1:45

### Text auf der Folie

### Datenbasierte Logistik für ein geschlossenes Versorgungssystem

**Ausgangslage**

- Ressourcen und Transporte sind begrenzt und teuer.
- Engpässe gefährden Betrieb und Versorgung der Kolonie.
- Entscheidungen benötigen aktuelle Bestands- und Lagerdaten.

**Geschäftlicher Nutzen**

- Engpässe früher erkennen
- Notfalllieferungen und Ausfälle vermeiden
- Bestände nachvollziehbar priorisieren

**Geschäftsbereiche**

Ressourcen & Lager · Transport · Energie · Städte & Bewohner · Personal · Flotte

### Visual

In der Mitte „Ressourcen & Lager“, darum die übrigen Geschäftsbereiche als kleinere Kreise. Ressourcen und Lager farblich hervorheben.

### Sprechertext

„Mars Logistik Verwaltung ist eine datenbankgestützte Webanwendung für die Logistik einer simulierten Marskolonie. Die Datenbank bildet insgesamt Bereiche wie Ressourcen, Lager, Transport, Energie, Städte, Bewohner, Personal und Fahrzeuge ab. Für eine Kolonie ist das kein reines Verwaltungsproblem: Fehlende Ressourcen verursachen teure Notfalltransporte, Produktionsausfälle oder im schlimmsten Fall eine Gefährdung der Versorgung.

Der wirtschaftliche Kern unseres Systems ist deshalb Kosten- und Risikovermeidung durch frühere, datenbasierte Entscheidungen. Nach dem Feedback im Semester haben wir den fachlichen Fokus bewusst reduziert. In der Abschlusspräsentation konzentrieren wir uns vollständig auf die Überwachung kritischer Ressourcen und die daraus folgende Nachschubentscheidung.“

### Übergang

„Innerhalb dieses Businessprozesses wählen wir eine konkrete Handlung der Kolonieleitung als Leit-Use-Case.“

---

## Folie 3 – Leit-Use-Case: Nachschubbedarf erkennen

**Zeit:** 1:45–3:00

### Text auf der Folie

### Use Case: Nachschubbedarf erkennen

| | |
|---|---|
| **Akteur** | Leitstand / Kolonieleitung |
| **Auslöser** | Bestand unterschreitet Mindestwert |
| **Benötigte Daten** | Menge, Mindestbestand, Verbrauch, Ablaufdatum, Lager |
| **Ergebnis** | Begründete Empfehlung für interne oder externe Versorgung |

**Unterstützende Use Cases**

1. Ressourcenbestand anzeigen
2. Kritische Ressourcen anzeigen
3. **Nachschubbedarf erkennen**

### Visual

Eine einfache Use-Case-Karte mit der Kolonieleitung links und dem System rechts. Das Wasser-Beispiel als rote Warnkarte: „900 L < 1.000 L“.

### Sprechertext

„Der zentrale Use Case lautet ‚Nachschubbedarf erkennen‘. Primärer Akteur ist der Leitstand beziehungsweise die Kolonieleitung. Ausgelöst wird der Fall, sobald aktuelle Bestandsdaten zeigen, dass eine Ressource den festgelegten Mindestwert unterschreitet oder aufgrund ihres Ablaufdatums nicht mehr nutzbar ist.

Damit die Datenbanklogik eine sinnvolle Empfehlung berechnen kann, benötigt sie nicht nur die aktuelle Menge. Sie braucht außerdem Mindestbestand, Verbrauch pro Sol, Priorität, Ablaufdatum und Lagerbezug. Das Ergebnis ist keine vollautomatische Bestellung, sondern eine nachvollziehbare Entscheidungsgrundlage: Ist eine interne Lösung möglich oder muss externer Nachschub angefordert werden?

Im aktuellen Stand zeigt die Anwendung den kritischen Bestand. Die weiterführende Nachschubempfehlung liegt als Datenbanklogik vor, ist aber noch nicht als eigener UI-Ablauf angebunden. Die Use Cases ‚Ressourcenbestand anzeigen‘ und ‚Kritische Ressourcen anzeigen‘ sind dabei die sichtbaren Vorstufen unseres ausgewählten Leit-Use-Cases.“

### Übergang

„Diese fachliche Entscheidung benötigt nur einen klar abgegrenzten Ausschnitt unseres Datenmodells.“

---

## Folie 4 – Datenbedarf und ER-Modell

**Zeit:** 3:00–4:30

### Text auf der Folie

### BP1 im Datenmodell

**Gesamtdatenbank:** 26 Tabellen

**Für den Leitfall zentral:** 4 Tabellen

```text
LAGER
  ↑
IST_GELAGERT_IN
  ↓
RESSOURCE ← BESTANDSBEWEGUNG
```

| Tabelle | Relevante Daten |
|---|---|
| `RESSOURCE` | Typ, Menge, Einheit, Mindestwert, Verbrauch, Ablaufdatum, Priorität |
| `LAGER` | Lager-ID und Lagertyp |
| `IST_GELAGERT_IN` | Zuordnung von Ressource und Lager |
| `BESTANDSBEWEGUNG` | Verbrauch, Nachschub, Korrektur und Zeitpunkt |

### Visual

Keinen vollständigen ER-Screenshot verwenden. Einen sauberen, vergrößerten ER-Ausschnitt mit den vier Tabellen zeichnen:

```text
LAGER 1 ── n IST_GELAGERT_IN n ── 1 RESSOURCE 1 ── n BESTANDSBEWEGUNG
```

Bei `RESSOURCE` nur diese Attribute zeigen:

```text
RESSOURCE_ID
R_TYP
MENGE
MENGE_EINHEIT
MIN_SCHWELLENWERT
VERBRAUCH_PRO_SOL
ABLAUFDATUM
PRIORITAET
```

### Sprechertext

„Die gesamte MariaDB-Datenbank enthält 26 Tabellen und bildet mehrere Unternehmensbereiche ab. Für unseren Leitfall sind aber nur vier Tabellen zentral.

`RESSOURCE` enthält den Ressourcentyp, die aktuelle Menge, Einheit, Mindestschwelle, den Verbrauch pro Sol, das Ablaufdatum und die Priorität. Über die Zuordnungstabelle `IST_GELAGERT_IN` wird eine Ressource mit einem konkreten `LAGER` verbunden. `BESTANDSBEWEGUNG` dokumentiert zeitbezogene Verbräuche, Nachschub und Korrekturen.

Damit deckt dieser Ausschnitt alle Datenerfordernisse des Use Cases ab: Wir kennen den aktuellen Zustand, die kritische Grenze, den erwarteten Verbrauch und den Ort des Bestands. Das übrige ER-Modell bleibt als Grundlage für andere Geschäftsbereiche bestehen, ist für diese Entscheidung aber nicht nötig.“

### Übergang

„Der vorhandene Datenbankentwurf musste dafür nicht neu gebaut, sondern nur gezielt erweitert werden.“

---

## Folie 5 – Änderungen an der Datenbank

**Zeit:** 4:30–5:30

### Text auf der Folie

### Gezielt erweitert statt neu gebaut

**Vorhanden und weiterverwendet**

- `RESSOURCE`, `LAGER`, `IST_GELAGERT_IN`
- Mindestbestand, Priorität, Verbrauch und Ablaufdatum

**Für BP1 ergänzt**

- `BESTANDSBEWEGUNG`
- reproduzierbare Verbrauchsdaten für 12 Monate
- Abfragen für Verbrauch und Bestand gegen Mindestbestand
- BP1-Queries und passende Stored Procedures

Kleine Fußnote:

> Projektweit wurden zusätzlich Verkaufstabellen für den zweiten Businessprozess ergänzt; sie stehen hier nicht im Fokus.

### Visual

Vorher/Nachher-Darstellung:

```text
Bestehendes Ressourcenmodell
            +
Bestandsbewegungen und BP1-Auswertungen
            =
demonstrierbare Ressourcenüberwachung
```

### Sprechertext

„Eine grundlegende Neumodellierung war nicht notwendig. Ressourcen, Lager, Zuordnungen und die relevanten Grenzwerte waren bereits vorhanden. Für BP1 wurde die Tabelle `BESTANDSBEWEGUNG` ergänzt. Sie unterscheidet Verbrauch, Nachschub und Korrektur und bildet die Grundlage für den zeitlichen Verlauf im Dashboard.

Das Build-Skript erzeugt reproduzierbare Verbrauchswerte für Wasser, Sauerstoff und Nahrung über 365 Tage. Zusätzlich wurden die zugehörigen Dashboardabfragen sowie BP1-Queries und Stored Procedures strukturiert abgelegt. Projektweit existieren 38 Query-/Procedure-Paare.“

### Übergang

„Auf dieser Datengrundlage läuft der fachliche Businessprozess ab.“

---

## Folie 6 – Businessprozess BP1

**Zeit:** 5:30–7:00

### Text auf der Folie

### Kritische Ressourcen überwachen und Nachschub auslösen

1. **Überwachen**
   Bestands- und Sensordaten aktualisieren
2. **Erkennen**
   Ist-Bestand mit Mindestbestand vergleichen
3. **Bewerten**
   Kritikalität und Nachschubbedarf bestimmen
4. **Versorgen**
   interne Produktion oder externen Nachschub wählen
5. **Abschließen**
   Bestand aktualisieren oder Notfall eskalieren

**Ziel:** Versorgungssicherheit bei nachvollziehbarer Entscheidung

### Visual

Fünf horizontale Prozessphasen. Unter „Erkennen“ die Wasserwarnung „900 L < 1.000 L“ platzieren.

### Sprechertext

„Der Businessprozess beginnt mit neuen Bestands- und Sensordaten. Das System aktualisiert die Werte und vergleicht den Ist-Bestand mit dem Mindestbestand. Liegt keine Unterschreitung vor, bleibt die Ressource im Normalbetrieb.

Bei einer Unterschreitung wird eine Warnung ausgelöst. Die Kolonieleitung bewertet parallel die Kritikalität und berechnet den Nachschubbedarf. Anschließend wird geprüft, ob eine interne Lösung, etwa Produktion oder Umlagerung, möglich ist. Ist das nicht der Fall, wird externer Nachschub angefordert.

Bei verfügbarer externer Reserve folgen Transport, Empfang und Einlagerung. Ist auch extern keine Versorgung möglich, wird der Notfallmodus eingeleitet. Nach erfolgreicher interner oder externer Versorgung wird der Bestand aktualisiert und der Normalbetrieb wieder gesichert.“

### Übergang

„Das BPMN-Modell macht sichtbar, welche Rollen diese Schritte übernehmen und wo Daten oder Nachrichten übergeben werden.“

---

## Folie 7 – BPMN: Beteiligte und Prozessstart

**Zeit:** 7:00–8:30

### Text auf der Folie

### Wer ist beteiligt?

| Pool / Lane | Verantwortung |
|---|---|
| System / Sensorik | Daten aktualisieren, Bestand überwachen, Warnung senden |
| Leitstand / Kolonieleitung | Kritikalität bewerten und Bedarf berechnen |
| Lager / Produktion | intern produzieren und einlagern |
| Logistik / Transport | externen Nachschub und Transport koordinieren |
| Externer Support | Verfügbarkeit zurückmelden |

**Verwendete BPMN-Elemente**

Start-/End-Events · Service- und User-Tasks · Gateways · Message Flows · Datenobjekte

### Visual

Linke Hälfte beziehungsweise Startbereich des finalen BPMN-v11-Modells:

```text
Neue Daten
→ Daten aktualisieren
→ Ressourcenstatus überwachen
→ Ist-Bestand unter Mindestbestand?
```

Die Lanes klar lesbar lassen. Das Gateway farblich hervorheben.

### Sprechertext

„Das finale BPMN-v11-Modell trennt vier interne Lanes und einen externen Pool. System und Sensorik übernehmen automatisierbare Service-Tasks: Daten aktualisieren, Ressourcenstatus überwachen und Warnungen auslösen. Im Leitstand liegen die fachlichen User-Tasks zur Einstufung der Kritikalität und zur Bedarfsberechnung.

Lager und Produktion übernehmen eine mögliche interne Versorgung. Logistik und Transport bearbeiten externe Anforderungen, Transporte und Einlagerung. Der externe Support ist als eigener Pool modelliert, weil hier eine organisatorische Grenze überschritten wird. Anforderung und Rückmeldung werden deshalb als Message Flows dargestellt.

Die Datenobjekte Sensordaten, Bestandsdaten, Mindestbestand, Bedarfsbericht, Nachschubauftrag und Produktionsplan zeigen, welche Informationen im Prozess verwendet oder erzeugt werden.“

### Übergang

„Entscheidend sind nun die drei Gateways, weil sie die möglichen Versorgungspfade voneinander trennen.“

---

## Folie 8 – BPMN: Drei Entscheidungen, vier Ergebnisse

**Zeit:** 8:30–10:30

### Text auf der Folie

### Entscheidungslogik im BPMN-v11-Modell

**1. Unter Mindestbestand?**

- Nein → Normalbetrieb
- Ja → Warnung und Bedarfsbericht

**2. Interne Lösung verfügbar?**

- Ja → Produktion und Einlagerung
- Nein → externen Nachschub anfordern

**3. Extern verfügbar?**

- Ja → Transport, Empfang und Einlagerung
- Nein → Notfallmodus und Eskalation

**Nach erfolgreicher Versorgung:** Bestand aktualisieren

### Visual

Das BPMN in drei nummerierte Ausschnitte gliedern:

1. Mindestbestandsprüfung
2. interne/externe Entscheidung
3. externe Verfügbarkeit und Abschluss

Die vier möglichen Ergebnisse mit Farben kennzeichnen:

- Grün: Normalbetrieb
- Blau: interne Versorgung
- Orange: externe Versorgung
- Rot: Notfalleskalation

### Sprechertext

„Das erste exklusive Gateway vergleicht Ist- und Mindestbestand. Im Nein-Pfad wird der Ist-Bestand aktualisiert und der Normalbetrieb bleibt gesichert. Im Ja-Pfad wird die kritische Ressource gemeldet. Nach der Warnung werden Kritikalität und Nachschubbedarf parallel bearbeitet und anschließend in einem Bedarfsbericht zusammengeführt.

Das zweite Gateway prüft die interne Lösung. Bei ausreichender interner Möglichkeit wird produziert und eingelagert. Andernfalls erzeugt die Kolonieleitung eine externe Nachschubanforderung. Der externe Support meldet zurück, ob Reserve oder Produktion verfügbar ist.

Das dritte Gateway trennt dann erfolgreichen externen Transport und Notfall. Bei Verfügbarkeit werden Transport, Empfang und Einlagerung durchgeführt. Ohne externe Verfügbarkeit trifft die Kolonieleitung eine Notfallentscheidung und eskaliert.

Unser Wasserbeispiel durchläuft den Warnpfad. Da kein weiterer interner Wasserbestand vorhanden ist, führt es in den externen Nachschubpfad.“

### Übergang

„Die fachlichen Entscheidungen aus dem BPMN werden durch klar zugeordnete Stored Procedures mit Daten versorgt.“

---

## Folie 9 – Stored Procedures als Prozesslogik

**Zeit:** 10:30–12:15

### Text auf der Folie

### Vom BPMN-Schritt zur Datenbankfunktion

| BPMN-Schritt | Stored Procedure | Ergebnis |
|---|---|---|
| Ist- und Mindestbestand vergleichen | `getRessourcesBelowMin()` | Fehlmenge, Fehlmenge in %, Priorität und Lager |
| Ablauf- und Bestandsrisiken prüfen | `getRessourcesAtRisk()` | Risikostatus und empfohlene Maßnahme |
| Nachschubbedarf bestimmen | `getNachschubanforderungen()` | Anforderungsmenge, Priorität und Versorgungsempfehlung |
| Lagerbezug herstellen | `getRessourcenWithLager()` | Ressource, Menge, Einheit und Lager |

Kleine Codezeile, sofern die Procedure-Definition in die Datenbank importiert wurde:

```sql
CALL getNachschubanforderungen();
```

### Visual

Links vier vereinfachte BPMN-Schritte, rechts die jeweilige Procedure. Verbindungspfeile verwenden.

### Sprechertext

„Die Stored Procedures sind keine eigenen Use Cases. Sie sind die technische Unterstützung für fachliche Schritte des Businessprozesses. Im Repository liegen die zugehörigen Procedure-Definitionen als SQL-Dateien vor.

`getRessourcesBelowMin()` filtert Ressourcen unter der Mindestschwelle und berechnet absolute sowie prozentuale Fehlmengen. `getRessourcesAtRisk()` ergänzt die Mengenbetrachtung um Ablaufdaten und gibt einen Risikostatus mit Handlungsempfehlung zurück.

Die zentrale Procedure für unseren Leitfall ist `getNachschubanforderungen()`. Sie verbindet aktuelle Menge, Mindestwert, Verbrauch pro Sol, Ablaufstatus, Priorität und intern nutzbare Bestände. Daraus entstehen eine nachvollziehbare Anforderungsmenge und die Empfehlung, intern umzulagern oder externen Nachschub anzufordern.

`getRessourcenWithLager()` stellt den Lagerbezug her. Alle vier Procedures lesen kontrolliert aus der Datenbank und verändern dabei keine Bestände.“

### Übergang

„Am Wasser-Beispiel lässt sich die Berechnung ohne abstrakten SQL-Code konkret nachvollziehen.“

---

## Folie 10 – Technischer Durchstich: Wasser

**Zeit:** 12:15–14:15

### Text auf der Folie

### Aus vorhandenen Daten berechnet

```text
Aktueller Bestand                 900 L
Mindestbestand                  1.000 L
──────────────────────────────────────
Fehlmenge                         100 L

7-Sol-Puffer = 40 L × 7           280 L
──────────────────────────────────────
Anforderungsmenge                 380 L
```

**Erwartetes Ergebnis der vorhandenen Procedure-Logik**

```text
ANFORDERUNGSPRIORITAET = HOCH
INTERN_VERFUEGBARE_MENGE = 0
EMPFOHLENE_MASSNAHME =
EXTERNEN_NACHSCHUB_ANFORDERN
```

**Dashboard:** Wasserbestand = **90 %** des Mindestbestands

Kleine Fußnote:

> Die 380 L werden aktuell weder gespeichert noch in der Web-App angezeigt.

### Visual

Links die Berechnung, rechts eine vereinfachte Ergebnis-Karte und ein roter Balken bei 90 %. Die 100-%-Mindestbestandslinie orange markieren.

### Sprechertext

„Im Seed-Datensatz besitzt Wasser die Priorität eins. Der aktuelle Bestand beträgt 900 Liter, der Mindestbestand 1.000 Liter und der erwartete Verbrauch 40 Liter pro Sol.

`getRessourcesBelowMin()` erkennt zunächst eine Fehlmenge von 100 Litern beziehungsweise 10 Prozent. Aufgrund der hohen Priorität lautet die Handlungseinstufung ‚sofort prüfen‘.

Die vorhandene Nachschublogik ergänzt zur reinen Fehlmenge einen Sicherheitspuffer für sieben Sol. 40 Liter mal sieben ergeben 280 Liter. Zusammen mit der Fehlmenge entsteht rechnerisch eine Anforderungsmenge von 380 Litern.

Die Procedure prüft außerdem weitere nutzbare Bestände desselben Ressourcentyps. Im Beispieldatensatz sind intern keine zusätzlichen Wassermengen vorhanden. Damit ist die Anforderungspriorität hoch und die empfohlene Maßnahme lautet ‚externen Nachschub anfordern‘.

Im Dashboard wird der Ausgangszustand als 90 Prozent des Mindestbestands rot dargestellt. Die weiterführenden 380 Liter sind dagegen ein berechnetes Ergebnis der vorhandenen SQL-Logik und noch keine Anzeige oder gespeicherte Anforderung in der Web-App.“

### Übergang

„Zwischen dieser Datenbanklogik und der sichtbaren Oberfläche liegt unsere mehrschichtige Anwendungsarchitektur.“

---

## Folie 11 – Architektur und Technologien

**Zeit:** 14:15–15:45

### Text auf der Folie

### Schichtenarchitektur

```text
React + TypeScript + Vite
            ↓ HTTPS / JSON
PHP-REST-API + Session + CSRF
            ↓ PDO
MariaDB / MySQL
```

**Oberfläche:** Tailwind CSS · Material UI · Recharts

**Ist-Stand**

```text
PHP-API → freigegebene SQL-Dateien → MariaDB
```

**Ziel gemäß Feedback**

```text
PHP-API → Stored Procedures → MariaDB
```

### Visual

Zwei kleine Architekturpfade nebeneinander. Ist-Stand grau/blau, Zielpfad orange. Nicht so darstellen, als sei die Procedure-Anbindung bereits produktiv umgesetzt.

### Sprechertext

„Das Frontend ist mit React, TypeScript und Vite umgesetzt. Tailwind CSS und Material UI strukturieren die Oberfläche; Recharts visualisiert Verbrauch und Mindestbestände. Das Frontend kommuniziert über HTTPS und JSON mit einer PHP-REST-API. Geschützte Aufrufe verwenden PHP-Session und einen CSRF-Token im Header. Der Datenbankzugriff erfolgt über PDO auf MariaDB beziehungsweise MySQL.

An dieser Stelle trennen wir bewusst Ist- und Zielarchitektur. Im Repository liegen 38 Procedure-Definitionen vor, die den fachlichen Funktionen zugeordnet sind. Die produktive PHP-API führt im aktuellen Projektstand jedoch weiterhin freigegebene SQL-Dateien über `runSqlFile()` aus. Die vom Professor gewünschte direkte Procedure-Anbindung ist vorbereitet, wurde aber nicht mehr in den finalen API-Stand integriert.

Diese Abgrenzung ist wichtig: In der folgenden Demo zeigen wir den realen Applikationsstand und behaupten keine bereits umgesetzte Integration.“

### Übergang

„Damit wechseln wir von Modell und Datenbanklogik in die laufende Anwendung.“

---

## Folie 12 – Live-Demo

**Zeit:** 15:45–18:45

### Text auf der Folie

### Live-Demo: BP1 in der Anwendung

1. Bestand gegen Mindestbestand
2. Verbrauch im Zeitverlauf
3. Ressourcen- und Lagerbezug
4. Ergebnis der Nachschublogik

Kleine Fußzeile:

> Leitfall: Wasser · 900 L Bestand · 1.000 L Mindestbestand

### Exakter Demoablauf

#### 15:45–16:10 – Dashboard öffnen

**Aktion**

- Anwendung bereits eingeloggt und Dashboard geladen bereithalten.
- Kurz auf „Missions-Status“ zeigen.
- Direkt zu den beiden Ressourcendiagrammen scrollen.

**Sprechertext**

„Die Anwendung bündelt allgemeine Koloniekennzahlen und die für BP1 ergänzten Ressourcendiagramme. Für unseren Leitfall konzentrieren wir uns auf Bestand und Verbrauch.“

#### 16:10–17:00 – Bestand gegen Mindestbestand

**Aktion**

- Diagramm „Bestand vs. Mindestbestand“ zeigen.
- Auf die orange 100-%-Linie und den roten Wasserbalken zeigen.
- Optional Tooltip für Wasser öffnen.

**Erwartete Werte**

| Ressource | Bestand | Mindestbestand | Prozent |
|---|---:|---:|---:|
| Wasser | 900 L | 1.000 L | 90 % |
| Sauerstoff | 1.200 m³ | 400 m³ | 300 % |
| Nahrung | 600 kg | 250 kg | 240 % |

**Sprechertext**

„Die orange Linie markiert den Mindestbestand bei 100 Prozent. Wasser liegt mit 900 von 1.000 Litern bei 90 Prozent und wird rot markiert. Sauerstoff und Nahrung liegen deutlich über ihren Mindestwerten. Die Oberfläche macht damit sofort sichtbar, wo der BP1-Warnpfad beginnt.“

#### 17:00–17:35 – Ressourcenverbrauch

**Aktion**

- Im Diagramm „Ressourcenverbrauch“ Wasser wählen.
- Kurz zwischen 12 Monaten und einem Monat umschalten.

**Sprechertext**

„Die Bestandsentscheidung wird durch den Verbrauchsverlauf ergänzt. Für Wasser können wir zwölf Monate, sechs Monate, drei Monate oder die letzten 30 Tage betrachten. Die zugrunde liegenden Bestandsbewegungen liefern die zeitliche Datengrundlage für Planung und Sicherheitspuffer.“

#### 17:35–18:05 – Ressourcen- und Lagerbezug

**Aktion**

- Nur wenn vor der Präsentation erfolgreich getestet: Seite „Ressourcen“ öffnen.
- Bestandsübersicht und Lagerzuordnung zeigen.
- Die Tabelle „Kritische Ressourcen“ korrekt als Ablaufdaten-Risiko erklären.

**Sprechertext**

„Die Ressourcenseite ergänzt den Lagerbezug. Hier sehen wir Ressourcen mit Lagerzuordnung und separat Bestände mit Ablaufdatenrisiko. Die Wasser-Unterschreitung stammt aus der Mindestbestandslogik des Dashboards und der BP1-Procedure; die obere Tabelle dieser Seite bewertet dagegen Ablaufdaten.“

**Wenn die Ressourcenseite nicht sicher funktioniert**

- Nicht öffnen.
- Stattdessen auf Folie 4 zurückgreifen oder einen vorbereiteten Screenshot des Lagerbezugs einblenden.

#### 18:05–18:35 – Vorhandene Nachschublogik zeigen

**Aktion**

- Wenn die Procedure vorab nachweislich in die Präsentationsdatenbank importiert und getestet wurde: vorbereiteten Datenbank-Tab öffnen und ausführen:

```sql
CALL getNachschubanforderungen();
```

- Andernfalls nicht so tun, als sei sie live angebunden. Stattdessen die vorhandene Procedure-Datei und die daraus nachvollziehbar berechnete Ergebniskarte aus Folie 10 zeigen.
- Nur die Wasserzeile beziehungsweise das Wasser-Beispiel hervorheben.

**Sprechertext**

„Die vorhandene Procedure-Logik berechnet für Wasser 380 Liter Anforderungsmenge, hohe Priorität, keine zusätzliche interne Verfügbarkeit und deshalb die Empfehlung, externen Nachschub anzufordern. Dieses Ergebnis ist noch nicht in die Web-App integriert und wird nicht als Auftrag gespeichert.“

#### 18:35–18:45 – Demo abschließen

**Sprechertext**

„Damit haben wir denselben Leitfall von der Bestandsanzeige über den Verbrauch und den Lagerbezug bis zur Nachschubempfehlung verfolgt.“

### Übergang

„Zum Abschluss ordnen wir ein, was erreicht wurde und welcher nächste Schritt fachlich sinnvoll wäre.“

---

## Folie 13 – Ergebnis, Ausblick und Feedback

**Zeit:** 18:45–20:00

### Text auf der Folie

### Ergebnis

- BP1 vom Use Case bis zur Anwendung nachvollziehbar verbunden
- finales BPMN-v11-Modell
- BP1-Queries und Procedure-Definitionen im Repository vorhanden
- Ressourcenverbrauch und Mindestbestand im Dashboard sichtbar

### Bewusste Abgrenzung

- kein vollständig automatischer Bestellprozess
- Procedure-Anbindung in der PHP-API noch offen

### Ausblick

1. API direkt auf Stored Procedures umstellen
2. Nachschubanforderungen mit Status dauerhaft speichern
3. Benachrichtigungen, reale Sensorik und Prognosen ergänzen

**Schlusssatz:**

„Aus einem Messwert wird eine begründete Versorgungsentscheidung.“

### Visual

Die vollständige Kette mit grünen Haken darstellen:

```text
Use Case ✓ → Businessprozess ✓ → BPMN ✓
→ Stored Procedures ✓ → Applikationsbezug ✓
```

Bei „Procedure-Anbindung“ bewusst ein offenes Pfeilsymbol statt eines Hakens verwenden.

### Sprechertext

„Unser wichtigstes Ergebnis ist nicht nur eine zusätzliche Anzeige. Wir haben BP1 als zusammenhängende Kette ausgearbeitet: vom Use Case der Kolonieleitung über den fachlichen Prozess und das BPMN-v11-Modell bis zu den Stored Procedures und dem sichtbaren Applikationsbezug.

Bewusst außerhalb des finalen Umfangs bleiben ein vollständig automatisierter Bestellablauf und die direkte Procedure-Anbindung der PHP-API. Der nächste technische Schritt ist deshalb klar: Die API ruft die vorhandenen Procedures direkt auf. Danach könnten Nachschubanforderungen dauerhaft mit Status gespeichert und später durch Benachrichtigungen, reale Sensorik oder Prognosen erweitert werden.

Das Feedback im Semester hat unseren Projektverlauf sinnvoll verändert: Statt viele Bereiche oberflächlich zu zeigen, konzentrieren wir uns auf einen fachlich und technisch nachvollziehbaren Prozess. Unsere wichtigste Erkenntnis lautet daher: Die Oberfläche folgt dem Prozess – und aus einem Messwert wird eine begründete Versorgungsentscheidung.“

Bei **20:00** enden.

---

# 5. Empfohlene Aufteilung auf sechs Personen

Die Namen können nach den tatsächlichen Vortragsteilen eingesetzt werden.

| Person | Folien | Inhalt | Redezeit |
|---|---:|---|---:|
| A | 1–2 | Einstieg, Case Study und Geschäftsmodell | 1:45 |
| B | 3–5 | Use Case, Datenmodell und DB-Änderungen | 3:45 |
| C | 6–7 | Businessprozess und BPMN-Beteiligte | 3:00 |
| D | 8–9 | BPMN-Entscheidungen und Stored Procedures | 3:45 |
| E | 10–11 | Wasserbeispiel und Architektur | 3:30 |
| F | 12–13 | Live-Demo, Fazit und Ausblick | 4:15 |

Übergaben sind bereits in den Folienzeiten enthalten. Jede Person beendet den eigenen Teil mit dem angegebenen Übergangssatz.

---

# 6. Demo-Vorbereitung und Notfallplan

## Zwei Tage vorher

- Anwendung in der tatsächlichen Präsentationsumgebung öffnen.
- Login, Session und CSRF-Token testen.
- Dashboardabfragen und beide Ressourcendiagramme prüfen.
- Wasserwerte 900 L, 1.000 L und 90 % kontrollieren.
- Importstatus von `getNachschubanforderungen()` prüfen und die Procedure nur bei erfolgreichem Import in der verwendeten MariaDB testen.
- Nur die für die Demo benötigten Browser-Tabs geöffnet lassen.
- Browserzoom und Beamerauflösung testen.
- Benachrichtigungen und Passwortmanager-Pop-ups deaktivieren.
- Einen Screenshot jeder Demoansicht erstellen.
- Zusätzlich ein kurzes Bildschirmvideo ohne Ton als Reserve aufnehmen.

## Kritischer Repository-Hinweis zur Ressourcenseite

`src/pages/Ressources.tsx` fordert aktuell diese Dateien an:

```text
getRessourcesAtRisk.sql
getAllLager.sql
getRessourcenWithLager.sql
```

Im Repository liegen sie jedoch in Unterordnern unter `sql/queries/`, während `api/restApi.php` bei `get_sql_result` nur direkte Dateien aus `sql/` freigibt und den Dateinamen über `basename()` reduziert.

Deshalb gilt:

> Die Ressourcenseite nur live zeigen, wenn sie auf dem Präsentationsserver unmittelbar vorher erfolgreich getestet wurde.

Die beiden Dashboardabfragen liegen direkt unter `sql/` und passen zum aktuellen API-Zugriff:

```text
sql/getResourceConsumptionHistory.sql
sql/getResourceStockLevels.sql
```

## Fallback bei Ausfall

1. Nicht länger als zehn Sekunden neu laden.
2. Sofort den vorbereiteten Screenshot oder das lokale Video zeigen.
3. Dazu sagen:

   „Die Live-Verbindung ist gerade nicht verfügbar. Die gezeigte Ansicht stammt aus demselben getesteten Datenstand; fachlich relevant ist hier der Wasserbestand bei 90 Prozent.“

4. Anschließend ohne technische Fehlersuche im Vortrag fortfahren.

---

# 7. Inhaltliche Qualitätskontrolle

## Unbedingt korrekt formulieren

- Aktuelle Datenbanklinie: **MariaDB/MySQL**, nicht Oracle.
- Aktuelles Backend: **PHP-REST-API mit PDO**, nicht Prisma.
- Die Anwendung greift nicht direkt aus React auf die Datenbank zu.
- Die vorhandenen Procedure-Definitionen sind fachlich vollständig zugeordnet.
- Die produktive PHP-API verwendet aktuell trotzdem noch SQL-Dateien über `runSqlFile()`.
- Die Nachschublogik bereitet eine Entscheidung vor; sie erzeugt keine automatische Bestellung.
- Die berechneten 380 L sind kein gespeicherter Datensatz und keine aktuelle UI-Ausgabe.
- Die Ressourcenseite zeigt unter „Kritische Ressourcen“ Ablaufdatenrisiken. Die Mindestbestandsunterschreitung wird im Dashboard und durch `getRessourcesBelowMin()` erkannt.
- BP2 bleibt Projektbestandteil, ist aber nicht der rote Faden der Präsentation.

## BPMN vor dem Export korrigieren

In `bpmn/BP1V2Update_Kritische_Ressourcen_v11_final.bpmn` stehen aktuell noch drei sichtbare Schreibfehler:

| Aktuell | Korrektur |
|---|---|
| `Leistand/ Kolonieleitung` | `Leitstand / Kolonieleitung` |
| `Naschubauftrag` | `Nachschubauftrag` |
| `Externen Transport empfengen` | `Externen Transport empfangen` |

Nach der Korrektur das BPMN erneut exportieren. Die vorhandene PNG-Datei unter `documentation/docu-assets/` nicht ungeprüft verwenden, weil sie nicht sicher den vollständigen finalen v11-Stand zeigt.

---

# 8. Abgleich mit den Vorgaben von Prof. Dr. Becking

| Vorgabe | Abgedeckt auf |
|---|---|
| Case Study und Geschäftsmodell kurz erinnern | Folie 2 |
| Geschäftsbereiche einordnen | Folie 2 |
| Use Cases und Datenerfordernisse | Folie 3 |
| Entity-Relationship-Modell im Überblick | Folie 4 |
| Änderungen an der Datenbank | Folie 5 |
| Wenige kurze Beispieldaten | Folien 1 und 10 |
| ausgewählter Businessprozess | Folie 6 |
| Prozessmodellierung | Folien 7 und 8 |
| daraus entwickelte Applikationsfunktionen | Folien 3, 10 und 12 |
| Stored Procedures beschreiben | Folien 9 und 10 |
| Architektur und Technologien | Folie 11 |
| Live-Demo | Folie 12 |
| Schlussstatement, Ausblick und Feedback | Folie 13 |
| durchgehendes Beispiel | Wasser auf Folien 1, 3, 6, 8, 10 und 12 |
| Use Case → BP → BPMN → Stored Procedures → Anwendung | gesamte Dramaturgie |

Damit sind alle vorgeschlagenen Inhalte enthalten, ohne den von Prof. Dr. Becking gewünschten BP1-Fokus aufzugeben.

---

# 9. Verwendete Projektquellen

Für den Abgleich wurde der gesamte Dokumentationsordner einschließlich Arbeitspaketen, Gesprächsprotokollen, Projektentscheidungen und historischen Fassungen geprüft. Inhalte aus `archive/` dienen nur der Entwicklungshistorie; bei Abweichungen haben Gesprächsprotokolle und aktuelle v2-/v4-Dokumente Vorrang. Direkt für den Leitfaden verwendet wurden insbesondere:

- [`Gesprächsprotokoll/01-Gesprächsprotokoll.md`](Gesprächsprotokoll/01-Gesprächsprotokoll.md)
- [`Gesprächsprotokoll/02-Gesprächsprotokoll.md`](Gesprächsprotokoll/02-Gesprächsprotokoll.md)
- [`Gesprächsprotokoll/03-Gesprächsprotokoll.md`](Gesprächsprotokoll/03-Gesprächsprotokoll.md)
- [`Gesprächsprotokoll/04-Gesprächsprotokoll.md`](Gesprächsprotokoll/04-Gesprächsprotokoll.md)
- [`APs/AP5-Revision-Case-Study-v2.md`](APs/AP5-Revision-Case-Study-v2.md)
- [`APs/AP10-Revision-Use-Cases.md`](APs/AP10-Revision-Use-Cases.md)
- [`APs/AP11-BPMN-Modellierung-BP1-Kritische RessourcenÜberwachenUndNachschubAuslösen.md`](APs/AP11-BPMN-Modellierung-BP1-Kritische%20RessourcenÜberwachenUndNachschubAuslösen.md)
- [`APs/AP16-Architektur-Entwurf.md`](APs/AP16-Architektur-Entwurf.md)
- [`lastenheft-und-pflichtenheft-v2.md`](lastenheft-und-pflichtenheft-v2.md)
- [`datenbankabfragen-v4.md`](datenbankabfragen-v4.md)
- [`projektentscheidungen/02 - 2026-06-24-bp1-fokus-abschlusspräsentation.md`](projektentscheidungen/02%20-%202026-06-24-bp1-fokus-abschlusspräsentation.md)
- [`projektentscheidungen/03 - 2026-07-03-prisma-verworfen-bp1-fokus.md`](projektentscheidungen/03%20-%202026-07-03-prisma-verworfen-bp1-fokus.md)
- [`../bpmn/BP1V2Update_Kritische_Ressourcen_v11_final.bpmn`](../bpmn/BP1V2Update_Kritische_Ressourcen_v11_final.bpmn)
- [`../sql/storedProcedure/bp1/getRessourcesBelowMin.sql`](../sql/storedProcedure/bp1/getRessourcesBelowMin.sql)
- [`../sql/storedProcedure/bp1/getRessourcesAtRisk.sql`](../sql/storedProcedure/bp1/getRessourcesAtRisk.sql)
- [`../sql/storedProcedure/bp1/getNachschubanforderungen.sql`](../sql/storedProcedure/bp1/getNachschubanforderungen.sql)
- [`../sql/storedProcedure/shared/getRessourcenWithLager.sql`](../sql/storedProcedure/shared/getRessourcenWithLager.sql)
- [`../sql/build/mysql.sql`](../sql/build/mysql.sql)
- [`../src/pages/Overview.tsx`](../src/pages/Overview.tsx)
- [`../src/pages/Ressources.tsx`](../src/pages/Ressources.tsx)
- [`../api/restApi.php`](../api/restApi.php)
