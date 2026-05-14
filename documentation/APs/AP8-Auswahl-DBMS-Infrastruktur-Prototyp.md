# Tom Coombs / CyZeTLC – Doku-Zuarbeit

# AP8 – Auswahl DBMS-Infrastruktur – Prototyp

Aufgabe laut Projektplan:
AP8: Auswahl DBMS-Infrastruktur
„Es wurde ein angemessenes DBMS ausgewählt und ggf. ein entsprechender Server aufgesetzt.“

## 1. Ziel des Arbeitspakets

In AP8 wird dokumentiert, welches DBMS für das Projekt verwendet wird, warum dieses DBMS geeignet ist und welche Server- bzw. Infrastrukturentscheidung getroffen wurde.

Diese Datei ist eine vorläufige Zuarbeit für Tom Coombs / CyZeTLC. Sie fasst zusammen, was aus dem Repository zur DBMS-Infrastruktur erkennbar ist. Unklare Punkte werden bewusst nicht erfunden, sondern als offene Ergänzungsfelder markiert.

## 2. Aktueller Stand aus dem Repository

| Bereich | Erkennbarer Stand im Repository | Bemerkung | Noch offen |
|---|---|---|---|
| Datenbankmanagementsystem | In der Spezifikation wird MariaDB als Datenbank genannt. Zusätzlich existieren SQL-Build-Dateien für MySQL und Oracle. | Der PHP-Servercode enthält eine PDO-Anbindung, die je nach Konfiguration MySQL oder Oracle verwenden kann. | Finale DBMS-Auswahl und Version durch Tom Coombs / CyZeTLC bestätigen. |
| Server / Hosting | In der Spezifikation wird ein VPS als Serverbetrieb genannt. In der WebApp sind produktionsnahe API-URLs zu einer externen Domain sichtbar. | Der genaue Servertyp und Anbieter sind im Repository nicht vollständig dokumentiert. | Hosting-Anbieter, VPS-Konfiguration und Betriebsumgebung ergänzen. |
| API-Anbindung | Eine PHP-API im Ordner `api/` ist vorhanden. Sie liefert JSON-Antworten und nutzt CSRF-Schutz. | Die API lädt SQL-Dateien und führt sie über eine serverseitige Datenbankverbindung aus. | Finale Beschreibung der API-Struktur und produktiven Pfade bestätigen. |
| WebApp-Anbindung | Die WebApp ist als React/TypeScript/Vite-Anwendung aufgebaut. Sie ruft Daten über serverseitige API-Funktionen ab. | Seiten wie Dashboard, Ressourcen, Fahrzeuge, Mitarbeitende, Städte, Bewohner und SQL-Übersicht sind im Routing erkennbar. Im aktuellen Fokus sind vor allem Ressourcen- und Lagerdaten relevant. | Bestätigen, welche Seiten für AP8 als Infrastrukturbezug genannt werden sollen. |
| SQL-Dateien | Im Ordner `sql/` sind zahlreiche SQL-Abfragen vorhanden. Zusätzlich existieren Build-Skripte und ein Ordner für Stored Procedures. | Die SQL-Dateien unterstützen viele fachliche Auswertungen. Für die aktuelle Revision stehen Ressourcen-, Lager- und Bestandsabfragen im Vordergrund. | Prüfen, welche Abfragen in der finalen Abgabe tatsächlich verwendet werden. |
| Stored Procedures | Ein Ordner `sql/storedProcedure/` ist vorhanden und enthält viele gleichnamige SQL-Dateien zu den Abfragen. | Der genaue produktive Einsatz als Stored Procedures sollte noch bestätigt werden. | Stored-Procedures-Stand und Einbindung ergänzen. |
| Zugangsdaten / Konfiguration | Eine Konfigurationsdatei für die Datenbankanbindung ist vorhanden. | Aus Sicherheitsgründen werden keine Zugangsdaten, Passwörter, Tokens oder privaten Konfigurationswerte dokumentiert. | Tom ergänzt nur allgemeine, freigabefähige Angaben. |
| Deployment / Betrieb | Die Dokumentation beschreibt lokale Entwicklung mit Vite und PHP sowie eine vorhandene Serverumgebung. | Der konkrete Deployment-Prozess ist nicht vollständig aus den gelesenen Dateien ableitbar. | Deployment-, Backup- und Betriebskonzept ergänzen. |
| Dokumentation | README, Dokumentations-README und Spezifikation beschreiben WebApp, PHP-API, SQL-Dateien und Datenbankbezug. | Die Dokumentation enthält teils unterschiedliche Hinweise zu Oracle, MySQL und MariaDB. | Finale technische Linie vereinheitlichen. |

## 3. Vorläufige Infrastrukturentscheidung

Nach aktuellem Repository-Stand deutet vieles darauf hin, dass für die finale Projektdokumentation eine MariaDB-Datenbank verwendet werden soll. Diese Aussage ergibt sich besonders aus der vorhandenen Spezifikation, in der MariaDB und ein Betrieb auf einem VPS ausdrücklich genannt werden.

Gleichzeitig zeigen andere Repository-Bestandteile, dass auch Oracle- und MySQL-Skripte vorhanden sind und die PHP-Anbindung technisch zwischen MySQL und Oracle unterscheiden kann. Deshalb sollte dieser Punkt von Tom Coombs / CyZeTLC bestätigt werden.

Vorläufig lässt sich festhalten: Die WebApp greift nicht direkt auf die Datenbank zu, sondern nutzt eine PHP-API. Die API führt SQL-Dateien serverseitig aus und gibt Ergebnisse im JSON-Format an die WebApp zurück. Diese Architektur ist für das Projekt sinnvoll, weil Frontend, API und Datenbanklogik getrennt bleiben.

Noch offen: genaue Serverkonfiguration, DBMS-Version, Hosting-Anbieter, produktiver Datenbankname und finaler Stand der Stored Procedures.

## 4. Begründung der DBMS-Auswahl

| Kriterium | Bewertung für das Projekt | Begründung | Noch zu prüfen |
|---|---|---|---|
| relationale Datenhaltung | Geeignet | Die Marskolonie nutzt viele klar strukturierte Entitäten wie Ressourcen, Lager, Städte, Fahrzeuge, Mitarbeitende und Transportwege. | Finale Modellversion und DBMS bestätigen. |
| Unterstützung strukturierter SQL-Abfragen | Geeignet | Im Repository sind zahlreiche SQL-Dateien für Auswertungen und Übersichten vorhanden. | Prüfen, welche SQL-Dateien final produktiv genutzt werden. |
| Eignung für WebApp-Anbindung | Geeignet | Die PHP-API kann Datenbankergebnisse als JSON an die WebApp liefern. | Produktive API-Konfiguration bestätigen. |
| Betrieb auf VPS möglich | Wahrscheinlich geeignet | Die Spezifikation nennt den Betrieb der Datenbank auf einem VPS. | Anbieter, Betriebssystem, Ressourcen und Absicherung ergänzen. |
| vorhandene Projektgrundlage | Geeignet | WebApp, PHP-API, SQL-Dateien, Build-Skripte und Dokumentation sind vorhanden. | Unterschiede zwischen Oracle-, MySQL- und MariaDB-Hinweisen klären. |
| Teamkenntnisse | Vermutlich geeignet | Die vorhandene Struktur nutzt klassische SQL-Dateien und PHP/PDO, was für ein Datenbankprojekt nachvollziehbar ist. | Kenntnisse und Verantwortlichkeiten im Team ergänzen. |
| Projektumfang | Geeignet | Ein relationales DBMS reicht für die zwei aktuell ausgewählten Geschäftsprozesse aus. | Prüfen, ob spätere Verkaufsfunktionen neue Tabellen benötigen. |
| Wartbarkeit | Geeignet, wenn sauber dokumentiert | Die Trennung zwischen WebApp, API und SQL-Dateien unterstützt Wartbarkeit. | Stored-Procedures-Stand und Dokumentation vereinheitlichen. |
| Erweiterbarkeit | Geeignet | Weitere Prozesse wie Verkauf, Routenoptimierung oder Prognosen können später ergänzt werden. | Notwendige Schema-Erweiterungen für spätere Phasen prüfen. |

## 5. Bezug zur WebApp

Die DBMS-Infrastruktur unterstützt die WebApp, indem sie fachliche Daten für die Geschäftsprozesse bereitstellt. Die WebApp ist damit nicht nur ein isoliertes Frontend, sondern die Oberfläche für datenbankgestützte Auswertungen und Entscheidungen.

Im Repository ist eine serverseitige PHP-API sichtbar. Die WebApp kommuniziert über diese Schnittstelle mit der Datenbanklogik. Die Daten werden im JSON-Format an die WebApp zurückgegeben und dort in Dashboard-Kacheln, Tabellen oder Übersichten dargestellt.

Erkennbar sind unter anderem WebApp-Bereiche für Dashboard, Ressourcen, Fahrzeuge, Mitarbeitende, Städte, Bewohner und SQL-Übersicht. Für die aktuelle Revision stehen davon vor allem Ressourcenübersicht, Lagerbezug und technische Nachvollziehbarkeit der verwendeten SQL-Abfragen im Vordergrund. Die übrigen Bereiche bleiben als vorhandene Projektbestandteile erhalten, werden aber nicht als Hauptprozesse betrachtet.

## 6. Bezug zu Businessprozessen

| Businessprozess | Benötigte Datenbankunterstützung | Bedeutung der DBMS-Infrastruktur |
|---|---|---|
| Kritische Ressourcen überwachen und Nachschub auslösen | Ressourcenbestände, Mindestwerte, Lagerzuordnung und Bestandsübersichten | Das DBMS stellt die Grundlage bereit, um kritische Ressourcen zu erkennen und Nachschubbedarf abzuleiten. |
| Überschüssige Ressourcen an externe Unternehmen verkaufen | Ressourcenbestände, Mindestwerte, Lagerdaten und mögliche Überschussberechnung | Die Infrastruktur kann als Grundlage für Verkaufsentscheidungen dienen; ein vollständiges Verkaufsmodul ist eine spätere Erweiterung. |

Weitere vorhandene Daten zu Missionen, Fahrzeugen, Energie, Personal, Städten und Bewohnern bleiben technisch relevant, werden in der aktuellen Revision aber nicht als Hauptprozesse ausgearbeitet.

## 7. Offene Punkte für Tom Coombs / CyZeTLC

- [ ] Exaktes verwendetes DBMS bestätigen: ______________________________
- [ ] Version des DBMS ergänzen: ______________________________
- [ ] Servertyp bestätigen: ______________________________
- [ ] Hosting / VPS-Anbieter ergänzen: ______________________________
- [ ] Datenbankname ergänzen, falls dokumentierbar: ______________________________
- [ ] Verbindung zwischen WebApp, API und Datenbank kurz bestätigen: ______________________________
- [ ] Stored-Procedures-Stand ergänzen: ______________________________
- [ ] Sicherheitsaspekte ergänzen: ______________________________
- [ ] Backup-/Betriebskonzept ergänzen, falls vorhanden: ______________________________
- [ ] Verantwortliche Person für Infrastruktur ergänzen: ______________________________

## 8. Vorläufiges Ergebnis

Für AP8 liegt eine vorläufige Dokumentation der DBMS-Infrastruktur vor. Die vorhandene Projektstruktur wurde nur lesend geprüft. Erkennbare technische Bestandteile wurden dokumentiert.

Unklare Punkte wurden bewusst offengelassen und als Ergänzungsfelder für Tom Coombs / CyZeTLC markiert. Es wurden keine geheimen Zugangsdaten, Passwörter, Tokens oder privaten Konfigurationswerte dokumentiert.

## 9. Kurzfazit

AP8 dokumentiert die technische Grundlage, auf der WebApp, SQL-Abfragen und Businessprozesse aufbauen. Die finale Fassung sollte nach Bestätigung der offenen Infrastrukturdetails durch Tom Coombs / CyZeTLC ergänzt werden.
