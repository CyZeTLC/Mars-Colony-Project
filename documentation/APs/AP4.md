# AP4 – Auswahl Case Study
## Case Study: Ares Logistik Verwaltung – Datenbankgestützte Steuerung einer Marskolonie

Die Projektgruppe legt als Case Study die **Ares Logistik Verwaltung** fest. Das Projekt bildet eine wirtschaftlich betriebene Marskolonie ab, deren Überleben und Wachstum von zuverlässig gesteuerter Logistik abhängt. Im Mittelpunkt stehen Ressourcen, Lager, Energieversorgung, Transportwege, Fahrzeuge, Raumfahrzeuge, Städte, Bewohner, Mitarbeiter und Abteilungen.

Die Anwendung soll nicht nur Daten anzeigen, sondern operative Entscheidungen unterstützen: Welche Ressourcen werden knapp? Welche Lager sind kritisch? Welche Städte sind unzureichend angebunden? Welche Fahrzeuge sind einsatzbereit? Welche Mitarbeiter und Abteilungen sind für welche Ressourcen abhängig? Welche Missionen laufen aktuell oder wurden abgeschlossen?

Damit ist die Case Study fachlich passend für ein Datenbankanwendungsprojekt, weil sie mehrere miteinander verbundene Geschäftsbereiche enthält:

| Geschäftsbereich | Bedeutung in der Marskolonie | Bezug zur aktuellen Repo |
|---|---|---|
| Ressourcenmanagement | Kontrolle von Sauerstoff, Wasser, Treibstoff, Nahrung, Ersatzteilen und Baumaterialien | `getRessourcenWithLager.sql`, `getRessourcesBelowMin.sql`, `getRessourcesAtRisk.sql`, `getRessourceLog.sql` |
| Lagerverwaltung | Überwachung von Lagerorten, Kapazitäten und kritischen Beständen | `getAllLager.sql`, `getStorageResourceSummary.sql`, `getLagerVersorgungAtRisk.sql` |
| Transportlogistik | Planung und Kontrolle von Transportwegen zwischen Städten/Sektoren | `getMissionsBericht.sql`, `getCitiesWithoutTransportConnection.sql` |
| Flottenmanagement | Kontrolle aktiver/inaktiver Fahrzeuge und Raumfahrzeuge | `getActiveVehicles.sql`, `getFlotte.sql`, `getVehiclesByStatus.sql`, `getLowTreibstoff.sql` |
| Energieversorgung | Überwachung aktueller Energieerzeugung und Versorgungslücken | `getCurrentEnergieLeistung.sql`, `getEnergySourcesByCity.sql`, `getCitiesWithoutEnergySource.sql` |
| Stadtverwaltung | Verwaltung von Städten, Koordinaten, Einwohnerzahlen und Infrastruktur | `getCitiesWithStats.sql`, `getCitiesWithKoords.sql`, `getCitiesCount.sql` |
| Bewohnerverwaltung | Verwaltung der Koloniebewohner und ihrer Zuordnung zu Städten/Adressen | `getAllCitizens.sql`, `getAllCitizensByName.sql`, `getBewohnerAtAddress.sql`, `getResidentCountByAddress.sql` |
| Personalverwaltung | Verwaltung von Mitarbeitern, Rollen, Berufen, Abteilungen und Gehältern | `getAllEmployees.sql`, `getEmployeeProfile.sql`, `getMitarbeiterRolle.sql`, `getMitarbeiterByBeruf.sql`, `getAvgWorkTimeByBeruf.sql` |
| Abteilungs- und Ressourcenabhängigkeit | Analyse, welche Abteilungen von welchen Ressourcen abhängig sind | `getDepartmentResourceDependencies.sql`, `getDepartmentsWithLeaders.sql`, `getEmployeeCountByDepartment.sql` |

## Geschäftsmodell

Die Ares Logistik Verwaltung wird als interne Plattform für eine Marskolonie verstanden. Die Kolonie funktioniert wirtschaftlich wie ein geschlossenes Versorgungssystem: Ressourcen sind begrenzt, Transporte sind teuer, Energie ist kritisch und Personal muss effizient eingesetzt werden.

Das System erzeugt wirtschaftlichen Nutzen durch:

| Wirtschaftlicher Nutzen | Erklärung |
|---|---|
| Vermeidung von Ressourcenengpässen | Kritische Mindestbestände werden erkannt, bevor Prozesse ausfallen. |
| Reduktion von Überbeständen | Lagerbestände können gezielter geplant werden, statt unnötig viel Material vorzuhalten. |
| Bessere Fahrzeugauslastung | Aktive, inaktive und betriebsbereite Fahrzeuge werden sichtbar. |
| Geringere Missionskosten | Transportwege, Treibstoffrisiken und Missionen können datenbasiert geplant werden. |
| Höhere Versorgungssicherheit | Städte ohne Energiequelle oder Transportverbindung werden erkennbar. |
| Effizientere Personalplanung | Mitarbeiter, Rollen und Abteilungen werden strukturiert verwaltet. |
| Schnellere Entscheidungen | Dashboard und SQL-Auswertungen liefern zentrale Kennzahlen direkt aus der Datenbank. |

Ökonomisch betrachtet kann die Plattform als **Logistik- und Infrastruktur-SaaS** gedacht werden. Eine reale Variante könnte an Forschungseinrichtungen, Raumfahrtunternehmen, abgelegene Industrieanlagen, Katastrophenschutzorganisationen oder autonome Versorgungssysteme verkauft werden. Das Erlösmodell könnte über monatliche Standortlizenzen, Enterprise-Verträge, Wartungspakete und Zusatzmodule für Prognosen, Reporting oder Sicherheitsanalyse funktionieren.

Für das Semesterprojekt wird dieses Geschäftsmodell simuliert. Entscheidend ist, dass die Datenbankstruktur ein wirtschaftlich sinnvolles System abbildet und die WebApp echte Geschäftsprozesse unterstützt.

## Begründung der Case-Study-Auswahl

Die Case Study ist geeignet, weil sie:

1. eine komplexe relationale Datenbank benötigt,
2. mehrere klare Businessprozesse enthält,
3. realistische wirtschaftliche Probleme abbildet,
4. gut zur vorhandenen Repo-Struktur passt,
5. mit der bestehenden WebApp weiterentwickelt werden kann,
6. viele sinnvolle SQL-Auswertungen bereits vorbereitet hat,
7. sich gut für BPMN, Lastenheft, Pflichtenheft und Projektproposal eignet.

Die bestehende alte Dokumentation hatte bereits den Grundgedanken einer Marskolonie mit Lagerbeständen, Ressourcen, Bewohnern und Tätigkeiten. Für das neue Semesterprojekt wird diese Idee deutlich erweitert: Der Fokus liegt nicht mehr nur auf einfacher Lagerverwaltung, sondern auf einer betriebswirtschaftlich relevanten Steuerungsplattform für Ressourcen, Energie, Transport, Personal und Risikoanalyse.

**Ergebnis AP4:**  
Die Gruppe entscheidet sich für die Case Study **„Ares Logistik Verwaltung – datenbankgestützte Steuerung einer Marskolonie“**.

# Use Cases zur Case Study

## Überblick

Die folgenden Use Cases leiten sich aus der Case Study und den vorhandenen SQL-Abfragen der Repo ab. Sie sind bewusst so gewählt, dass sie technisch umsetzbar, datenbanknah, wirtschaftlich sinnvoll und für das Proposal gut erklärbar sind.

## Use Case 1: Kritische Ressourcen überwachen

| Feld | Inhalt |
|---|---|
| Primärer Akteur | Logistikoffizier |
| Ziel | Kritische Ressourcen frühzeitig erkennen |
| Repo-Bezug | `getRessourcesBelowMin.sql`, `getRessourcenWithLager.sql`, `getStorageResourceSummary.sql` |
| WebApp-Bezug | `Ressources` |
| Wirtschaftlicher Nutzen | Vermeidung von Notfalllieferungen und Produktionsausfällen |

### Beschreibung

Der Logistikoffizier ruft die Ressourcenübersicht auf. Das System prüft, welche Ressourcen unter ihrem Mindestbestand liegen. Dabei werden Ressourcen mit Lagerdaten verbunden, damit sofort sichtbar ist, welcher Lagerbereich betroffen ist.

### Ablauf

1. Logistikoffizier öffnet die Seite „Ressources“.
2. System lädt Ressourcen- und Lagerdaten.
3. Datenbank prüft `menge < min_schwellenwert`.
4. Kritische Ressourcen werden angezeigt.
5. Logistikoffizier entscheidet über Nachbestellung, Umverteilung oder Priorisierung.

### Ergebnis

Das System zeigt alle Ressourcen an, deren Bestand kritisch ist. Dadurch kann die Kolonie handeln, bevor ein Prozess ausfällt.

---

## Use Case 2: Lager- und Energieversorgung bewerten

| Feld | Inhalt |
|---|---|
| Primärer Akteur | Infrastrukturmanager |
| Ziel | Lager und Energiequellen auf Risiko prüfen |
| Repo-Bezug | `getLagerVersorgungAtRisk.sql`, `getCurrentEnergieLeistung.sql`, `getEnergySourcesByCity.sql`, `getCitiesWithoutEnergySource.sql` |
| WebApp-Bezug | `Overview`, `Cities`, `Ressources` |
| Wirtschaftlicher Nutzen | Schutz kritischer Infrastruktur und Vermeidung teurer Ausfälle |

### Beschreibung

Der Infrastrukturmanager prüft, ob Lager oder Städte energetisch gefährdet sind. Das System zeigt die aktuelle Energiegesamtleistung und erkennt Energiequellen mit geringer Auslastung oder kritischer Kapazität.

### Ablauf

1. Infrastrukturmanager öffnet Dashboard oder Städteübersicht.
2. System lädt aktuelle Energieleistung.
3. Datenbank ermittelt Städte ohne Energiequelle.
4. Datenbank erkennt Energiequellen unter kritischer Kapazität.
5. Infrastrukturmanager priorisiert Wartung, Ausbau oder Umleitung.

### Ergebnis

Kritische Infrastruktur wird sichtbar. Das reduziert das Risiko, dass Lager, Städte oder Produktionsbereiche wegen Energiemangel ausfallen.

---

## Use Case 3: Fahrzeugflotte kontrollieren

| Feld | Inhalt |
|---|---|
| Primärer Akteur | Flottenmanager |
| Ziel | Einsatzbereitschaft von Fahrzeugen und Raumfahrzeugen prüfen |
| Repo-Bezug | `getActiveVehicles.sql`, `getFlotte.sql`, `getVehiclesByStatus.sql`, `getLowTreibstoff.sql` |
| WebApp-Bezug | `Vehicles` |
| Wirtschaftlicher Nutzen | bessere Fahrzeugauslastung, weniger Leerlauf, geringere Missionskosten |

### Beschreibung

Der Flottenmanager prüft, wie viele Fahrzeuge aktiv, inaktiv oder insgesamt vorhanden sind. Zusätzlich können Treibstoffrisiken ausgewertet werden.

### Ablauf

1. Flottenmanager öffnet die Fahrzeugübersicht.
2. System lädt Fahrzeug- und Raumfahrzeugdaten.
3. Datenbank fasst Statuswerte aus `FAHRZEUGE` und `RAUMFAHRZEUG` zusammen.
4. Aktive und inaktive Fahrzeuge werden gezählt.
5. Fahrzeuge mit niedrigem Treibstoff werden markiert.
6. Flottenmanager plant Wartung oder Missionseinsatz.

### Ergebnis

Die Kolonie erkennt, welche Fahrzeuge einsatzbereit sind und welche nicht. Missionen können dadurch realistischer geplant werden.

---

## Use Case 4: Missionen und Transportwege auswerten

| Feld | Inhalt |
|---|---|
| Primärer Akteur | Missionsplaner |
| Ziel | Laufende und abgeschlossene Transporte nachvollziehen |
| Repo-Bezug | `getMissionsBericht.sql`, `getCitiesWithoutTransportConnection.sql`, `getRessourceLog.sql` |
| WebApp-Bezug | `Overview`, später mögliche Seite `Missions` |
| Wirtschaftlicher Nutzen | geringere Transportkosten und bessere Versorgungssicherheit |

### Beschreibung

Der Missionsplaner benötigt eine Übersicht über Transportwege, Piloten, Fahrzeuge, Zielsektoren, Dauer und Status. Das System liefert einen Missionsbericht und erkennt Städte ohne Transportverbindung.

### Ablauf

1. Missionsplaner ruft Missionsbericht auf.
2. System lädt Transportwege mit Pilot, Fahrzeug, Stadt/Sektor, Dauer und Status.
3. Datenbank erkennt Städte ohne Transportverbindung.
4. Missionsplaner bewertet, welche Städte logistisch gefährdet sind.
5. Neue Transporte oder Infrastrukturmaßnahmen werden geplant.

### Ergebnis

Transporte werden nachvollziehbar. Städte ohne Verbindung werden erkannt. Dadurch können Versorgungslücken reduziert werden.

---

## Use Case 5: Städte und Bewohner analysieren

| Feld | Inhalt |
|---|---|
| Primärer Akteur | Kolonieverwaltung |
| Ziel | Städte, Bewohnerzahlen und Adressdaten verwalten |
| Repo-Bezug | `getCitiesWithStats.sql`, `getCitiesWithKoords.sql`, `getCitizensCount.sql`, `getAllCitizens.sql`, `getBewohnerAtAddress.sql`, `getResidentCountByAddress.sql` |
| WebApp-Bezug | `Cities`, `Citizens`, `city/:name` |
| Wirtschaftlicher Nutzen | bessere Ressourcenverteilung pro Stadt und Bevölkerungsgruppe |

### Beschreibung

Die Kolonieverwaltung benötigt eine Übersicht über Städte, Koordinaten, Einwohnerzahlen und Bewohner. Diese Daten sind wichtig, um Ressourcen, Energie und Personal passend zu verteilen.

### Ablauf

1. Verwaltung öffnet Städte- oder Bürgerseite.
2. System lädt Städte mit Koordinaten und Einwohnerstatistik.
3. System lädt Bewohnerdaten.
4. Verwaltung prüft Stadtgröße, Adressen und Bewohnerverteilung.
5. Ressourcen- und Transportplanung wird daran angepasst.

### Ergebnis

Die Kolonie erkennt, wo viele Bewohner leben und welche Städte besondere Versorgung benötigen.

---

## Use Case 6: Mitarbeiter und Abteilungen verwalten

| Feld | Inhalt |
|---|---|
| Primärer Akteur | Personalverwaltung |
| Ziel | Mitarbeiter, Rollen, Berufe und Abteilungen auswerten |
| Repo-Bezug | `getAllEmployees.sql`, `getEmployeeProfile.sql`, `getMitarbeiterRolle.sql`, `getMitarbeiterByBeruf.sql`, `getAvgWorkTimeByBeruf.sql`, `getDepartmentsWithLeaders.sql`, `getEmployeeCountByDepartment.sql` |
| WebApp-Bezug | `Employees` |
| Wirtschaftlicher Nutzen | effizientere Personalplanung und geringere Fehlbesetzung |

### Beschreibung

Die Personalverwaltung prüft Mitarbeiterdaten, Rollen, Berufe, Gehälter und Abteilungen. Dadurch kann Personal gezielter eingesetzt werden.

### Ablauf

1. Personalverwaltung öffnet die Mitarbeiterseite.
2. System lädt Mitarbeiter mit Bewohnerdaten.
3. Datenbank liefert Rollen, Berufe und Abteilungen.
4. Verwaltung erkennt Personalverteilung und mögliche Engpässe.
5. Mitarbeiter werden passend für Missionen oder Abteilungen eingeplant.

### Ergebnis

Personal wird nicht isoliert betrachtet, sondern als Teil der Kolonie-Logistik. Das erhöht Planungssicherheit und senkt Fehlbesetzungen.

---

## Use Case 7: Abteilungsabhängigkeiten von Ressourcen prüfen

| Feld | Inhalt |
|---|---|
| Primärer Akteur | Betriebsleitung |
| Ziel | Erkennen, welche Abteilungen von welchen Ressourcen abhängig sind |
| Repo-Bezug | `getDepartmentResourceDependencies.sql` |
| WebApp-Bezug | später `Departments` oder Dashboard-Erweiterung |
| Wirtschaftlicher Nutzen | bessere Priorisierung knapper Ressourcen |

### Beschreibung

Die Betriebsleitung prüft, welche Abteilungen von welchen Ressourcen abhängig sind. Ressourcen mit hoher Priorität werden zuerst abgesichert.

### Ablauf

1. Betriebsleitung öffnet Abhängigkeitsanalyse.
2. System lädt Abteilungen und zugeordnete Ressourcen.
3. Datenbank sortiert nach Abteilung, Priorität und Ressourcentyp.
4. Kritische Abhängigkeiten werden sichtbar.
5. Betriebsleitung priorisiert Ressourcenverteilung.

### Ergebnis

Knappe Ressourcen werden nicht blind verteilt, sondern nach betrieblicher Bedeutung priorisiert.

---

## Use Case 8: SQL-Auswertungen prüfen und dokumentieren

| Feld | Inhalt |
|---|---|
| Primärer Akteur | Entwickler / Prüfer / Datenbankteam |
| Ziel | SQL-Abfragen direkt nachvollziehen und testen |
| Repo-Bezug | `SqlOverview`, `get_sql_result`, `get_all_tables`, `get_sql_files`, `sql/` |
| WebApp-Bezug | `SqlOverview` |
| Wirtschaftlicher Nutzen | schnellere Fehleranalyse, bessere Wartbarkeit, geringere Entwicklungskosten |

### Beschreibung

Die SQL-Übersicht ermöglicht, vorhandene Datenbankabfragen aus dem Repository sichtbar zu machen. Dadurch können Entwickler und Prüfer nachvollziehen, welche Datenbanklogik hinter den Funktionen steckt.

### Ablauf

1. Nutzer öffnet SQL-Übersicht.
2. System listet verfügbare SQL-Dateien.
3. Nutzer wählt eine SQL-Abfrage.
4. Backend lädt die Datei aus dem `sql/`-Verzeichnis.
5. Ergebnis und SQL-Logik werden angezeigt.

### Ergebnis

Die Datenbanklogik ist transparent. Das erleichtert Prüfung, Debugging und Dokumentation.

---

# Priorisierte Auswahl für das Proposal

Für das Projektproposal sollten nicht alle Use Cases gleich stark präsentiert werden. Sinnvoll ist folgende Auswahl:

| Priorität | Use Case | Warum wichtig? |
|---:|---|---|
| 1 | Kritische Ressourcen überwachen | stärkster fachlicher und wirtschaftlicher Kern |
| 1 | Fahrzeugflotte kontrollieren | gut durch vorhandene SQL-Abfragen und WebApp abgedeckt |
| 1 | Missionen und Transportwege auswerten | verbindet Fahrzeuge, Mitarbeiter, Städte und Logistik |
| 2 | Lager- und Energieversorgung bewerten | erweitert das Projekt um Infrastruktur- und Risikoblick |
| 2 | Städte und Bewohner analysieren | wichtig für Datenbasis und Verwaltungslogik |
| 2 | Mitarbeiter und Abteilungen verwalten | wichtig für organisatorische Planung |
| 3 | Abteilungsabhängigkeiten prüfen | sehr gut als Zusatzfunktion für wirtschaftliche Priorisierung |
| 3 | SQL-Auswertungen prüfen | wichtig für technische Nachvollziehbarkeit |

# Zusammenfassung für die Dokumentation

Die Use Cases der Ares Logistik Verwaltung bilden zentrale Geschäftsprozesse einer Marskolonie ab. Im Fokus stehen Ressourcen, Lager, Energie, Fahrzeuge, Missionen, Städte, Bewohner und Mitarbeiter. Die Use Cases sind so gewählt, dass sie direkt auf vorhandene Tabellen, SQL-Abfragen und Seiten der aktuellen GitHub-Repo abbildbar sind.

Der wichtigste fachliche Schwerpunkt liegt auf der Vermeidung wirtschaftlicher Schäden durch bessere Planung. Kritische Ressourcen, Energieengpässe, inaktive Fahrzeuge, fehlende Transportverbindungen und unklare Personalzuordnung verursachen in einer Marskolonie hohe Kosten. Die WebApp reduziert diese Risiken durch strukturierte Datenbankauswertungen und macht operative Entscheidungen nachvollziehbar.