# AP12 – Spezifikation
# Lastenheft und Pflichtenheft

Projekt: Mars Logistik Verwaltung [ALS]
Version: 1.1
Stand: 14.05.2026
Praktikumsgruppe: 1

---

## 1. Zweck des Dokuments

Dieses Dokument beschreibt, welche Funktionen Mars Logistik Verwaltung [ALS] im aktuellen Projektfokus bereitstellt und wie diese Funktionen technisch unterstützt werden.

Das Lastenheft beschreibt die Anforderungen aus Sicht der Kolonieleitung.

Das Pflichtenheft beschreibt die technische Umsetzung mit den bereits vorhandenen und weiterentwickelten Bestandteilen aus Web-App, PHP-API, MariaDB, SQL-Dateien und Stored Procedures.

Die Spezifikation wurde nach dem Feedback von Prof. Dr. Becking enger gefasst. Ziel ist es nicht mehr, möglichst viele Geschäftsbereiche der Marskolonie gleichzeitig abzubilden. Stattdessen werden die vorhandenen technischen Funktionen den zwei ausgewählten Businessprozessen zugeordnet und deren wirtschaftlicher Nutzen sichtbar gemacht.

---

## 2. Projektkontext

Mars Logistik Verwaltung [ALS] ist ein datenbankgestütztes Verwaltungssystem für die Logistik einer Marskolonie.

Im aktuellen Projektstand konzentriert sich die Anwendung auf Ressourcen und Lagerbestände. Die Kolonieleitung soll erkennen können, welche Ressourcen kritisch werden, wo Nachschubbedarf entsteht und welche Ressourcenüberschüsse wirtschaftlich genutzt werden könnten.

Weitere Bereiche wie Transport, Energieversorgung, Städte, Bewohner, Fahrzeuge und Personal sind im Repository teilweise vorhanden. Sie bleiben als technische und fachliche Grundlage erhalten, gehören aber nach der zweiten Revision nicht mehr zum Hauptfokus der Spezifikation.

Das Projekt basiert auf folgenden vorhandenen Bestandteilen:

| Bestandteil | Status |
|---|---|
| Web-App | vorhanden |
| PHP-API | vorhanden |
| SQL-Dateien | vorhanden |
| Stored Procedures | vorhanden / weiter ausbaubar |
| MariaDB-Datenbank | vorhanden |
| Businessprozesse | auf zwei Hauptprozesse reduziert |
| BPMN-Modelle | passend zu den zwei Hauptprozessen zu erstellen |
| Dokumentation | vorhanden und nach Feedback überarbeitet |

---

## 3. Festgelegte Businessprozesse

Nach dem zweiten Gespräch mit Prof. Dr. Becking wurden die ursprünglich breiter gefassten Prozesse auf zwei Hauptprozesse reduziert.

| Nr. | Businessprozess | Ziel |
|---:|---|---|
| 1 | Kritische Ressourcen überwachen und Nachschub auslösen | Versorgungsengpässe früh erkennen und Nachschubmaßnahmen fachlich vorbereiten. |
| 6 | Überschüssige Ressourcen an externe Unternehmen verkaufen | Ressourcenüberschüsse erkennen, wirtschaftlich bewerten und eine externe Abgabe vorbereiten. |

Die früher betrachteten Prozesse zu Transport, Energie, riskanten Lagerbeständen und Personal bleiben mögliche Erweiterungen. Sie werden in dieser Version aber nicht als Hauptprozesse spezifiziert.

---

## 4. Lastenheft

Das Lastenheft beschreibt die Anforderungen aus Sicht der Kolonieleitung.

Prioritätsskala:

| Priorität | Bedeutung |
|---:|---|
| 1 | Muss-Anforderung |
| 2 | Wichtige Anforderung |
| 3 | Optionale Erweiterung |

---

### 4.1 Funktionale Anforderungen

| ID | Businessprozess | Anforderung | Priorität | Status |
|---|---|---|---:|---|
| LH-01 | Kritische Ressourcen überwachen und Nachschub auslösen | Das System soll Ressourcen anzeigen, die unter dem Mindestbestand liegen. | 1 | vorhandene SQL-/DB-Grundlage |
| LH-02 | Kritische Ressourcen überwachen und Nachschub auslösen | Das System soll Ressourcen mit Menge, Einheit und Lagerinformationen anzeigen. | 1 | vorhandene SQL-/DB-Grundlage |
| LH-03 | Kritische Ressourcen überwachen und Nachschub auslösen | Das System soll Nachschubbedarf fachlich erkennbar machen. | 1 | aus vorhandenen Ressourcen- und Lagerdaten ableitbar |
| LH-04 | Überschüssige Ressourcen an externe Unternehmen verkaufen | Das System soll Ressourcenüberschüsse aus Bestand, Mindestbestand und Lagerdaten ableitbar machen. | 2 | aus vorhandenen Ressourcenabfragen ableitbar |
| LH-05 | Überschüssige Ressourcen an externe Unternehmen verkaufen | Das System soll vorhandene Ressourcenübersichten als Grundlage für Verkaufsentscheidungen bereitstellen. | 2 | vorhandene SQL-/DB-Grundlage |
| LH-06 | Überschüssige Ressourcen an externe Unternehmen verkaufen | Das System soll eine mögliche externe Abgabe fachlich vorbereiten können. | 3 | Erweiterung / wirtschaftlicher Ausbau |
| LH-07 | Übergreifend | Das System soll eine Weboberfläche mit Dashboard und Tabellenansichten bereitstellen. | 1 | vorhanden |
| LH-08 | Übergreifend | Das System soll Daten über eine PHP-API im JSON-Format bereitstellen. | 1 | vorhanden |
| LH-09 | Übergreifend | Die vorhandenen Datenbankabfragen und Stored Procedures sollen den zwei Hauptprozessen eindeutig zugeordnet sein. | 1 | zu dokumentieren und zu optimieren |

---

### 4.2 Nicht-funktionale Anforderungen

Die nicht-funktionalen Anforderungen beschreiben die Qualitätsmerkmale des Systems. Sie legen fest, wie zuverlässig, nachvollziehbar, bedienbar und wartbar die Anwendung umgesetzt werden soll.

| ID | Anforderung | Priorität | Status |
|---|---|---:|---|
| NFA-01 | Die Weboberfläche soll übersichtlich, konsistent und für eine Präsentation gut demonstrierbar sein. | 1 | vorhanden |
| NFA-02 | Die Anwendung soll fachliche Ergebnisse nachvollziehbar darstellen, damit Ressourcen-, Nachschub- und Verkaufsentscheidungen begründet werden können. | 1 | zu optimieren |
| NFA-03 | Fehlerfälle sollen verständlich angezeigt werden, zum Beispiel bei fehlgeschlagenen Datenbankabfragen, ungültigen Eingaben oder nicht verfügbaren API-Daten. | 2 | teilweise vorhanden |
| NFA-04 | Der Datenaustausch zwischen Web-App und API soll in einem einheitlichen JSON-Format erfolgen. | 1 | vorhanden |
| NFA-05 | Der Zugriff auf Daten soll ausschließlich über die PHP-API erfolgen, damit die Weboberfläche nicht direkt auf die Datenbank zugreift. | 1 | vorhanden |
| NFA-06 | Die vorhandene Datenbanklogik soll so eingebunden und dokumentiert sein, dass SQL-Dateien, Stored Procedures, Web-App und die zwei Hauptprozesse fachlich zusammenpassen. | 1 | zu dokumentieren |
| NFA-07 | Die Anwendung soll ohne besondere lokale Einrichtung über die bestehende Serverumgebung demonstrierbar sein. | 2 | vorhanden |
| NFA-08 | Die Darstellung der Systemfunktionen soll den wirtschaftlichen Nutzen der zwei Hauptprozesse sichtbar machen, insbesondere durch Warnungen, Übersichten und Entscheidungsgrundlagen. | 2 | zu optimieren |
| NFA-09 | Die Struktur der Anwendung soll wartbar bleiben, indem Weboberfläche, PHP-API und Datenbanklogik klar voneinander getrennt sind. | 2 | teilweise vorhanden |

#### Technische Rahmenbedingungen

| Bereich | Festlegung |
|---|---|
| Datenbank | Die Anwendung nutzt eine MariaDB-Datenbank. |
| Serverbetrieb | Die Datenbank wird auf einem Virtual Private Server (VPS) betrieben. Ein VPS ist ein virtueller privater Server im Internet. |
| Datenzugriff | Die Web-App greift nicht direkt auf die Datenbank zu, sondern nutzt die vorhandene PHP-API. |
| Datenbanklogik | Vorhandene SQL-Dateien und Stored Procedures werden weiterverwendet und den zwei Hauptprozessen zugeordnet. |

---

## 5. Pflichtenheft

Das Pflichtenheft beschreibt die technische Umsetzung aus Sicht des Projektteams.

PT = Personentag
Restaufwand = geschätzter Aufwand ab aktuellem Projektstand

| ID | Bezug | Technische Umsetzung | Vorhandener Repo-/DB-Bezug | Restaufwand |
|---|---|---|---|---:|
| PH-01 | LH-01, LH-02, LH-03 | Die vorhandenen Ressourcenabfragen und passenden Datenbankfunktionen werden für Ressourcenwarnung, Lagerübersicht und Nachschubbedarf genutzt. | `sql/queries/bp1/getRessourcesBelowMin.sql`, `sql/queries/bp1/getRessourcesAtRisk.sql`, `sql/queries/bp1/getNachschubanforderungen.sql`, `sql/queries/shared/getRessourcenWithLager.sql`, `sql/queries/shared/getStorageResourceSummary.sql` | 1 PT |
| PH-02 | LH-04, LH-05, LH-06 | Verkaufsentscheidungen werden aus Ressourcenbestand, Sicherheitsreserve, Überschussbewertung und vorbereiteten Verkaufspositionen abgeleitet. Dadurch wird sichtbar, welche Ressourcen wirtschaftlich verwertet werden könnten. | `sql/queries/bp2/getRessourcenUeberschuss.sql`, `sql/queries/bp2/getVerkaufspotenzial.sql`, `sql/queries/bp2/getExterneAbgabeVorbereitung.sql`, Verkaufstabellen | 1 PT |
| PH-03 | LH-07 | Die vorhandene Web-App wird als zentrale Oberfläche für Dashboard, Tabellenansichten und Prozessdarstellung genutzt. | React, TypeScript, Vite, Tailwind CSS | 1 PT |
| PH-04 | LH-08 | Die vorhandene PHP-API stellt Datenbankergebnisse für die Web-App bereit. | PHP-API, JSON, CSRF-Token | 1 PT |
| PH-05 | LH-09, NFA-06 | Die vorhandenen SQL-Dateien und Stored Procedures werden den zwei Hauptprozessen zugeordnet und dokumentiert. | SQL-Dateien / Stored Procedures / Doku / BPMN-Bezug | 1 PT |
| PH-06 | NFA-02, NFA-06, NFA-08 | Die vorhandene Datenbanklogik wird fachlich optimiert und in Web-App, BPMN-Modellen und Präsentation als wirtschaftlich nutzbare Prozessunterstützung sichtbar gemacht. | MariaDB / SQL-Dateien / Stored Procedures / PHP-API | 1 PT |

Geschätzter Restaufwand: 6 Personentage

---

## 6. Zuordnung: Businessprozess zu vorhandenen Datenbankfunktionen

| Businessprozess | Vorhandene SQL-Dateien / Datenbanklogik | Zweck |
|---|---|---|
| Kritische Ressourcen überwachen und Nachschub auslösen | `sql/queries/bp1/getRessourcesBelowMin.sql`, `sql/queries/bp1/getRessourcesAtRisk.sql`, `sql/queries/bp1/getNachschubanforderungen.sql`, `sql/queries/shared/getRessourcenWithLager.sql`, `sql/queries/shared/getStorageResourceSummary.sql` | Erkennt Ressourcen unter Mindestbestand, bewertet Ablaufdaten, berechnet Nachschubmengen und zeigt Ressourcen mit Lagerinformationen. |
| Überschüssige Ressourcen an externe Unternehmen verkaufen | `sql/queries/bp2/getRessourcenUeberschuss.sql`, `sql/queries/bp2/getVerkaufspotenzial.sql`, `sql/queries/bp2/getExterneAbgabeVorbereitung.sql`, `RESSOURCEN_UEBERSCHUSS_BEWERTUNG`, `RESSOURCEN_VERKAUF`, `RESSOURCEN_VERKAUF_POSITION` | Erkennt Überschüsse, bewertet Verkaufspotenzial und zeigt vorbereitete externe Abgaben mit Unternehmen, Mengen und Werten. |

---

## 7. Wirtschaftlicher Nutzen der Businessprozesse

| Businessprozess | Wirtschaftlicher Nutzen |
|---|---|
| Kritische Ressourcen überwachen und Nachschub auslösen | Verhindert teure Notfallmaßnahmen und Ausfälle lebenswichtiger Ressourcen. |
| Überschüssige Ressourcen an externe Unternehmen verkaufen | Macht Überschüsse wirtschaftlich nutzbar, reduziert Lagerkosten und erzeugt zusätzliche Einnahmen. |

---

## 8. Minimaler Kernumfang

Damit der Projektumfang realistisch bleibt, wird der sichere Kernumfang auf vorhandene und bereits vorbereitete Funktionen konzentriert.

| Kernfunktion | Status |
|---|---|
| Ressourcenübersicht | vorhanden / SQL-Grundlage vorhanden |
| Kritische Ressourcen unter Mindestbestand | vorhanden / SQL-Grundlage vorhanden |
| Lager- und Ressourcenbezug | vorhanden / SQL-Grundlage vorhanden |
| Ableitung von Nachschubbedarf | über Stored Procedure vorbereitet |
| Ableitung möglicher Ressourcenüberschüsse | über Stored Procedure vorbereitet |
| Vorbereitung wirtschaftlicher Verkaufsentscheidungen | über Stored Procedure und Verkaufstabellen vorbereitet |
| Web-App-Darstellung | vorhanden |
| PHP-API-Anbindung | vorhanden |
| SQL-Dateien / Stored Procedures | BP1- und BP2-Procedures vorhanden / weiter zu optimieren |
| Zuordnung zu den zwei Hauptprozessen | zu dokumentieren |
| BPMN-Modelle | passend zu erstellen |

---

## 9. Erweiterungsumfang

Diese Punkte sind sinnvoll, aber nicht zwingend für die aktuelle Version.

| Erweiterung | Nutzen |
|---|---|
| Vollständiges Verkaufsmodul | macht Ressourcenüberschüsse direkt abrechenbar |
| Neue Verkaufstabellen | ermöglicht saubere Dokumentation externer Verkäufe |
| Automatische Nachschubbestellung | kann Nachschubmaßnahmen stärker automatisieren |
| Erweiterte Dashboard-Kennzahlen | macht wirtschaftlichen Nutzen besser sichtbar |
| Optimierte Stored-Procedures-Struktur | verbessert Wartbarkeit und Präsentierbarkeit |
| Transport- und Missionsplanung | kann später wieder als eigener Businessprozess ergänzt werden |
| Energie- und Personalplanung | bleibt fachlich sinnvoll, ist aber nicht Teil des aktuellen Kernumfangs |
| Echtzeit-Sensorik | langfristiger Ausbau, keine reale Hardware vorhanden |

---

## 10. Technologie

| Bereich | Umsetzung |
|---|---|
| Frontend | React |
| Sprache | TypeScript |
| Build Tool / Entwicklungsserver | Vite |
| Styling | Tailwind CSS |
| Backend / API | PHP-API |
| Datenbank | MariaDB |
| Datenbanklogik | vorhandene SQL-Dateien und Stored Procedures |
| Datenaustausch | JSON |
| Sicherheit | CSRF-Token für API-Anfragen |

---

## 11. Abgrenzung

| Nicht im Kernumfang | Grund |
|---|---|
| Neues Oracle-Schema | Nicht notwendig, da bereits eine MariaDB-Datenbank eingerichtet ist. |
| PL/SQL | Nicht passend, da PL/SQL Oracle-spezifisch ist. |
| Komplett neue Datenbankstruktur | Nicht notwendig, weil bereits eine technische Grundlage vorhanden ist. |
| Vollständiges Zahlungssystem | Verkauf wird zunächst wirtschaftlich vorbereitet, aber nicht vollständig abgerechnet. |
| Transportmissionen planen und auswerten | Fachlich interessant, aber nach Feedback nicht Teil der zwei Hauptprozesse. |
| Energieengpässe erkennen und Lastverteilung einleiten | Mögliche spätere Erweiterung, aber nicht aktueller Fokus. |
| Personal- und Arbeitseinsätze planen | Gehört nicht direkt zur Ressourcenüberwachung oder zum Ressourcenverkauf. |
| Vollständiges Rollen- und Rechtesystem | Für Version 1.1 nicht zwingend erforderlich. |
| Echtzeit-Sensorik | Keine reale Sensorhardware vorhanden. |

---

## 12. Abnahmekriterien

| ID | Kriterium |
|---|---|
| AK-01 | Kritische Ressourcen unter Mindestbestand werden angezeigt oder über vorhandene Abfragen nachweisbar. |
| AK-02 | Ressourcen mit Lagerinformationen werden angezeigt oder über vorhandene Abfragen nachweisbar. |
| AK-03 | Nachschubbedarf kann aus Ressourcenbestand, Mindestbestand, Ablaufstatus und Lagerdaten über `sql/queries/bp1/getNachschubanforderungen` fachlich abgeleitet werden. |
| AK-04 | Ressourcenübersichten und Verkaufspotenzial können über `sql/queries/bp2/getRessourcenUeberschuss` und `sql/queries/bp2/getVerkaufspotenzial` als Grundlage für Verkaufsentscheidungen genutzt werden. |
| AK-05 | Mögliche Ressourcenüberschüsse können aus Bestand, Mindestreserve, Lagerdaten und vorhandenen Überschussbewertungen fachlich abgeleitet werden. |
| AK-06 | Die Web-App ist lauffähig und demonstrierbar. |
| AK-07 | Die PHP-API liefert Daten im JSON-Format. |
| AK-08 | Die vorhandenen SQL-Dateien und Stored Procedures sind den zwei Hauptprozessen zugeordnet. |
| AK-09 | Der wirtschaftliche Nutzen der zwei Hauptprozesse ist in Dokumentation und Präsentation nachvollziehbar. |
| AK-10 | Die Umsetzung kann im Abschluss mit Lastenheft und Pflichtenheft abgeglichen werden. |

---

## 13. Aufwandsschätzung für AP12

| Aufgabe | Aufwand |
|---|---:|
| Vorhandene Funktionen prüfen | 0,5 PT |
| SQL-Dateien und Stored Procedures den zwei Hauptprozessen zuordnen | 0,5 PT |
| Lastenheft aus vorhandenem und überarbeitetem Projektstand ableiten | 0,5 PT |
| Pflichtenheft aus vorhandenem und überarbeitetem Projektstand ableiten | 0,5 PT |
| Wirtschaftlichen Nutzen je Hauptprozess ergänzen | 0,5 PT |
| Technologie und Abgrenzung ergänzen | 0,5 PT |
| Kontrolle und Formatierung | 0,5 PT |

Gesamtaufwand AP12: 3,5 Personentage

---

## 14. Kurzfazit

Mars Logistik Verwaltung [ALS] unterstützt im aktuellen Projektfokus zwei festgelegte Businessprozesse: kritische Ressourcen überwachen und Nachschub auslösen sowie überschüssige Ressourcen an externe Unternehmen verkaufen.

Die Spezifikation wurde nicht auf einer leeren Planung aufgebaut, sondern aus dem bereits vorhandenen und überarbeiteten Projektstand weiterentwickelt. Vorhanden sind eine Web-App, eine PHP-API, SQL-Abfragen, Stored Procedures, Datenbankstrukturen, technische Dokumentation und eine MariaDB-Datenbank.

Der Schwerpunkt liegt nicht darin, alle vorhandenen Projektbereiche gleich stark umzusetzen. Stattdessen werden die bestehenden Ressourcen- und Lagerdaten gezielt genutzt, um Engpässe früher sichtbar zu machen und Ressourcenüberschüsse wirtschaftlich bewerten zu können.

Dadurch wird Mars Logistik Verwaltung [ALS] zu einem nachvollziehbaren System, das Ressourcenengpässe erkennt, Nachschubbedarf vorbereitet und überschüssige Ressourcen wirtschaftlich nutzbar macht.
