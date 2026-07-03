# Datenbankabfragen v4

Stand: 03.07.2026

Diese Datei ist eine Arbeitsübersicht für die SQL-Abfragen der Mars Logistik Verwaltung [ALS]. Sie erklärt kurz, welche Abfragen es gibt, was sie fachlich machen und wie sie zu den Businessprozessen passen.

Zu allen SQL-Abfragen unter `sql/queries/` gibt es eine passende Stored Procedure unter `sql/storedProcedure/`. Die normalen Query-Dateien bleiben als lesbare SELECT-Versionen für Dokumentation, Tests und Verständnis erhalten.

Gemäß dem dritten Gesprächsprotokoll sollen produktive Datenbankzugriffe über Stored Procedures erfolgen. Im aktuellen Code führt `api/restApi.php` über `runSqlFile()` jedoch noch SQL-Dateien aus. Die Stored Procedures sind damit fachlich und technisch vorbereitet, aber noch nicht in die PHP-API eingebunden.

Geprüfter Stand:

- 38 Dateien unter `sql/queries/`
- 38 passende Dateien unter `sql/storedProcedure/`
- keine fehlende Stored-Procedure-Datei
- 2 zusätzliche, aktuell von den BP1-Dashboarddiagrammen verwendete Abfragen direkt unter `sql/`

---

## SQL-Ordner

Projektpfad:

```text
C:\Users\leona\Documents\GitHub\Mars-Colony-Project\sql
```

| Bereich | Zweck |
|---|---|
| `sql/build/` | Enthält Build-, Import- und Migrationsskripte. `mysql.sql` enthält den vollständigen Demo-Import; `marskolonie_mysql.sql` das erzeugte Schema; `resourceGraphsMigration.sql` ergänzt Diagrammdaten in einer bestehenden Datenbank. |
| `sql/getResourceConsumptionHistory.sql`, `sql/getResourceStockLevels.sql` | Aktuell von der Dashboard-API geladene BP1-Abfragen für Ressourcenverbrauch und Bestand gegen Mindestbestand. |
| `sql/queries/` | Enthält lesbare SQL-Abfragen. Diese Dateien zeigen, welche Daten fachlich abgefragt werden. |
| `sql/storedProcedure/` | Enthält die Stored-Procedure-Versionen der Abfragen. Diese Variante ist für die Ausführung über die Datenbank gedacht. |
| `sql/sem2/` | Enthält ältere bzw. semesterbezogene Zusatznotizen. Für die aktuellen BP1- und BP2-Abfragen ist der Ordner nicht zentral. |
| `sql/sqlOverview.txt` | Kurze technische Übersicht über die SQL-Ordnerstruktur. |

Die beiden Diagrammabfragen liegen ausnahmsweise direkt unter `sql/`, weil `get_sql_result` im aktuellen PHP-Code nur direkte Dateien dieses Ordners freigibt. Die übrigen fachlichen Abfragen liegen strukturiert in Unterordnern; deren produktive API-Auflösung bzw. Stored-Procedure-Anbindung ist noch zu vereinheitlichen.

Stored-Procedure-Pfad:

```text
C:\Users\leona\Documents\GitHub\Mars-Colony-Project\sql\storedProcedure
```

Die Unterordner sind in `queries` und `storedProcedure` gleich aufgebaut:

| Unterordner | Bedeutung |
|---|---|
| `bp1/` | Abfragen für "Kritische Ressourcen überwachen und Nachschub auslösen". |
| `bp2/` | Abfragen für "Überschüssige Ressourcen an externe Unternehmen verkaufen". |
| `shared/` | Gemeinsame Ressourcen- und Lagerabfragen für BP1 und BP2. |
| `general/` | Allgemeine WebApp-, Dashboard- und Verwaltungsabfragen. |

---

## BP1: Kritische Ressourcen und Nachschub

BP1 beantwortet die Frage: **Welche Ressourcen werden kritisch und was muss nachbestellt oder intern umgelagert werden?**

| Query | Stored Procedure | Was macht sie? | Bedeutung für BP1 |
|---|---|---|---|
| `getRessourcesBelowMin.sql` | `getRessourcesBelowMin()` | Zeigt Ressourcen, deren Menge unter dem Mindestbestand liegt. | Startpunkt für kritische Bestände. Dadurch sieht man sofort, wo Handlungsbedarf entsteht. |
| `getRessourcesAtRisk.sql` | `getRessourcesAtRisk()` | Zeigt Ressourcen, die abgelaufen sind oder bald ablaufen. | Ergänzt die Mengenprüfung um ein Ablaufdatum-Risiko. Eine Ressource kann auch kritisch sein, wenn genug Menge da ist, aber die Haltbarkeit problematisch wird. |
| `getNachschubanforderungen.sql` | `getNachschubanforderungen()` | Berechnet vorbereitete Nachschubanforderungen inklusive Anforderungsmenge, interner Verfügbarkeit und empfohlener Maßnahme. | Macht aus der Bestandsprüfung eine konkrete Entscheidungsgrundlage: intern umlagern oder externen Nachschub vorbereiten. |

Kurz gesagt: BP1 nutzt die Queries, um kritische Ressourcen zu erkennen und daraus eine sinnvolle Nachschubentscheidung vorzubereiten.

### BP1-Dashboarddiagramme

| Query | Datenbasis | Darstellung |
|---|---|---|
| `sql/getResourceConsumptionHistory.sql` | `BESTANDSBEWEGUNG` und `RESSOURCE` | Tages- bzw. Monatsverbrauch für Wasser, Sauerstoff und Nahrung |
| `sql/getResourceStockLevels.sql` | `RESSOURCE` | Aktueller Bestand relativ zum Mindestbestand |

`sql/build/mysql.sql` enthält Tabelle und Beispieldaten. Für eine bereits bestehende Datenbank kann einmalig `sql/build/resourceGraphsMigration.sql` ausgeführt werden.

---

## BP2: Überschüssige Ressourcen verkaufen

BP2 beantwortet die Frage: **Welche Ressourcen können abgegeben oder verkauft werden, ohne die interne Versorgung der Kolonie zu gefährden?**

### 1. `getRessourcenUeberschuss.sql`

Stored Procedure:

```text
sql/storedProcedure/bp2/getRessourcenUeberschuss.sql
CALL getRessourcenUeberschuss();
```

Diese Abfrage prüft, welche Ressourcen grundsätzlich über dem internen Bedarf liegen.

Berechnung:

```text
Mindestreserve = Mindestbestand + Verbrauch pro Sol * 7
verkaufbare Menge = aktuelle Menge - Mindestreserve
```

Es werden nur Ressourcen angezeigt, bei denen die `verkaufbare Menge` größer als 0 ist.

Wichtige Ergebnisfelder:

| Feld | Bedeutung |
|---|---|
| `AKTUELLE_MENGE` | aktueller Bestand |
| `MIN_SCHWELLENWERT` | Mindestbestand, der intern bleiben soll |
| `SICHERHEITSPUFFER_7_SOL` | zusätzlicher Sicherheitspuffer für 7 Sol |
| `MINDESTRESERVE` | Mindestbestand plus Sicherheitspuffer |
| `VERKAUFBARE_MENGE` | Menge, die theoretisch abgegeben werden könnte |
| `UEBERSCHUSS_STATUS` | fachliche Einordnung des Überschusses |
| `EMPFOHLENE_MASSNAHME` | nächster sinnvoller Schritt |

Bedeutung für BP2: Diese Query ist der Einstieg. Sie sagt noch nicht endgültig, dass etwas verkauft wird, sondern nur, welche Ressourcen rechnerisch als Überschuss in Frage kommen.

---

### 2. `getVerkaufspotenzial.sql`

Stored Procedure:

```text
sql/storedProcedure/bp2/getVerkaufspotenzial.sql
CALL getVerkaufspotenzial();
```

Diese Abfrage nimmt die möglichen Überschüsse und prüft, ob es dazu schon eine fachliche Überschussbewertung gibt.

Dafür nutzt sie zusätzlich:

```text
RESSOURCEN_UEBERSCHUSS_BEWERTUNG
```

Die Abfrage unterscheidet zum Beispiel:

- Überschuss ist bereits freigegeben.
- Überschuss muss noch bewertet werden.
- Kritische Ressource braucht Freigabe durch die Kolonieleitung.

Bei den Beispieldaten aus `sql/build/mysql.sql` sollten besonders diese Ressourcen als freigegeben auftauchen:

| Ressource | Erwarteter Status |
|---|---|
| Eisen-Regolith | `BEREITS_FREIGEGEBEN` |
| Aluminiumplatten | `BEREITS_FREIGEGEBEN` |

Bedeutung für BP2: Diese Query ist die fachliche Bewertung. Sie trennt "rechnerisch übrig" von "wirklich für externe Abgabe geeignet".

Wenn keine Ergebnisse kommen:

- Prüfen, ob die Tabelle `RESSOURCEN_UEBERSCHUSS_BEWERTUNG` existiert.
- Prüfen, ob die BP2-Tabellen und Beispieldaten aus `sql/build/mysql.sql` importiert wurden.
- Prüfen, ob wirklich `getVerkaufspotenzial.sql` bzw. `getVerkaufspotenzial()` ausgeführt wird.

Wenn die Bewertungstabelle existiert, aber leer ist, sollten rechnerische Überschüsse trotzdem erscheinen, nur ohne Freigabedaten.

---

### 3. `getExterneAbgabeVorbereitung.sql`

Stored Procedure:

```text
sql/storedProcedure/bp2/getExterneAbgabeVorbereitung.sql
CALL getExterneAbgabeVorbereitung();
```

Diese Abfrage zeigt vorbereitete externe Abgaben bzw. Verkäufe.

Dafür verbindet sie:

```text
RESSOURCEN_VERKAUF
RESSOURCEN_VERKAUF_POSITION
EXTERNES_UNTERNEHMEN
RESSOURCEN_UEBERSCHUSS_BEWERTUNG
RESSOURCE
LAGER
```

Sie beantwortet:

- Welche Ressource soll abgegeben werden?
- Aus welchem Lager kommt sie?
- An welches externe Unternehmen geht sie?
- Welche Menge ist vorgesehen?
- Welchen Wert hat die Position?
- Ist die Abgabe fachlich vorbereitet?

Bei den Beispieldaten aus `sql/build/mysql.sql` sollte ein vorbereiteter Verkauf an die **Deutsche Mars Bau GmbH** sichtbar sein.

Erwartete Positionen:

| Ressource | Menge | Positionswert |
|---|---:|---:|
| Eisen-Regolith | 3000 KG | 18000 EUR |
| Aluminiumplatten | 120 STK | 36000 EUR |

Erwarteter Gesamtwert:

```text
54000 EUR
```

Erwarteter Status:

```text
ABGABE_FACHLICH_VORBEREITET
```

Bedeutung für BP2: Diese Query ist der letzte fachliche Schritt vor der externen Abgabe. Sie zeigt nicht nur, dass etwas verkauft werden könnte, sondern welcher Verkauf konkret vorbereitet wurde.

Wenn keine Ergebnisse kommen:

- Prüfen, ob es Einträge in `RESSOURCEN_VERKAUF` gibt.
- Prüfen, ob es Einträge in `RESSOURCEN_VERKAUF_POSITION` gibt.
- Prüfen, ob es Einträge in `EXTERNES_UNTERNEHMEN` gibt.
- Prüfen, ob die BP2-Beispieldaten aus `sql/build/mysql.sql` importiert wurden.

Ohne vorbereitete Verkaufsdaten bleibt diese Abfrage leer. Das ist fachlich okay, weil dann noch kein konkreter Verkauf vorbereitet wurde.

---

## BP2 kurz erklärt

| Query | Fachliche Frage |
|---|---|
| `getRessourcenUeberschuss.sql` | Haben wir überhaupt Ressourcen übrig? |
| `getVerkaufspotenzial.sql` | Sind diese Überschüsse fachlich verkaufbar oder brauchen sie noch Freigabe? |
| `getExterneAbgabeVorbereitung.sql` | Gibt es schon einen konkret vorbereiteten Verkauf an ein externes Unternehmen? |

---

## Shared-Queries

Diese Abfragen unterstützen BP1 und BP2 gemeinsam.

| Query | Stored Procedure | Was macht sie? | Wofür wichtig? |
|---|---|---|---|
| `getRessourcenWithLager.sql` | `getRessourcenWithLager()` | Zeigt Ressourcen zusammen mit ihrem Lagerort. | BP1 braucht das für interne Verfügbarkeit. BP2 braucht das für Überschüsse mit Lagerbezug. |
| `getStorageResourceSummary.sql` | `getStorageResourceSummary()` | Fasst Lagerbestände zusammen, z. B. Ressourcenanzahl, Gesamtmenge, Gewicht und Volumen. | Hilft bei Lagerübersicht, Bestandsbewertung und Managementsicht. |

---

## General-Queries

Die `general`-Queries gehören zur allgemeinen WebApp. Sie sind technisch vorhanden und haben passende Stored Procedures, sind aber nicht der Kern von BP1 oder BP2.

| Query | Stored Procedure | Kurz erklärt |
|---|---|---|
| `getActiveVehicles.sql` | `getActiveVehicles()` | Zeigt aktive Fahrzeuge. |
| `getAllCitizens.sql` | `getAllCitizens()` | Zeigt alle Bewohner bzw. Bürger. |
| `getAllCitizensByName.sql` | `getAllCitizensByName(p_search_term)` | Zeigt Bewohner bzw. Bürger nach Namen. |
| `getAllEmployees.sql` | `getAllEmployees()` | Zeigt alle Mitarbeitenden. |
| `getAllLager.sql` | `getAllLager()` | Zeigt alle Lager. |
| `getAvgWorkTimeByBeruf.sql` | `getAvgWorkTimeByBeruf()` | Berechnet durchschnittliche Arbeitszeit je Beruf. |
| `getBewohnerAtAddress.sql` | `getBewohnerAtAddress()` | Zeigt Bewohner an einer Adresse. |
| `getCitiesCount.sql` | `getCitiesCount()` | Zählt die Städte. |
| `getCitiesWithKoords.sql` | `getCitiesWithKoords()` | Zeigt Städte mit Koordinaten. |
| `getCitiesWithoutEnergySource.sql` | `getCitiesWithoutEnergySource()` | Zeigt Städte ohne Energiequelle. |
| `getCitiesWithoutTransportConnection.sql` | `getCitiesWithoutTransportConnection()` | Zeigt Städte ohne Transportanbindung. |
| `getCitiesWithStats.sql` | `getCitiesWithStats()` | Zeigt Städte mit zusammengefassten Kennzahlen. |
| `getCitizensCount.sql` | `getCitizensCount()` | Zählt Bewohner bzw. Bürger. |
| `getCurrentBithday.sql` | `getCurrentBithday()` | Zeigt aktuelle Geburtstage. Der Dateiname ist im Repo so geschrieben. |
| `getCurrentEnergieLeistung.sql` | `getCurrentEnergieLeistung()` | Zeigt aktuelle Energieleistung. |
| `getDepartmentResourceDependencies.sql` | `getDepartmentResourceDependencies()` | Zeigt Abhängigkeiten zwischen Abteilungen und Ressourcen. |
| `getDepartmentsWithLeaders.sql` | `getDepartmentsWithLeaders()` | Zeigt Abteilungen mit Leitungen. |
| `getEmployeeCountByDepartment.sql` | `getEmployeeCountByDepartment()` | Zählt Mitarbeitende je Abteilung. |
| `getEmployeeProfile.sql` | `getEmployeeProfile(p_employee_id)` | Zeigt ein Mitarbeiterprofil. |
| `getEnergySourcesByCity.sql` | `getEnergySourcesByCity()` | Zeigt Energiequellen je Stadt. |
| `getFlotte.sql` | `getFlotte()` | Zeigt die Fahrzeug- bzw. Raumfahrzeugflotte. |
| `getLagerVersorgungAtRisk.sql` | `getLagerVersorgungAtRisk()` | Zeigt Lager- oder Versorgungslagen mit Risiko. |
| `getLowTreibstoff.sql` | `getLowTreibstoff()` | Zeigt Fahrzeuge oder Bestände mit niedrigem Treibstoff. |
| `getMissionsBericht.sql` | `getMissionsBericht()` | Zeigt Missionsinformationen bzw. Missionsbericht. |
| `getMitarbeiterByBeruf.sql` | `getMitarbeiterByBeruf(p_berufung_name)` | Zeigt Mitarbeitende nach Beruf. |
| `getMitarbeiterRolle.sql` | `getMitarbeiterRolle()` | Zeigt Rollen oder Rechte von Mitarbeitenden. |
| `getResidentCountByAddress.sql` | `getResidentCountByAddress()` | Zählt Bewohner je Adresse. |
| `getRessourceLog.sql` | `getRessourceLog()` | Zeigt das Ressourcen- bzw. Inventarlog. |
| `getVehiclesByStatus.sql` | `getVehiclesByStatus(p_status)` | Zeigt Fahrzeuge nach Status. |
| `updateMitarbeiterLogin.sql` | `updateMitarbeiterLogin(p_neuer_nachname, p_bewohner_id)` | Aktualisiert Login-Daten eines Mitarbeitenden. |

---

## Kurze Einordnung

Die wichtigen Prozessabfragen liegen in `bp1`, `bp2` und `shared`. Die `general`-Abfragen bleiben als technische Unterstützung der WebApp erhalten.

Für die Zielarchitektur gilt:

```text
Lesbare Abfrage:           sql/queries/...
Vorgesehene DB-Ausführung: sql/storedProcedure/...
Aktueller PHP-Ist-Stand:   SQL-Dateien über runSqlFile()
```

Damit ist nachvollziehbar, was eine Abfrage fachlich macht, welche Stored Procedure vorgesehen ist und welche Integrationsarbeit in der API noch offen ist.
