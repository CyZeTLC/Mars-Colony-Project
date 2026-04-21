# 6. Datenbankabfragen (SQL)

Die folgenden SQL-Skripte sind als einzelne, klar getrennte Abfragen aufgebaut und passen gut zur Projektidee der Marskolonie: operative Steuerung, Bewohnerverwaltung, Personalübersicht, Lagerlogistik und Infrastrukturkontrolle.

## 1. getActiveVehicles.sql

**Zweck**  
Dieses Skript berechnet den aktuellen Fahrzeugstatus der Kolonie. Ziel ist es, in einer einzigen Abfrage zu sehen, wie viele Fahrzeuge aktiv, inaktiv und insgesamt vorhanden sind.

**SQL-Logik**  
Die Abfrage liest Statuswerte aus zwei Tabellen aus: `FAHRZEUGE` und `RAUMFAHRZEUG`. Beide Statusspalten werden mit `UNION ALL` in einer gemeinsamen Unterabfrage zusammengeführt. Anschließend werden mit `SUM(CASE WHEN ...)` drei Kennzahlen berechnet: aktive Fahrzeuge, inaktive Fahrzeuge und Gesamtanzahl. Als aktiv gelten die Statuswerte `'im Einsatz'` und `'im Flug'`. Alles andere wird als inaktiv gezählt.

**Ergebnis**  
Das Ergebnis besteht aus genau einer Zeile mit drei Spalten:  
`active_vehicles_count`  
`inactive_vehicles_count`  
`total_vehicles_count`

**Use-Cases**  
Diese Abfrage eignet sich für ein Dashboard, eine Leitstand-Ansicht oder einen Flottenstatus auf der Startseite. Sie beantwortet direkt die Frage: „Wie einsatzbereit ist unsere Fahrzeug- und Raumfahrzeugflotte aktuell?“


## 2. getAllCitizens.sql

**Zweck**  
Dieses Skript liefert eine vollständige Bewohnerübersicht der Marskolonie. Es zeigt Grunddaten der Bewohner und ergänzt direkt, ob die Person auch Mitarbeiter ist.

**SQL-Logik**  
Ausgangspunkt ist die Tabelle `BEWOHNER`. Über `LEFT JOIN MITARBEITER` wird geprüft, ob zu einem Bewohner ein Mitarbeitereintrag existiert. Falls ja, wird im Feld `ist_mitarbeiter` der Wert `'Ja'`, sonst `'Nein'` ausgegeben. Zusätzlich werden über `INNER JOIN ADRESSE` und `INNER JOIN STADT` die Adressdaten geladen. Die Adresse wird mit `CONCAT(...)` zu einer lesbaren Zeichenkette zusammengesetzt.

**Ergebnis**  
Das Resultat enthält pro Bewohner:  
`bewohner_id`  
`vorname`  
`nachname`  
`adresse`  
`ist_mitarbeiter`

**Use-Cases**  
Diese Abfrage ist ideal für ein Einwohnerregister, eine Verwaltungsmaske oder eine Übersicht „Alle Bewohner“. Sie ist besonders nützlich, wenn die Kolonie nicht nur Bewohner erfassen, sondern auch personelle Kapazitäten verwalten will.


## 3. getAllCitizensByName.sql

**Zweck**  
Dieses Skript ist die Suchvariante der vollständigen Bewohnerliste. Es dient dazu, Bewohner gezielt über ihren Namen zu finden.

**SQL-Logik**  
Die Grundstruktur ist fast identisch zu `getAllCitizens.sql`: Bewohnerdaten, Adresse und Mitarbeiterstatus werden zusammengeführt. Zusätzlich enthält die Abfrage eine `WHERE`-Bedingung mit `LIKE`. Dabei wird `vorname` und `nachname` zu einem vollständigen Namen zusammengesetzt und mit einem Platzhalter `?` gegen den Suchbegriff geprüft. Durch `CONCAT('%', ?, '%')` wird nach Teilstrings gesucht.

**Ergebnis**  
Es werden nur die Bewohner zurückgegeben, deren vollständiger Name den Suchtext enthält. Die Struktur der Ergebnisliste bleibt dabei gleich wie bei der Vollabfrage.

**Use-Cases**  
Typische Einsatzfälle sind Suchfelder im Frontend, Live-Suche in der Bewohnerverwaltung oder schnelle Auswahlmasken für andere Prozesse, zum Beispiel Einsatzplanung, Personalzuordnung oder Adressprüfung.


## 4. getAllEmployees.sql

**Zweck**  
Dieses Skript liefert eine kompakte Übersicht aller Mitarbeiter der Kolonie. Der Fokus liegt klar auf Personal- und Login-Daten.

**SQL-Logik**  
Die Abfrage startet in der Tabelle `MITARBEITER` und verbindet diese per `INNER JOIN` mit `BEWOHNER`. Dadurch werden technische Personaldaten wie `LOGIN` und `GEHALT` mit den Klarnamen kombiniert. Der `INNER JOIN` sorgt dafür, dass nur gültige Mitarbeiter mit zugehörigem Bewohnerdatensatz erscheinen.

**Ergebnis**  
Zurückgegeben werden:  
`LOGIN`  
`VORNAME`  
`NACHNAME`  
`GEHALT`

**Use-Cases**  
Diese Abfrage eignet sich für Personalverwaltung, Rechteverwaltung, Admin-Oberflächen oder interne Mitarbeiterverzeichnisse.


## 5. getAllLager.sql

**Zweck**  
Dieses Skript aggregiert die Lagerdaten der Marskolonie. Es zeigt pro Lagerstandort, wo sich das Lager befindet, welchen Typ es hat und wie viele Ressourcen dort aktuell gelagert sind.

**SQL-Logik**  
Die Abfrage beginnt bei `IST_GELAGERT_IN`, also der Zuordnung zwischen Ressourcen und Lagern. Danach werden `LAGER` und `KOORDINATE` per `INNER JOIN` angebunden. Mit `COUNT(RESSOURCE_ID)` wird gezählt, wie viele Ressourceneinträge pro Lager vorkommen. Durch `GROUP BY LAGER.LAGER_ID` werden diese Einträge pro Lager zu einer zusammengefassten Zeile verdichtet.

**Ergebnis**  
Das Resultat enthält pro Lager:  
`Lager ID`  
`Breitengrad`  
`Laengengrad`  
`Lager Typ`  
`Anzahl Ressourcen`

**Use-Cases**  
Diese Abfrage ist ideal für Lagerübersichten, Kartenansichten, Ressourcenmonitoring und operative Logistikentscheidungen. Sie unterstützt direkt das Ziel, jederzeit einen aktuellen Überblick über Lagerbestände und Ressourcenbewegungen zu erhalten.


## 6. getAvgWorkTimeByBeruf.sql

**Zweck**  
Dieses Skript analysiert die durchschnittliche Arbeitszeit pro Berufung. Es ist eine Auswertungsabfrage für Personalplanung und Kapazitätsanalyse.

**SQL-Logik**  
Die Abfrage liest aus der Tabelle `Berufung` den Berufsnamen und berechnet mit `AVG(b.arbeitszeit)` den Mittelwert der Arbeitszeit. Durch `GROUP BY b.berufung_name` wird jede Berufung getrennt ausgewertet. Anschließend sortiert `ORDER BY durchschnittliche_arbeitszeit DESC` die Ergebnisse absteigend nach durchschnittlicher Arbeitszeit.

**Ergebnis**  
Es entsteht eine sortierte Liste aus:  
`berufung_name`  
`durchschnittliche_arbeitszeit`

**Use-Cases**  
Die Abfrage eignet sich für Berichte zur Arbeitsverteilung, für die Identifikation stark belasteter Berufsgruppen und für Planungsentscheidungen: Wo fehlen Kapazitäten, welche Tätigkeiten binden besonders viel Arbeitszeit?


## 7. getBewohnerAtAddress.sql

**Zweck**  
Dieses Skript zeigt, welche Bewohner zu welchen Adressen gehören. Es ist eine einfache, aber fachlich wichtige Stammdatenabfrage.

**SQL-Logik**  
Die Tabelle `BEWOHNER` wird mit `ADRESSE` verknüpft. Ausgegeben werden Bewohner-ID, Vorname, Nachname, Straße und Hausnummer. Die `ORDER BY`-Klausel sortiert die Ergebnisse zuerst nach Nachname und dann nach Vorname. Dadurch entsteht eine alphabetisch geordnete Bewohnerliste.

**Ergebnis**  
Das Resultat enthält:  
`bewohner_id`  
`vorname`  
`nachname`  
`Straße`  
`hausnummer`

**Use-Cases**  
Typische Anwendungen sind Wohnraumverwaltung, Post- und Lieferlogik, Bewohnerkontrolle pro Wohnsektor oder einfache Adressauskünfte in der Kolonie.


## 8. getCitiesCount.sql

**Zweck**  
Dieses Skript berechnet die Gesamtanzahl aller Städte beziehungsweise Siedlungen im System. Es ist eine reine Kennzahlenabfrage.

**SQL-Logik**  
Die Logik ist bewusst minimal gehalten: `COUNT(*)` zählt alle Zeilen der Tabelle `STADT`. Es gibt keine Joins und keine Filter. Dadurch wird direkt die Anzahl aller vorhandenen Städte ermittelt.

**Ergebnis**  
Das Ergebnis besteht aus genau einer Spalte:  
`cities_count`

**Use-Cases**  
Diese Abfrage eignet sich für Dashboard-Kacheln, Managementübersichten oder einen allgemeinen Systemstatus. Sie beantwortet schnell die Frage, wie viele Siedlungen im Koloniesystem aktuell verwaltet werden.


## 9. getCitiesWithKoords.sql

**Zweck**  
Dieses Skript liefert die Stadt- beziehungsweise Siedlungsdaten inklusive Koordinaten. Es ist besonders für Kartenansichten und geobasierte Oberflächen gedacht.

**SQL-Logik**  
Die Tabelle `STADT` wird über `koord_id` mit der Tabelle `KOORDINATE` verbunden. Ausgegeben werden Stadtname, Breitengrad und Längengrad. Die Abfrage ist damit eine direkte Verknüpfung von Stammdaten und Geodaten.

**Ergebnis**  
Pro Stadt entsteht eine Zeile mit:  
`stadt_name`  
`breitengrad`  
`laengengrad`

**Use-Cases**  
Diese Abfrage ist sinnvoll für Karten, Standortvisualisierungen, Navigationsübersichten oder logistische Planung zwischen Sektoren und Städten.


## 10. getCitiesWithoutEnergySource.sql

**Zweck**  
Dieses Skript identifiziert Städte, die aktuell keiner Energiequelle zugeordnet sind. Es ist damit eine Kontroll- und Warnabfrage für kritische Infrastruktur.

**SQL-Logik**  
Die Abfrage startet in `STADT` und verbindet optional über `LEFT JOIN` die Tabelle `VERSORGT_STADT`. Anschließend filtert `WHERE vs.EQ_ID IS NULL` genau die Städte heraus, für die keine Energiequellen-Zuordnung existiert. Durch `ORDER BY s.STADT_NAME` werden die Ergebnisse alphabetisch sortiert. Das ist ein klassisches Muster zur Suche nach fehlenden Zuordnungen.

**Ergebnis**  
Das Resultat enthält:  
`STADT_ID`  
`STADT_NAME`  
für alle Städte ohne Energieversorgungseintrag.

**Use-Cases**  
Diese Abfrage ist wichtig für Sicherheits- und Infrastrukturmonitoring. Sie kann im Dashboard als Warnliste erscheinen oder für technische Eskalationen genutzt werden: „Welche Städte sind aktuell nicht mit Energie verknüpft?“


## 11. getCitiesWithoutTransportConnection.sql

**Zweck**  
Dieses Skript identifiziert Städte, die aktuell keine Transportanbindung besitzen. Es ist damit eine Kontrollabfrage für die logistische Infrastruktur der Marskolonie.

**SQL-Logik**  
Die Abfrage startet in der Tabelle `STADT` und verbindet diese per `LEFT JOIN` mit `TRANSPORTWEGE`. Anschließend filtert `WHERE t.tpw_id IS NULL` genau die Städte heraus, zu denen kein passender Transportweg-Eintrag existiert. Das ist ein klassisches SQL-Muster zur Suche nach fehlenden Zuordnungen.

**Ergebnis**  
Das Resultat enthält pro Treffer nur den Städtenamen:  
`stadt_name`

**Use-Cases**  
Diese Abfrage eignet sich für Infrastruktur-Monitoring, Kartenansichten mit Warnhinweisen oder Planungsprozesse für neue Verkehrs- und Versorgungskorridore. Sie beantwortet direkt die Frage: „Welche Städte sind aktuell nicht an das Transportsystem angebunden?“


## 12. getCitiesWithStats.sql

**Zweck**  
Dieses Skript liefert eine statistische Übersicht über die Städte der Marskolonie. Es kombiniert Standortdaten mit Einwohnerzahlen.

**SQL-Logik**  
Die Tabelle `STADT` wird mit `KOORDINATE` verknüpft, um die Geodaten zu laden. Danach folgen `LEFT JOIN ADRESSE` und `LEFT JOIN BEWOHNER`, damit auch Städte ohne Bewohner im Ergebnis erhalten bleiben. Mit `COUNT(b.bewohner_id)` wird die Anzahl der Bewohner pro Stadt berechnet. Durch `GROUP BY s.stadt_name, k.breitengrad, k.laengengrad` entsteht pro Stadt genau eine aggregierte Zeile.

**Ergebnis**  
Das Resultat enthält pro Stadt:  
`stadt_name`  
`breitengrad`  
`laengengrad`  
`einwohner_anzahl`

**Use-Cases**  
Diese Abfrage eignet sich für Karten-Dashboards, Stadtvergleiche, Bevölkerungsübersichten und Managementberichte. Sie ist besonders nützlich, wenn man die Größe und Verteilung der Bevölkerung in der Kolonie schnell erfassen will.


## 13. getCitizensCount.sql

**Zweck**  
Dieses Skript berechnet zentrale Kennzahlen zur Bevölkerung der Kolonie. Es liefert sowohl die Gesamtzahl aller Bewohner als auch die Anzahl Minderjähriger.

**SQL-Logik**  
Mit `COUNT(*)` werden alle Datensätze aus `BEWOHNER` gezählt. Zusätzlich wird mit `COUNT(CASE WHEN ... THEN 1 ELSE NULL END)` berechnet, wie viele Bewohner jünger als 18 Jahre sind. Die Altersprüfung erfolgt über `GEB > CURRENT_DATE - INTERVAL '18' YEAR`. Dadurch werden nur Geburtsdaten gezählt, die innerhalb der letzten 18 Jahre liegen.

**Ergebnis**  
Das Resultat enthält genau eine Zeile mit zwei Kennzahlen:  
`citizens_count`  
`minors_count`

**Use-Cases**  
Diese Abfrage eignet sich für Dashboard-Kacheln, Bevölkerungsberichte, Planungsentscheidungen für Wohnraum oder soziale Infrastruktur und für schnelle Managementübersichten.


## 14. getCurrentBirthday.sql

**Zweck**  
Dieses Skript ermittelt alle Bewohner, die am aktuellen Tag Geburtstag haben. Es ist eine tagesbezogene Ereignisabfrage.

**SQL-Logik**  
Die Abfrage liest Bewohnerdaten aus `BEWOHNER` und filtert über `EXTRACT(MONTH FROM b.geb)` und `EXTRACT(DAY FROM b.geb)` auf den aktuellen Monat und den aktuellen Tag. Das Geburtsjahr wird dabei bewusst ignoriert. So werden alle Personen gefunden, deren Geburtstag heute ist, unabhängig vom Alter.

**Ergebnis**  
Das Resultat enthält:  
`bewohner_id`  
`vorname`  
`nachname`  
`geb`

**Use-Cases**  
Diese Abfrage eignet sich für Tagesansichten, interne Mitteilungen, soziale Features in der Anwendung oder Verwaltungsprozesse, bei denen tagesbezogene Bewohnerereignisse relevant sind.


## 15. getCurrentEnergieLeistung.sql

**Zweck**  
Dieses Skript berechnet die aktuell insgesamt verfügbare Energie-Leistung der Kolonie. Es ist eine reine Summenabfrage zur Infrastrukturüberwachung.

**SQL-Logik**  
Die Abfrage verwendet `SUM(AKTUELLE_LEISTUNG)` auf der Tabelle `ENERGIEQUELLE`. Dadurch werden alle aktuellen Leistungswerte aller Energiequellen zu einer einzigen Gesamtsumme zusammengeführt.

**Ergebnis**  
Das Resultat besteht aus genau einer Kennzahl:  
`current_energy_power`

**Use-Cases**  
Diese Abfrage eignet sich für eine Dashboard-Kachel zur Gesamtenergie, für die Überwachung kritischer Versorgungslagen und für schnelle Einschätzungen zur aktuellen Leistungsfähigkeit des Energiesystems.


## 16. getDepartmentResourceDependencies.sql

**Zweck**  
Dieses Skript zeigt, welche Abteilungen von welchen Ressourcen abhängig sind. Es bildet also eine direkte Beziehung zwischen Organisationsstruktur und Materialbedarf ab.

**SQL-Logik**  
Die Zuordnungstabelle `BAUT_AB` wird mit `ABTEILUNG` und `RESSOURCE` verknüpft. Dadurch entsteht für jede Kombination aus Abteilung und Ressource eine eigene Zeile. Zusätzlich werden Ressourcentyp und Priorität ausgegeben. Die Sortierung erfolgt nach Abteilungsname, Priorität und Ressourcentyp.

**Ergebnis**  
Das Resultat enthält:  
`BEREICH_ID`  
`ABTEILUNG_NAME`  
`RESSOURCE_ID`  
`R_TYP`  
`PRIORITAET`

**Use-Cases**  
Diese Abfrage eignet sich für Ressourcenplanung, Priorisierung von Materialversorgung, Analyse kritischer Abhängigkeiten und Vorbereitung logistischer Entscheidungen zwischen Fachbereichen.


## 17. getDepartmentsWithLeaders.sql

**Zweck**  
Dieses Skript liefert eine Übersicht aller Abteilungen inklusive der jeweils zugeordneten Leitungsperson.

**SQL-Logik**  
Die Abfrage startet in `ABTEILUNG` und verbindet optional per `LEFT JOIN` den zuständigen Mitarbeiter aus `MITARBEITER`. Anschließend werden über einen weiteren `LEFT JOIN` die Personendaten aus `BEWOHNER` geladen. Durch die Verwendung von `LEFT JOIN` bleiben auch Abteilungen ohne zugewiesene Leitung im Ergebnis sichtbar.

**Ergebnis**  
Das Resultat enthält:  
`BEREICH_ID`  
`ABTEILUNG_NAME`  
`TAETIGKEIT`  
`LEITER_ID`  
`LEITER_VORNAME`  
`LEITER_NACHNAME`  
`LEITER_LOGIN`

**Use-Cases**  
Diese Abfrage eignet sich für Organigramme, Verwaltungsübersichten, Zuständigkeitslisten und Führungsstrukturen innerhalb der Kolonie.


## 18. getEmployeeCountByDepartment.sql

**Zweck**  
Dieses Skript berechnet die Anzahl der Mitarbeiter pro Abteilung. Es ist eine klassische Personalstatistik-Abfrage.

**SQL-Logik**  
Die Tabelle `ABTEILUNG` wird per `LEFT JOIN` mit `MITARBEITER` verbunden. Dadurch bleiben auch Abteilungen ohne Mitarbeiter im Ergebnis erhalten. Mit `COUNT(m.MITARBEITER_ID)` wird die Mitarbeiteranzahl pro Abteilung gezählt. Anschließend wird nach der Anzahl absteigend sortiert.

**Ergebnis**  
Das Resultat enthält pro Abteilung:  
`BEREICH_ID`  
`ABTEILUNG_NAME`  
`ANZAHL_MITARBEITER`

**Use-Cases**  
Diese Abfrage eignet sich für Personalübersichten, Kapazitätsanalysen, Vergleich von Abteilungsgrößen und Managementberichte zur Verteilung des Personals.


## 19. getEmployeeProfile.sql

**Zweck**  
Dieses Skript lädt das vollständige Profil eines einzelnen Mitarbeiters. Es ist eine Detailabfrage für eine Profil- oder Detailansicht.

**SQL-Logik**  
Die Abfrage verbindet `employees` per `INNER JOIN` mit `citizens` über `citizen_id`. Anschließend wird mit `WHERE employees.employee_id = :employee_id` genau ein Mitarbeiter über einen benannten Parameter gefiltert. Auffällig ist hier, dass englische Tabellen- und Spaltennamen verwendet werden und `SELECT *` alle verfügbaren Spalten beider Tabellen zurückliefert.

**Ergebnis**  
Das Resultat enthält alle Spalten aus:  
`employees`  
`citizens`  
für genau den Mitarbeiter mit der angegebenen ID.

**Use-Cases**  
Diese Abfrage eignet sich für Mitarbeiter-Profile, Detailseiten im Adminbereich, Account-Ansichten oder Bearbeitungsmasken. Sie beantwortet die Frage: „Welche vollständigen Daten gehören zu genau diesem Mitarbeiter?“


## 20. getEnergySourcesByCity.sql

**Zweck**  
Dieses Skript listet auf, welche Energiequellen welcher Stadt zugeordnet sind. Es bildet also die Energieinfrastruktur pro Stadt direkt ab.

**SQL-Logik**  
Die Tabelle `VERSORGT_STADT` dient als Zuordnung zwischen `STADT` und `ENERGIEQUELLE`. Über `JOIN STADT` und `JOIN ENERGIEQUELLE` werden die Stammdaten der Städte und Energiequellen zusammengeführt. Die Sortierung erfolgt nach Stadtname und Energiequellen-ID.

**Ergebnis**  
Das Resultat enthält:  
`STADT_ID`  
`STADT_NAME`  
`EQ_ID`  
`EQ_TYP`  
`AKTUELLE_LEISTUNG`  
`KAPAZITAET_MAX`

**Use-Cases**  
Diese Abfrage eignet sich für Infrastrukturübersichten, Stadtprofile, Energie-Monitoring und technische Verwaltungsansichten. Sie zeigt direkt, welche Energiequellen eine Stadt versorgen und wie leistungsfähig diese aktuell sind.


## 21. getFlotte.sql

**Zweck**  
Dieses Skript liefert eine gemeinsame Übersicht über die gesamte Flotte der Kolonie, also Bodenfahrzeuge und Raumfahrzeuge in einem einheitlichen Ergebnis.

**SQL-Logik**  
Die Abfrage besteht aus zwei `SELECT`-Teilen, die mit `UNION ALL` zusammengeführt werden. Aus `FAHRZEUGE` werden Bodenfahrzeuge gelesen, aus `RAUMFAHRZEUG` die Raumfahrzeuge. Beide Teilergebnisse werden auf dieselbe Spaltenstruktur gebracht: Typ, Name, Status und Bilddaten. `UNION ALL` sorgt dafür, dass alle Fahrzeuge vollständig übernommen werden.

**Ergebnis**  
Das Resultat enthält:  
`TYP`  
`NAME`  
`STATUS`  
`IMG`

**Use-Cases**  
Diese Abfrage eignet sich für Flottenübersichten, Fahrzeuggalerien, Wartungsansichten oder operative Dashboards. Sie beantwortet direkt: „Welche Fahrzeuge existieren insgesamt und in welchem Status befinden sie sich?“


## 22. getLagerVersorgungAtRisk.sql

**Zweck**  
Dieses Skript identifiziert Energiequellen beziehungsweise Lager-Versorgungen mit kritisch niedriger Leistungsreserve. Es ist eine Risikoabfrage für Versorgungssicherheit.

**SQL-Logik**  
Die Abfrage liest aus `ENERGIEQUELLE` die Felder `lager_id`, `aktuelle_leistung` und `kapazitaet_max`. Anschließend filtert `WHERE (aktuelle_leistung / kapazitaet_max) < 0.5` alle Datensätze, bei denen die aktuelle Leistung unter 50 Prozent der maximalen Kapazität liegt.

**Ergebnis**  
Das Resultat enthält:  
`lager_id`  
`aktuelle_leistung`  
`kapazitaet_max`

**Use-Cases**  
Diese Abfrage eignet sich für Warnlisten, Energie-Monitoring, Infrastrukturkontrolle und Priorisierung technischer Maßnahmen. Sie beantwortet direkt: „Welche Versorgungsbereiche laufen aktuell mit weniger als der halben Kapazität?“


## 23. getLowTreibstoff.sql

**Zweck**  
Dieses Skript identifiziert Raumfahrzeuge mit niedrigem Treibstoffstand. Es ist eine einfache, aber operative Sicherheitsabfrage.

**SQL-Logik**  
Die Abfrage liest `RF_TYP` und `TREIBSTOFF_STAND` aus `RAUMFAHRZEUG`. Über `WHERE TREIBSTOFF_STAND < 45.0` werden nur die Fahrzeuge ausgewählt, deren Treibstoffstand unterhalb des definierten Grenzwerts liegt.

**Ergebnis**  
Das Resultat enthält:  
`RF_TYP`  
`TREIBSTOFF_STAND`

**Use-Cases**  
Diese Abfrage eignet sich für Wartungs- und Tanklisten, Flugvorbereitung, Sicherheitskontrolle und Flottenmonitoring. Sie beantwortet direkt: „Welche Raumfahrzeuge müssen bald betankt oder aus dem Einsatz genommen werden?“


## 24. getMissionsBericht.sql

**Zweck**  
Dieses Skript liefert einen kompakten Missionsbericht über Transportwege der Marskolonie. Es verbindet Pilot, Fahrzeug, Zielsektor, Dauer und Status in einer gemeinsamen Übersicht.

**SQL-Logik**  
Die Abfrage startet in `TRANSPORTWEGE` und verknüpft diese per `JOIN` mit `MITARBEITER`, `FAHRZEUGE` und `STADT`. Dadurch werden technische Transportdaten mit Personal-, Fahrzeug- und Ortsdaten kombiniert. Es werden nur Datensätze angezeigt, bei denen alle Verknüpfungen vorhanden sind.

**Ergebnis**  
Das Resultat enthält:  
`tpw_id`  
`pilot`  
`fahrzeug`  
`sektor`  
`dauer`  
`tpw_status`

**Use-Cases**  
Diese Abfrage eignet sich für Einsatzprotokolle, Missionsübersichten, Logistik-Dashboards oder Kontrollansichten im Leitstand. Sie beantwortet direkt die Frage: „Welche Transportmissionen laufen oder liefen, wer war verantwortlich und welches Fahrzeug wurde genutzt?“


## 25. getMitarbeiterByBeruf.sql

**Zweck**  
Dieses Skript liefert alle Mitarbeiter, die zu einer bestimmten Berufung gehören. Es ist eine gefilterte Personalabfrage nach Tätigkeitsprofil.

**SQL-Logik**  
Die Abfrage startet in `Mitarbeiter` und verbindet diese per `JOIN` mit `Berufung`. Anschließend filtert `WHERE b.berufung_name = :berufungName` auf genau die angegebene Berufsbezeichnung. Der Platzhalter `:berufungName` zeigt, dass der Wert dynamisch aus der Anwendung übergeben wird.

**Ergebnis**  
Das Resultat enthält:  
`mitarbeiter_id`  
`vorname`  
`nachname`  
`gehalt`

**Use-Cases**  
Diese Abfrage eignet sich für Personalfilter, Rollenlisten, Einsatzplanung und Auswertungen wie: „Zeige alle Techniker“, „Zeige alle Piloten“ oder „Welche Mitarbeiter gehören zu einer bestimmten Berufsgruppe?“


## 26. getMitarbeiterRolle.sql

**Zweck**  
Dieses Skript liefert eine Mitarbeiterübersicht inklusive zugeordneter Berufung. Es verbindet also Personaldaten direkt mit der fachlichen Rolle.

**SQL-Logik**  
Die Abfrage startet in `MITARBEITER`, verbindet per `JOIN` die Tabelle `BERUFUNG` und anschließend `BEWOHNER`. Dadurch werden Login, Name, Berufungsbezeichnung und Gehalt in einer einzigen Abfrage zusammengeführt.

**Ergebnis**  
Das Resultat enthält:  
`login`  
`vorname`  
`nachname`  
`berufung_name`  
`gehalt`

**Use-Cases**  
Diese Abfrage eignet sich für Rollenübersichten, Personalverwaltung, Admin-Ansichten und Zuständigkeitslisten. Sie beantwortet direkt die Frage: „Welche Person hat welche Rolle im System?“


## 27. getResidentCountByAddress.sql

**Zweck**  
Dieses Skript berechnet, wie viele Bewohner an jeder Adresse wohnen. Es ist eine aggregierte Wohnraum- und Belegungsabfrage.

**SQL-Logik**  
Die Tabelle `ADRESSE` wird mit `STADT` verbunden, damit jede Adresse ihrer Stadt zugeordnet ist. Über `LEFT JOIN BEWOHNER` werden die Bewohnerdaten optional angehängt. Mit `COUNT(b.BEWOHNER_ID)` wird die Anzahl der Bewohner pro Adresse berechnet. Durch `GROUP BY` entsteht pro Adresse genau eine aggregierte Zeile. Die Sortierung erfolgt absteigend nach Bewohnerzahl.

**Ergebnis**  
Das Resultat enthält:  
`ADRESSE_ID`  
`ADRESSE`  
`STADT_NAME`  
`ANZAHL_BEWOHNER`

**Use-Cases**  
Diese Abfrage eignet sich für Wohnraumverwaltung, Belegungsanalysen, Kapazitätsplanung und Übersichten wie: „Welche Adressen sind besonders stark belegt?“


## 28. getRessourceLog.sql

**Zweck**  
Dieses Skript liefert ein Protokoll über Ressourcenbewegungen beziehungsweise Inventarereignisse pro Stadtinventar. Es ist eine klassische Log-Abfrage.

**SQL-Logik**  
Die Abfrage verbindet `STADT`, `STADTINVENTAR`, `INVENTARLOG` und `RESSOURCE`. Dadurch werden Stadtname, Inventar-ID, Ressourcentyp, aktuelle Gesamtmenge und Zeitstempel des Logeintrags zusammengeführt. Die Sortierung `ORDER BY il.DATUM DESC` zeigt die neuesten Ereignisse zuerst.

**Ergebnis**  
Das Resultat enthält:  
`STADT_NAME`  
`INVENTAR_ID`  
`RESSOURCEN_TYP`  
`AKTUELLE_GESAMTMENGE`  
`LOG_ZEITPUNKT`

**Use-Cases**  
Diese Abfrage eignet sich für Verlaufsprotokolle, Audit-Ansichten, Monitoring und Nachverfolgung von Ressourcenänderungen. Sie beantwortet direkt: „Welche Ressource wurde wann in welchem Inventarkontext protokolliert?“


## 29. getRessourcenWithLager.sql

**Zweck**  
Dieses Skript zeigt, welche Ressourcen in welchem Lager liegen. Es ist eine direkte Lager-Ressourcen-Zuordnungsabfrage.

**SQL-Logik**  
Die Zuordnungstabelle `IST_GELAGERT_IN` wird per `JOIN` mit `RESSOURCE` verbunden. Dadurch können pro Lager die Ressourcentypen samt Menge und Mengeneinheit ausgegeben werden. Die Sortierung erfolgt nach `LAGER_ID`.

**Ergebnis**  
Das Resultat enthält:  
`LAGER_ID`  
`R_TYP`  
`MENGE`  
`MENGE_EINHEIT`

**Use-Cases**  
Diese Abfrage eignet sich für Lagerdetailseiten, Ressourcenlisten pro Lager, Logistikübersichten und Materialkontrollen. Sie beantwortet direkt: „Was liegt in welchem Lager und in welcher Menge?“


## 30. getRessourcesAtRisk.sql

**Zweck**  
Dieses Skript identifiziert Ressourcen, deren Ablaufdatum in den nächsten 30 Tagen liegt. Es ist eine Warnabfrage für zeitkritische Bestände.

**SQL-Logik**  
Die Abfrage startet in `RESSOURCE` und verbindet per `JOIN` die Lagerzuordnung aus `IST_GELAGERT_IN`. Anschließend filtert `WHERE r.ablaufdatum BETWEEN CURRENT_DATE AND DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY)` alle Ressourcen, deren Ablaufdatum zwischen heute und in 30 Tagen liegt. Durch `ORDER BY r.ablaufdatum ASC` erscheinen die am frühesten ablaufenden Bestände zuerst.

**Ergebnis**  
Das Resultat enthält:  
`ressource_id`  
`ressource_typ`  
`ablaufdatum`  
`lager_id`

**Use-Cases**  
Diese Abfrage eignet sich für Frühwarnsysteme, Bestandskontrolle, Lagerpriorisierung und operative Maßnahmen wie Umlagerung, Verbrauchsplanung oder Austausch kritischer Ressourcen. Sie beantwortet direkt: „Welche Ressourcen laufen in den nächsten 30 Tagen ab und wo lagern sie?“


## 31. getRessourcesBelowMin.sql

**Zweck**  
Dieses Skript identifiziert Ressourcen, deren aktuelle Menge unter dem definierten Mindestschwellenwert liegt. Es ist damit eine Warnabfrage für kritische Lagerbestände.

**SQL-Logik**  
Die Abfrage startet in `RESSOURCE` und verbindet diese per `INNER JOIN` mit `IST_GELAGERT_IN` und `LAGER`. Dadurch werden die Ressource selbst, ihre Lagerzuordnung und der Lagertyp in einer gemeinsamen Ergebnisliste zusammengeführt. Die Bedingung `WHERE r.menge < r.min_schwellenwert` filtert genau die Ressourcen heraus, deren aktueller Bestand unter dem festgelegten Minimalwert liegt.

**Ergebnis**  
Das Resultat enthält:  
`RESSOURCE_ID`  
`r_typ`  
`menge`  
`min_schwellenwert`  
`lagertyp`

**Use-Cases**  
Diese Abfrage eignet sich für Frühwarnsysteme, Lagerüberwachung, operative Nachbestellung und Priorisierung von Engpassressourcen. Sie beantwortet direkt: „Welche Ressourcen sind aktuell unter ihren Mindestbestand gefallen und in welchem Lagertyp befinden sie sich?“


## 32. getStorageResourceSummary.sql

**Zweck**  
Dieses Skript liefert eine aggregierte Zusammenfassung pro Lager. Es zeigt, wie viele Ressourcen dort liegen und welche Gesamtmenge, welches Gesamtgewicht und welches Gesamtvolumen im Lager vorhanden sind.

**SQL-Logik**  
Die Abfrage startet in `LAGER` und verbindet dieses per `LEFT JOIN` mit `IST_GELAGERT_IN` und `RESSOURCE`. Dadurch bleiben auch Lager ohne eingetragene Ressourcen im Ergebnis sichtbar. Mit `COUNT(r.RESSOURCE_ID)`, `SUM(r.MENGE)`, `SUM(r.GEWICHT)` und `SUM(r.VOLUMEN)` werden vier Kennzahlen pro Lager berechnet. `GROUP BY l.LAGER_ID, l.LAGERTYP` sorgt dafür, dass pro Lager genau eine aggregierte Zeile entsteht. `ORDER BY ANZAHL_RESSOURCEN DESC` sortiert die Lager nach der Zahl der enthaltenen Ressourcen.

**Ergebnis**  
Das Resultat enthält:  
`LAGER_ID`  
`LAGERTYP`  
`ANZAHL_RESSOURCEN`  
`GESAMTMENGE`  
`GESAMTGEWICHT`  
`GESAMTVOLUMEN`

**Use-Cases**  
Diese Abfrage eignet sich für Lager-Dashboards, Kapazitätsanalysen, Beladungsübersichten und Vergleich von Lagern nach Füllgrad oder physischer Belastung. Sie beantwortet direkt: „Wie stark ist jedes Lager aktuell befüllt?“


## 33. getVehiclesByStatus.sql

**Zweck**  
Dieses Skript zählt Fahrzeuge mit einem bestimmten Status. Es ist eine gefilterte Kennzahlenabfrage für Fahrzeugzustände.

**SQL-Logik**  
Die Abfrage liest aus der Tabelle `vehicles` und verwendet `WHERE status = :status`, um nur Fahrzeuge mit dem gewünschten Status zu berücksichtigen. Mit `COUNT(*)` wird die Anzahl dieser Fahrzeuge als eine einzelne Kennzahl zurückgegeben. Der Platzhalter `:status` zeigt, dass der Statuswert dynamisch aus der Anwendung übergeben wird.

**Ergebnis**  
Das Resultat enthält genau eine Spalte:  
`vehicle_count`

**Use-Cases**  
Diese Abfrage eignet sich für Dashboard-Kacheln, Statusfilter und Flottenberichte wie: „Wie viele Fahrzeuge sind aktiv?“, „Wie viele Fahrzeuge sind defekt?“ oder „Wie viele Fahrzeuge sind aktuell im Einsatz?“


## 34. updateMitarbeiterLogin.sql

**Zweck**  
Dieses Skript aktualisiert den Nachnamen eines Mitarbeiters und erzeugt gleichzeitig einen neuen Login-Namen auf Basis des Vornamens und des neuen Nachnamens. Es ist damit keine Leseabfrage, sondern eine Änderungsabfrage.

**SQL-Logik**  
Die Abfrage verwendet `UPDATE MITARBEITER m JOIN BEWOHNER b ON m.bewohner_id = b.bewohner_id`. Dadurch werden zwei logisch zusammengehörige Tabellen gleichzeitig berücksichtigt. Anschließend wird `b.Nachname = :neuer_nachname` gesetzt. Parallel dazu wird der Login mit `LOWER(CONCAT(LEFT(b.Vorname, 1), '.', :neuer_nachname))` neu aufgebaut. Das bedeutet: erster Buchstabe des Vornamens, Punkt, neuer Nachname, alles in Kleinbuchstaben. Über `WHERE b.bewohner_id = :bewohner_id` wird genau festgelegt, welcher Bewohner beziehungsweise Mitarbeiter geändert werden soll.

**Ergebnis**  
Es wird kein klassisches Resultset zurückgegeben, sondern ein bestehender Datensatz wird aktualisiert. Betroffen sind:  
`BEWOHNER.Nachname`  
`MITARBEITER.login`

**Use-Cases**  
Diese Abfrage eignet sich für Verwaltungsprozesse bei Namensänderungen, Benutzerpflege und Konsistenz zwischen Personenstammdaten und Login-Daten. Sie beantwortet operativ die Aufgabe: „Passe Namen und Login eines Mitarbeiters gemeinsam an.“


## Hinweis zu sqlOverview

Die Datei `sqlOverview` ist keine SQL-Datei, sondern eine ergänzende Textübersicht. Sie kann in der Dokumentation separat als Überblick über die vorhandenen SQL-Skripte erwähnt werden.