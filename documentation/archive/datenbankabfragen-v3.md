# Datenbankabfragen v3

Stand: 23.06.2026

Diese Version erklärt die Datenbankabfragen der Ares Logistik Verwaltung mit besonderem Fokus auf die aktuelle SQL-Ordnerstruktur aus den Screenshots:

- `sql/queries/`
- `sql/storedProcedure/`

Beide Ordner enthalten dieselbe fachliche Gliederung:

- `bp1/`
- `bp2/`
- `shared/`
- `general/`

Die v2 hat die wichtigsten Abfragen für die zwei ausgewählten Businessprozesse bereits beschrieben. In v3 wird zusätzlich ausdrücklich erklärt, warum es die Ordner `queries` und `storedProcedure` parallel gibt und welche Rolle der Ordner `general` spielt.

---

## 1. Projektfokus

Nach dem Feedback von Prof. Dr. Becking werden nicht mehr alle vorhandenen SQL-Abfragen gleich stark dokumentiert. Im Mittelpunkt stehen nur noch die Abfragen, die direkt zu den zwei ausgewählten Businessprozessen passen:

1. **Kritische Ressourcen überwachen und Nachschub auslösen**
2. **Überschüssige Ressourcen an externe Unternehmen verkaufen**

Wichtig zur Benennung:

Der Verkaufsprozess ist in `businessprozesse-v2.md` fachlich der ursprüngliche Prozess 6. Im SQL-Ordner heißt er trotzdem `bp2`, weil er der zweite aktuell ausgewählte Schwerpunktprozess ist.

Die alte vollständige SQL-Übersicht liegt weiterhin im Archiv:

`documentation/archive/datenbankabfragen-v1.md`

---

## 2. Erklärung der beiden Screenshot-Ordner

Die beiden Screenshots zeigen keine unterschiedlichen fachlichen Inhalte, sondern zwei technische Varianten derselben Datenbanklogik.

| Ordner | Bedeutung | Warum gibt es ihn? |
|---|---|---|
| `sql/queries/` | Normale SQL-Abfragen, meistens `SELECT`-Statements. | Sie sind gut lesbar, gut dokumentierbar und eignen sich zum Testen oder für direkte Auswertungen. |
| `sql/storedProcedure/` | Stored-Procedure-Versionen derselben Logik. | Die Datenbanklogik kann kontrolliert über Prozeduren ausgeführt werden, statt SQL frei in der Anwendung zu verteilen. |

Die Unterordner sind in beiden Bereichen gleich aufgebaut:

| Unterordner | Bedeutung |
|---|---|
| `bp1/` | Abfragen für den Prozess "Kritische Ressourcen überwachen und Nachschub auslösen". |
| `bp2/` | Abfragen für den Prozess "Überschüssige Ressourcen an externe Unternehmen verkaufen". |
| `shared/` | Gemeinsame Ressourcen- und Lagerabfragen, die BP1 und BP2 unterstützen. |
| `general/` | Allgemeine WebApp- und Dashboard-Abfragen, die weiterhin existieren, aber nicht im Hauptfokus der aktuellen Revision stehen. |

Damit ist die Struktur aus den Screenshots vollständig erklärt:

```text
sql/
├─ queries/
│  ├─ bp1/
│  ├─ bp2/
│  ├─ shared/
│  └─ general/
└─ storedProcedure/
   ├─ bp1/
   ├─ bp2/
   ├─ shared/
   └─ general/
```

---

## 3. Warum liegen viele Dateien doppelt vor?

Viele Dateien existieren einmal unter `sql/queries/` und einmal unter `sql/storedProcedure/`.

Beispiel:

```text
sql/queries/bp1/getRessourcesBelowMin.sql
sql/storedProcedure/bp1/getRessourcesBelowMin.sql
```

Das ist Absicht.

| Variante | Aufgabe |
|---|---|
| Datei unter `queries` | Lesbare SELECT-Abfrage für Dokumentation, Tests und fachliches Verständnis. |
| Datei unter `storedProcedure` | Ausführbare Datenbankprozedur mit derselben Fachlogik. |

Die gleichen Dateinamen helfen dabei, die fachliche Abfrage und die Stored-Procedure-Umsetzung schnell einander zuzuordnen.

---

## 4. Relevante Abfragen nach Businessprozess

| Businessprozess | Relevante Abfragen | Zweck |
|---|---|---|
| BP1: Kritische Ressourcen überwachen und Nachschub auslösen | `getRessourcesBelowMin.sql`, `getRessourcesAtRisk.sql`, `getNachschubanforderungen.sql`, `getRessourcenWithLager.sql`, `getStorageResourceSummary.sql` | Bestände prüfen, kritische Ressourcen erkennen, Ablaufdaten bewerten, Lagerbezug herstellen und Nachschubentscheidungen vorbereiten. |
| BP2: Überschüssige Ressourcen an externe Unternehmen verkaufen | `getRessourcenUeberschuss.sql`, `getVerkaufspotenzial.sql`, `getExterneAbgabeVorbereitung.sql`, Tabellen für externe Unternehmen, Überschussbewertung und Verkauf | Überschüsse erkennen, Sicherheitsreserve berücksichtigen, Verkaufspotenzial bewerten und externe Abgaben vorbereiten. |

---

## 5. Abfragen für BP1: Kritische Ressourcen und Nachschub

Die BP1-Abfragen liegen in diesen Ordnern:

```text
sql/queries/bp1/
sql/storedProcedure/bp1/
```

### 5.1 `getRessourcesBelowMin.sql`

**Zweck**  
Diese Abfrage erkennt Ressourcen, deren aktuelle Menge unter dem definierten Mindestbestand liegt.

**Unterstützter Use Case**  
Kritische Ressourcen anzeigen

**Fachliche Bedeutung**  
Die Kolonieleitung sieht, welche Ressourcen kritisch sind und bei welchen Beständen Nachschubbedarf entstehen kann.

**Wichtige Daten**

| Datenfeld | Bedeutung |
|---|---|
| Ressource | Welche Ressource ist betroffen? |
| Menge | Wie viel ist aktuell vorhanden? |
| Mindestbestand | Ab wann wird die Ressource kritisch? |
| Fehlmenge | Wie groß ist die Lücke bis zum Mindestbestand? |
| Lagerbezug | Wo befindet sich die Ressource? |
| Status | Fachliche Einordnung, zum Beispiel `UNTER_MINDESTBESTAND`. |

**Bezug zum Businessprozess**  
Diese Abfrage ist der zentrale technische Einstieg für BP1. Wenn eine Ressource unter dem Mindestbestand liegt, wird der fachliche Ablauf zur Prüfung und Nachschubvorbereitung ausgelöst.

---

### 5.2 `getRessourcesAtRisk.sql`

**Zweck**  
Diese Abfrage erkennt Ressourcen, deren Ablaufdatum bald erreicht oder bereits überschritten wurde.

**Unterstützter Use Case**  
Kritische Ressourcen anzeigen

**Fachliche Bedeutung**  
Eine Ressource kann nicht nur wegen zu geringer Menge kritisch sein, sondern auch wegen eines nahenden oder überschrittenen Ablaufdatums.

**Wichtige Daten**

| Datenfeld | Bedeutung |
|---|---|
| Ressource | Welche Ressource ist betroffen? |
| Ablaufdatum | Wann wird die Ressource kritisch? |
| Tage bis Ablauf | Wie dringend muss reagiert werden? |
| Lager-ID | Wo liegt die Ressource? |
| Risikostatus | Fachliche Bewertung des Ablaufdatums. |
| empfohlene Maßnahme | Zum Beispiel Verbrauch planen oder Ersatz prüfen. |

**Bezug zum Businessprozess**  
Die Abfrage ergänzt die Mindestbestandsprüfung um eine zeitliche Risikoperspektive.

---

### 5.3 `getNachschubanforderungen.sql`

**Zweck**  
Diese Abfrage bereitet fachliche Nachschubanforderungen vor.

**Unterstützter Use Case**  
Nachschubbedarf erkennen

**Fachliche Bedeutung**  
Die Datenbanklogik verbindet Mindestbestand, aktuelle Menge, Verbrauch pro Sol, Ablaufstatus und Lagerbezug. Dadurch entsteht keine automatische Bestellung, sondern eine nachvollziehbare Entscheidungsgrundlage.

**Wichtige Daten**

| Datenfeld | Bedeutung |
|---|---|
| Nachschubanforderung-ID | Nachvollziehbare Kennung für die vorbereitete Anforderung. |
| Ressource und Lager | Welche Ressource an welchem Ort betroffen ist. |
| aktuelle Menge | Aktueller Bestand. |
| Mindestbestand | Fachliche Reservegrenze. |
| Verbrauch pro Sol | Grundlage für den 7-Sol-Sicherheitspuffer. |
| Anforderungsmenge | Berechnete Menge, die vorbereitet werden soll. |
| intern verfügbare Menge | Mögliche interne Deckung durch andere Bestände desselben Ressourcentyps. |
| Anforderungsgrund | Warum Nachschub vorbereitet wird. |
| empfohlene Maßnahme | Interne Umlagerung prüfen oder externen Nachschub anfordern. |

**Bezug zum Businessprozess**  
Diese Abfrage bildet den Schritt "Bedarf berechnen und interne Verfügbarkeit prüfen" aus dem BPMN-Prozess ab.

---

## 6. Gemeinsame Abfragen für BP1 und BP2

Die gemeinsamen Abfragen liegen in diesen Ordnern:

```text
sql/queries/shared/
sql/storedProcedure/shared/
```

Sie heißen `shared`, weil sie nicht nur einem einzelnen Prozess gehören.

### 6.1 `getRessourcenWithLager.sql`

**Zweck**  
Diese Abfrage zeigt, welche Ressourcen in welchem Lager vorhanden sind.

**Unterstützte Use Cases**

- Ressourcenbestand anzeigen
- Nachschubbedarf erkennen
- Überschüssige Ressourcen anzeigen

**Fachliche Bedeutung**  
Die Abfrage verbindet Ressourcen mit ihrem Lagerort. Dadurch kann geprüft werden, ob eine Ressource intern verfügbar ist oder ob externe Maßnahmen nötig werden.

---

### 6.2 `getStorageResourceSummary.sql`

**Zweck**  
Diese Abfrage fasst Lagerbestände zusammen und zeigt pro Lager, wie viele Ressourcen und Mengen vorhanden sind.

**Unterstützte Use Cases**

- Ressourcenbestand anzeigen
- Nachschubbedarf erkennen
- Überschüssige Ressourcen anzeigen

**Fachliche Bedeutung**  
Die Abfrage liefert eine Managementsicht auf Lager. Sie eignet sich besonders für Dashboards und für eine schnelle Einschätzung der Versorgungslage.

---

## 7. Abfragen für BP2: Überschüsse und externe Abgabe

Die BP2-Abfragen liegen in diesen Ordnern:

```text
sql/queries/bp2/
sql/storedProcedure/bp2/
```

Fachlich entspricht `bp2` dem zweiten ausgewählten Schwerpunktprozess. In der ursprünglichen Prozessliste ist das der Prozess "Überschüssige Ressourcen an externe Unternehmen verkaufen".

### 7.1 `getRessourcenUeberschuss.sql`

**Zweck**  
Diese Abfrage erkennt Ressourcen, deren aktuelle Menge oberhalb der internen Mindestreserve liegt.

**Unterstützter Use Case**  
Überschüssige Ressourcen anzeigen

**Fachliche Bedeutung**  
Die Abfrage verhindert, dass Ressourcen nur nach aktueller Menge bewertet werden. Stattdessen wird eine Sicherheitsreserve berücksichtigt, damit die Versorgung der Kolonie nicht gefährdet wird.

**Berechnungslogik**

```text
Mindestreserve = Mindestbestand + Verbrauch pro Sol * 7
verkaufbare Menge = aktuelle Menge - Mindestreserve
```

**Wichtige Daten**

| Datenfeld | Bedeutung |
|---|---|
| Ressource und Lager | Welche Ressource an welchem Ort bewertet wird. |
| aktuelle Menge | Vorhandener Bestand. |
| Mindestschwellenwert | Interne Reservegrenze. |
| Verbrauch pro Sol | Grundlage für den 7-Sol-Sicherheitspuffer. |
| Mindestreserve | Bestand, der intern erhalten bleiben soll. |
| verkaufbare Menge | Menge, die fachlich als Überschuss gelten kann. |
| Überschuss-Status | Einordnung, ob eine Freigabe nötig ist. |

**Bezug zum Businessprozess**  
Diese Abfrage bildet den Schritt "Überschuss vorhanden?" aus dem BP2-Prozess ab.

---

### 7.2 `getVerkaufspotenzial.sql`

**Zweck**  
Diese Abfrage bewertet mögliche Überschüsse im Zusammenhang mit vorhandenen Überschussbewertungen.

**Unterstützter Use Case**  
Verkaufspotenzial bewerten

**Fachliche Bedeutung**  
Die Abfrage verbindet berechnete Überschüsse mit der Tabelle `RESSOURCEN_UEBERSCHUSS_BEWERTUNG`. Dadurch wird sichtbar, ob ein Überschuss nur rechnerisch vorhanden ist oder bereits fachlich freigegeben wurde.

**Wichtige Daten**

| Datenfeld | Bedeutung |
|---|---|
| verkaufbare Menge | Mögliche externe Abgabemenge. |
| Mindestreserve | Intern gesicherter Bestand. |
| Bewertung-ID | Vorhandene fachliche Bewertung. |
| Bewertungsstatus | Zum Beispiel freigegeben oder offen. |
| Begründung | Warum eine externe Abgabe möglich ist. |
| Verkaufspotenzial-Status | Fachliche Einordnung der Verkaufsfähigkeit. |
| empfohlene Maßnahme | Bewertung anlegen, Freigabe einholen oder Abgabe vorbereiten. |

**Bezug zum Businessprozess**  
Diese Abfrage bildet den Schritt "Verkaufspotenzial prüfen" ab.

---

### 7.3 `getExterneAbgabeVorbereitung.sql`

**Zweck**  
Diese Abfrage zeigt vorbereitete externe Abgaben mit Unternehmen, Verkaufspositionen, Mengen und Werten.

**Unterstützter Use Case**  
Externe Abgabe vorbereiten

**Fachliche Bedeutung**  
Die Abfrage verbindet `RESSOURCEN_VERKAUF`, `RESSOURCEN_VERKAUF_POSITION`, `EXTERNES_UNTERNEHMEN` und `RESSOURCEN_UEBERSCHUSS_BEWERTUNG`. Dadurch ist nachvollziehbar, welche Ressource an welches Unternehmen abgegeben werden soll und ob die Menge durch eine Überschussbewertung gedeckt ist.

**Wichtige Daten**

| Datenfeld | Bedeutung |
|---|---|
| Verkauf-ID | Vorbereiteter Verkauf oder externe Abgabe. |
| Unternehmen | Möglicher externer Abnehmer. |
| Verkaufsposition | Konkrete Ressource, Menge und Lager. |
| freigegebene Menge | Menge aus der Überschussbewertung. |
| Positionswert | Wirtschaftlicher Wert der Position. |
| Gesamtwert | Summe des vorbereiteten Vorgangs. |
| Abgabe-Status | Fachliche Prüfung, ob die Abgabe vorbereitet ist. |

**Bezug zum Businessprozess**  
Diese Abfrage bildet den Schritt "externe Abgabe vorbereiten" ab. Sie erzeugt keine Rechnung und keine Zahlung, sondern macht den vorbereiteten Verkauf prüfbar und präsentierbar.

---

## 8. Datenbankstrukturen für BP2

Für den Verkaufsprozess reichen reine Ressourcen- und Lagerabfragen nicht aus. Deshalb wurden zusätzliche Tabellen ergänzt.

| Tabelle | Zweck |
|---|---|
| `EXTERNES_UNTERNEHMEN` | Speichert externe Firmen, die Ressourcen kaufen oder übernehmen können. |
| `RESSOURCEN_UEBERSCHUSS_BEWERTUNG` | Dokumentiert, welche Ressource in welchem Lager als Überschuss bewertet wurde. |
| `RESSOURCEN_VERKAUF` | Speichert einen vorbereiteten Verkauf oder eine externe Abgabe. |
| `RESSOURCEN_VERKAUF_POSITION` | Speichert einzelne Ressourcenpositionen eines vorbereiteten Verkaufs. |

Diese Tabellen bilden kein vollständiges Abrechnungs- oder Zahlungssystem. Sie dienen dazu, Überschüsse nachvollziehbar zu bewerten und eine mögliche externe Abgabe vorzubereiten.

---

## 9. Was ist mit `general`?

Der Ordner `general` ist in beiden Screenshots sichtbar:

```text
sql/queries/general/
sql/storedProcedure/general/
```

Dieser Ordner enthält allgemeine Abfragen der bestehenden WebApp. Sie sind weiterhin technisch vorhanden, stehen aber nicht im Mittelpunkt der aktuellen Revision, weil sie keinen direkten Kernschritt der zwei ausgewählten Businessprozesse abbilden.

Die Dateien in `general` werden deshalb zusammengefasst erklärt und nicht einzeln so ausführlich wie BP1 und BP2 dokumentiert.

| Bereich | Dateien | Bedeutung |
|---|---|---|
| Bewohner und Bürger | `getAllCitizens.sql`, `getAllCitizensByName.sql`, `getCitizensCount.sql`, `getCurrentBithday.sql`, `getBewohnerAtAddress.sql`, `getResidentCountByAddress.sql` | Allgemeine Personen- und Bewohnerinformationen. |
| Mitarbeitende | `getAllEmployees.sql`, `getAvgWorkTimeByBeruf.sql`, `getEmployeeProfile.sql`, `getEmployeeCountByDepartment.sql`, `getMitarbeiterByBeruf.sql`, `getMitarbeiterRolle.sql`, `updateMitarbeiterLogin.sql` | Informationen zu Mitarbeitenden, Rollen, Berufen und Login-Daten. |
| Städte und Energie | `getCitiesCount.sql`, `getCitiesWithKoords.sql`, `getCitiesWithStats.sql`, `getCitiesWithoutEnergySource.sql`, `getCitiesWithoutTransportConnection.sql`, `getCurrentEnergieLeistung.sql`, `getEnergySourcesByCity.sql` | Allgemeine Auswertungen zu Städten, Koordinaten, Energieversorgung und Transportanbindung. |
| Fahrzeuge und Missionen | `getActiveVehicles.sql`, `getFlotte.sql`, `getLowTreibstoff.sql`, `getMissionsBericht.sql`, `getVehiclesByStatus.sql` | Fahrzeug-, Flotten-, Treibstoff- und Missionsinformationen. |
| Ressourcen, Lager und Abteilungen | `getAllLager.sql`, `getLagerVersorgungAtRisk.sql`, `getRessourceLog.sql`, `getDepartmentResourceDependencies.sql`, `getDepartmentsWithLeaders.sql` | Unterstützende Auswertungen zu Lager, Ressourcenlog und Abteilungen. |

Hinweis: Der Dateiname `getCurrentBithday.sql` ist so im Projekt vorhanden. Inhaltlich ist damit eine Geburtstagsabfrage gemeint.

---

## 10. Abgleich mit den Screenshots

| Element aus den Screenshots | In v3 erklärt? | Stelle |
|---|---:|---|
| `sql/queries/` | Ja | Abschnitt 2 und 3 |
| `sql/storedProcedure/` | Ja | Abschnitt 2 und 3 |
| `bp1/` | Ja | Abschnitt 5 |
| `bp2/` | Ja | Abschnitt 7 |
| `shared/` | Ja | Abschnitt 6 |
| `general/` | Ja | Abschnitt 9 |
| Unterschied zwischen SELECT-Abfragen und Stored Procedures | Ja | Abschnitt 3 |
| Warum `bp2` nicht Prozessnummer 2 aus der alten Liste meint | Ja | Abschnitt 1 und 7 |

---

## 11. Kurzfazit

Die Datenbankabfragen sind jetzt auf den aktuellen Projektfokus ausgerichtet und die Ordnerstruktur aus den Screenshots ist vollständig erklärt.

Für BP1 stehen Ressourcenbestand, Mindestbestand, Ablaufdatum, Lagerbezug und Nachschubvorbereitung im Vordergrund. Für BP2 werden dieselben Ressourcen- und Lagerdaten genutzt, zusätzlich aber durch Überschussbewertung, externe Unternehmen und vorbereitete Verkaufsdaten ergänzt.

Die Ordner `queries` und `storedProcedure` enthalten dabei keine widersprüchlichen Inhalte, sondern zwei technische Formen derselben fachlichen Logik: einmal als lesbare SQL-Abfrage und einmal als Stored Procedure.
