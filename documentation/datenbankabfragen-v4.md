# Datenbankabfragen v4

Stand: 23.06.2026

Diese Version ist eine kurze Erklärung für **BP2: Überschüssige Ressourcen an externe Unternehmen verkaufen**.

Ziel: Man soll schnell sehen, welche der drei BP2-Queries was macht, was als Ergebnis erwartet wird und welche SQL-Datei bzw. Stored Procedure dazu gehört.

---

## SQL-Ordner aus dem Screenshot

| Ordner | Wofür ist er da? | Wichtig für BP2? |
|---|---|---|
| `sql/build/` | Enthält Build- und Importskripte für Tabellen und Beispieldaten. | Ja, weil die BP2-Tabellen und Beispieldaten in `sql/build/mysql.sql` stehen. |
| `sql/queries/` | Enthält normale SQL-SELECT-Abfragen. | Ja, dort liegen die drei BP2-Queries unter `sql/queries/bp2/`. |
| `sql/sem2/` | Enthält ältere bzw. semesterbezogene Zusatznotizen. | Nein, für die drei aktuellen BP2-Queries nicht direkt wichtig. |
| `sql/storedProcedure/` | Enthält Stored-Procedure-Versionen der SQL-Abfragen. | Ja, dort liegen die drei BP2-Procedures unter `sql/storedProcedure/bp2/`. |

Diese v4 ordnet alle sichtbaren Query-Dateien kurz ein. BP2 wird danach bewusst genauer erklärt, weil diese drei Queries direkt zum aktuellen Verkaufsprozess und zu den drei UI-Tabs gehören.

---

## Was ist mit den restlichen Queries?

Die Query-Dateien sind fachlich in vier Gruppen sortiert:

| Ordner | Bedeutung |
|---|---|
| `bp1/` | Kernqueries für den Prozess "Kritische Ressourcen überwachen und Nachschub auslösen". |
| `bp2/` | Kernqueries für den Prozess "Überschüssige Ressourcen an externe Unternehmen verkaufen". |
| `shared/` | Gemeinsame Ressourcen- und Lagerqueries, die BP1 und BP2 unterstützen. |
| `general/` | Allgemeine WebApp-, Dashboard- und Verwaltungsqueries. Sie sind technisch vorhanden, aber nicht der Kern der zwei aktuellen Businessprozesse. |

Zu den Dateien unter `sql/queries/...` gibt es jeweils die passende Stored-Procedure-Version unter `sql/storedProcedure/...` mit demselben Ordner und Dateinamen.

Geprüft: Es gibt **38 Query-Dateien** und **38 passende Stored-Procedure-Dateien**. Es fehlt also keine Procedure-Datei.

---

## BP1-Queries

| Query | Stored Procedure | Kurz erklärt | Wichtig für |
|---|---|---|---|
| `getNachschubanforderungen.sql` | `getNachschubanforderungen()` | Berechnet vorbereitete Nachschubanforderungen inklusive Anforderungsmenge, interner Verfügbarkeit und empfohlener Maßnahme. | BP1 |
| `getRessourcesAtRisk.sql` | `getRessourcesAtRisk()` | Zeigt Ressourcen, die abgelaufen sind oder bald ablaufen. | BP1 |
| `getRessourcesBelowMin.sql` | `getRessourcesBelowMin()` | Zeigt Ressourcen unter Mindestbestand und berechnet die Fehlmenge. | BP1 |

Diese drei Queries gehören zum ersten Hauptprozess. Sie sind also wichtig, aber nicht Teil des BP2-Verkaufs-Tabs.

---

## Shared-Queries

| Query | Stored Procedure | Kurz erklärt | Wichtig für |
|---|---|---|---|
| `getRessourcenWithLager.sql` | `getRessourcenWithLager()` | Zeigt Ressourcen mit Lagerbezug. | BP1 und BP2 |
| `getStorageResourceSummary.sql` | `getStorageResourceSummary()` | Fasst Lagerbestände zusammen, z. B. Anzahl Ressourcen, Gesamtmenge, Gewicht und Volumen. | BP1 und BP2 |

Diese Queries sind Hilfsübersichten. BP1 braucht sie für Bestands- und Nachschubprüfung, BP2 für Lager- und Überschussbezug.

---

## General-Queries

Die `general`-Queries gehören zur allgemeinen WebApp. Sie können für Seiten, Dashboards oder Verwaltungsansichten gebraucht werden, sind aber nicht der Kern von BP1 oder BP2.

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

Für die aktuelle Abgabe reicht es, diese Queries als allgemeine WebApp-Unterstützung zu erwähnen. Ausführlicher erklärt werden nur BP1, BP2 und `shared`, weil sie näher am aktuellen Prozessfokus liegen.

---

## BP2 in 3 Schritten

| Schritt | Query | Kurz gesagt |
|---:|---|---|
| 1 | `getRessourcenUeberschuss` | Prüft, welche Ressourcen grundsätzlich übrig sind. |
| 2 | `getVerkaufspotenzial` | Bewertet, ob ein Überschuss fachlich verkauft werden kann. |
| 3 | `getExterneAbgabeVorbereitung` | Zeigt vorbereitete externe Abgaben/Verkäufe. |

Import-Hinweis: Die neuen BP2-Tabellen und Beispieldaten für Schritt 2 und 3 stehen in `sql/build/mysql.sql`. Wenn lokal nur `sql/build/db/create.sql` und `sql/build/db/insert.sql` importiert wurden, fehlen diese BP2-Daten wahrscheinlich.

---

## 1. Überschuss & Bestand prüfen

### Query

```text
sql/queries/bp2/getRessourcenUeberschuss.sql
```

### Stored Procedure

```text
sql/storedProcedure/bp2/getRessourcenUeberschuss.sql
CALL getRessourcenUeberschuss();
```

### Was macht die Query?

Sie prüft alle Ressourcen mit Mindestbestand und berechnet, ob nach einer Sicherheitsreserve noch etwas übrig bleibt.

Berechnung:

```text
Mindestreserve = Mindestbestand + Verbrauch pro Sol * 7
verkaufbare Menge = aktuelle Menge - Mindestreserve
```

Nur Ressourcen mit `verkaufbare Menge > 0` werden angezeigt.

### Was sollte rauskommen?

Eine Liste möglicher Überschüsse, zum Beispiel:

- Eisen-Regolith
- Aluminiumplatten
- Stickstoff
- Schmiermittel
- Methan
- weitere Ressourcen mit Bestand über Mindestreserve

Wichtige Spalten:

| Spalte | Bedeutung |
|---|---|
| `AKTUELLE_MENGE` | Was ist gerade vorhanden? |
| `MIN_SCHWELLENWERT` | Mindestbestand, der intern bleiben soll. |
| `SICHERHEITSPUFFER_7_SOL` | Zusatzreserve für 7 Sol. |
| `MINDESTRESERVE` | Mindestbestand plus Sicherheitspuffer. |
| `VERKAUFBARE_MENGE` | Menge, die theoretisch abgegeben werden könnte. |
| `UEBERSCHUSS_STATUS` | Einschätzung des Überschusses. |
| `EMPFOHLENE_MASSNAHME` | Nächster fachlicher Schritt. |

### Warum ist das wichtig für BP2?

Das ist der Einstieg in den Verkaufsprozess. Ohne diese Prüfung könnte die Kolonie versehentlich Ressourcen verkaufen, die intern noch gebraucht werden.

---

## 2. Verkaufspotenzial bewerten

### Query

```text
sql/queries/bp2/getVerkaufspotenzial.sql
```

### Stored Procedure

```text
sql/storedProcedure/bp2/getVerkaufspotenzial.sql
CALL getVerkaufspotenzial();
```

### Was macht die Query?

Sie nimmt die möglichen Überschüsse aus Schritt 1 und prüft zusätzlich, ob es dazu schon eine fachliche Überschussbewertung gibt.

Dafür nutzt sie diese Tabelle:

```text
RESSOURCEN_UEBERSCHUSS_BEWERTUNG
```

Die Query unterscheidet zum Beispiel:

- Überschuss ist schon freigegeben.
- Überschuss muss noch bewertet werden.
- Kritische Ressource muss durch die Kolonieleitung geprüft werden.

### Was sollte rauskommen?

Eine Liste der verkaufbaren Ressourcen mit Bewertungsstatus.

Bei den aktuellen Beispieldaten aus `sql/build/mysql.sql` sollten besonders diese zwei Ressourcen als freigegeben auftauchen:

| Ressource | Erwarteter Status |
|---|---|
| Eisen-Regolith | `BEREITS_FREIGEGEBEN` |
| Aluminiumplatten | `BEREITS_FREIGEGEBEN` |

Andere Überschüsse können auch erscheinen, dann aber eher mit einer empfohlenen Maßnahme wie:

```text
UEBERSCHUSSBEWERTUNG_ANLEGEN
FREIGABE_DURCH_KOLONIELEITUNG_EINHOLEN
```

### Warum ist das wichtig für BP2?

Schritt 1 sagt nur: "Es ist rechnerisch etwas übrig."  
Schritt 2 sagt: "Darf oder sollte das wirklich verkauft werden?"

Damit wird aus einer reinen Bestandsauswertung eine fachliche Entscheidung.

### Wenn keine Results kommen

Wenn Schritt 1 Ergebnisse zeigt, Schritt 2 aber gar nichts, liegt es wahrscheinlich nicht an fehlenden Überschüssen. Dann prüfen:

- Existiert die Tabelle `RESSOURCEN_UEBERSCHUSS_BEWERTUNG` in der lokalen DB?
- Wurden die neuen BP2-Tabellen aus `sql/build/mysql.sql` importiert?
- Ruft der Button wirklich `getVerkaufspotenzial.sql` bzw. `getVerkaufspotenzial()` auf?

Wenn die Tabelle existiert, aber leer ist, sollte die Query trotzdem die rechnerischen Überschüsse anzeigen, nur ohne Freigabedaten.

---

## 3. Externe Abgabe vorbereiten

### Query

```text
sql/queries/bp2/getExterneAbgabeVorbereitung.sql
```

### Stored Procedure

```text
sql/storedProcedure/bp2/getExterneAbgabeVorbereitung.sql
CALL getExterneAbgabeVorbereitung();
```

### Was macht die Query?

Sie zeigt vorbereitete Verkäufe bzw. externe Abgaben.

Dafür verbindet sie diese Tabellen:

```text
RESSOURCEN_VERKAUF
RESSOURCEN_VERKAUF_POSITION
EXTERNES_UNTERNEHMEN
RESSOURCEN_UEBERSCHUSS_BEWERTUNG
RESSOURCE
LAGER
```

Sie beantwortet also:

- Welche Ressource soll abgegeben werden?
- Aus welchem Lager kommt sie?
- An welches externe Unternehmen geht sie?
- Welche Menge ist vorgesehen?
- Welchen Wert hat die Position?
- Ist die Abgabe fachlich vorbereitet?

### Was sollte rauskommen?

Bei den aktuellen Beispieldaten aus `sql/build/mysql.sql` sollte ein vorbereiteter Verkauf an die **Deutsche Mars Bau GmbH** erscheinen.

Erwartete Positionen:

| Ressource | Menge | Positionswert |
|---|---:|---:|
| Eisen-Regolith | 3000 KG | 18000 EUR |
| Aluminiumplatten | 120 STK | 36000 EUR |

Gesamtwert:

```text
54000 EUR
```

Erwarteter Status:

```text
ABGABE_FACHLICH_VORBEREITET
```

### Warum ist das wichtig für BP2?

Das ist der letzte fachliche Schritt vor der eigentlichen Abgabe. Die Query zeigt nicht nur, dass etwas verkauft werden könnte, sondern welcher konkrete Verkauf vorbereitet wurde.

Sie ist keine Rechnung und keine Zahlung. Sie ist eine prüfbare Vorbereitung für die externe Abgabe.

### Wenn keine Results kommen

Bei Schritt 3 ist ein leeres Ergebnis grundsätzlich möglich, wenn noch kein Verkauf vorbereitet wurde.

Prüfen:

- Gibt es Einträge in `RESSOURCEN_VERKAUF`?
- Gibt es Einträge in `RESSOURCEN_VERKAUF_POSITION`?
- Gibt es Einträge in `EXTERNES_UNTERNEHMEN`?
- Wurden die BP2-Beispieldaten aus `sql/build/mysql.sql` importiert?

Ohne vorbereitete Verkaufsdaten kann diese Query nichts anzeigen.

---

## Kurzer Unterschied zwischen den 3 Queries

| Query | Frage, die sie beantwortet |
|---|---|
| `getRessourcenUeberschuss` | Haben wir überhaupt Ressourcen übrig? |
| `getVerkaufspotenzial` | Sind diese Überschüsse fachlich verkaufbar oder brauchen sie noch Freigabe? |
| `getExterneAbgabeVorbereitung` | Gibt es schon einen konkret vorbereiteten Verkauf an ein externes Unternehmen? |

---

## Dateienübersicht

| Schritt | SELECT-Datei | Stored-Procedure-Datei | Procedure |
|---:|---|---|---|
| 1 | `sql/queries/bp2/getRessourcenUeberschuss.sql` | `sql/storedProcedure/bp2/getRessourcenUeberschuss.sql` | `getRessourcenUeberschuss()` |
| 2 | `sql/queries/bp2/getVerkaufspotenzial.sql` | `sql/storedProcedure/bp2/getVerkaufspotenzial.sql` | `getVerkaufspotenzial()` |
| 3 | `sql/queries/bp2/getExterneAbgabeVorbereitung.sql` | `sql/storedProcedure/bp2/getExterneAbgabeVorbereitung.sql` | `getExterneAbgabeVorbereitung()` |

---

## Mini-Fazit

Für die UI kann man die drei Tabs so verstehen:

1. **Überschuss & Bestand prüfen** zeigt rechnerische Überschüsse.
2. **Verkaufspotenzial bewerten** zeigt, ob diese Überschüsse freigegeben oder noch zu prüfen sind.
3. **Externe Abgabe vorbereiten** zeigt konkrete vorbereitete Verkäufe.

Wenn Tab 2 oder 3 leer bleibt, liegt es wahrscheinlich an fehlenden BP2-Tabellen, fehlenden Seed-Daten oder daran, dass noch kein Verkauf vorbereitet wurde.
