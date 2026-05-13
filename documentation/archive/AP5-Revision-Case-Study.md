# AP5 – Revision Case Study
## Überarbeitete und verfeinerte Case Study

Die ursprüngliche Case Study aus dem vorherigen Semester beschrieb bereits eine Marskolonie, deren Lagerbestände und Ressourcen verwaltet werden müssen. Diese Grundlage wird beibehalten, aber fachlich deutlich erweitert und stärker an der aktuellen GitHub-Repo ausgerichtet.

Die neue Case Study betrachtet die Marskolonie als wirtschaftlich betriebenes Versorgungssystem. Der zentrale Gedanke ist: Auf dem Mars entstehen Kosten nicht nur durch Einkaufspreise, sondern vor allem durch Fehlplanung. Ein fehlendes Ersatzteil, ein leerer Treibstoffbestand, eine nicht angebundene Stadt oder ein inaktives Fahrzeug kann ganze Produktions- und Versorgungsketten stoppen.

Deshalb wird die Ares Logistik Verwaltung als datenbankgestützte Entscheidungsplattform definiert.

## Verbesserte Problemstellung

Die Marskolonie besitzt mehrere Städte, Lager, Energiequellen, Fahrzeuge, Raumfahrzeuge, Transportwege, Bewohner, Mitarbeiter und Abteilungen. Diese Bereiche sind voneinander abhängig. Wenn beispielsweise eine Stadt keine Energiequelle besitzt, ein Lager unter Mindestbestand fällt oder ein Fahrzeug nicht einsatzbereit ist, entstehen operative Risiken.

Ohne zentrales System treten folgende Probleme auf:

| Problem | Folge |
|---|---|
| Ressourcenbestände sind nicht aktuell sichtbar | Engpässe werden zu spät erkannt |
| Lagerorte sind nicht eindeutig mit Ressourcen verknüpft | Such- und Transportaufwand steigt |
| Fahrzeuge und Raumfahrzeuge werden nicht zentral überwacht | Missionen werden falsch geplant |
| Städte ohne Transportanbindung bleiben unentdeckt | Versorgungslücken entstehen |
| Energiequellen werden nicht überwacht | kritische Infrastruktur fällt aus |
| Mitarbeiterrollen sind nicht klar abrufbar | Personal wird ineffizient eingesetzt |
| Abteilungen kennen ihre Ressourcenabhängigkeiten nicht | Produktions- und Wartungsprozesse werden instabil |

Im wirtschaftlichen Kontext bedeutet das: Fehlende Transparenz erzeugt Kosten. Das System soll diese Kosten reduzieren, indem es operative Daten zentral auswertet.

## Verbesserte Zielsetzung

Ziel ist die Entwicklung einer Webanwendung, die zentrale Logistik- und Verwaltungsdaten der Marskolonie über eine Datenbank auswertet und für verschiedene Rollen nutzbar macht.

Die Anwendung soll:

1. zentrale Kolonie-Kennzahlen im Dashboard anzeigen,
2. Ressourcenbestände und kritische Mindestwerte überwachen,
3. Lager und Energieversorgung analysieren,
4. aktive und inaktive Fahrzeuge auswerten,
5. Missionen und Transportwege nachvollziehbar machen,
6. Städte ohne Energie- oder Transportanbindung erkennen,
7. Bewohner und Mitarbeiter strukturiert anzeigen,
8. Abteilungen und deren Ressourcenabhängigkeiten sichtbar machen,
9. SQL-Abfragen und Datenbanklogik nachvollziehbar dokumentieren,
10. später über Stored Procedures sauber an die Datenbank angebunden werden.

## Realitätsbezug

Auch wenn die Marskolonie fiktiv ist, sind die zugrunde liegenden Geschäftsprozesse realistisch. Vergleichbare Probleme existieren in:

| Reales Umfeld | Vergleichbares Problem |
|---|---|
| Raumfahrtmissionen | begrenzte Ressourcen, hohe Transportkosten, Ausfallrisiko |
| Forschungsstationen | isolierte Standorte, geplante Versorgung, Energieabhängigkeit |
| Katastrophenschutz | schnelle Ressourcenverteilung unter Unsicherheit |
| Industrieanlagen | Lagerbestände, Wartung, Personal, Infrastruktur |
| Militärische Außenposten | Versorgung, Transport, Energie, Risikomanagement |
| Krankenhäuser | kritische Vorräte, Personalplanung, Notfalllogistik |

Dadurch wirkt die Case Study nicht wie reine Science-Fiction, sondern wie ein abstrahiertes Logistik- und Infrastrukturproblem.

## Monetarisierung und wirtschaftlicher Mehrwert

Die Anwendung kann als Produktidee verstanden werden, die auf geschlossene Versorgungssysteme übertragbar ist.

Mögliche Einnahmequellen:

| Einnahmequelle | Beschreibung |
|---|---|
| SaaS-Abo | monatliche Nutzung pro Standort, Station oder Kolonie |
| Enterprise-Lizenz | Verkauf einer eigenen Installation für große Organisationen |
| Wartungsvertrag | laufende Einnahmen durch Updates, Monitoring und Support |
| Zusatzmodule | Prognosen, Risikoanalyse, Reporting, Exportfunktionen |
| Consulting | Einrichtung und Anpassung an konkrete Organisationen |
| Schulung | Training für Logistik- und Verwaltungspersonal |

Der ökonomische Kern ist nicht „schöne Datenanzeige“, sondern **Kostenvermeidung durch bessere Planung**.

Beispiele:

| Systemfunktion | Wirtschaftlicher Effekt |
|---|---|
| Mindestbestand-Warnung | weniger Notfalllieferungen |
| Fahrzeugstatus | weniger Leerlauf und bessere Missionsplanung |
| Energieauswertung | geringeres Risiko von Infrastrukturausfällen |
| Transportlücken | gezielte Investition in Verbindungswege |
| Mitarbeiterübersicht | effizientere Personalverteilung |
| Abteilungsabhängigkeiten | bessere Priorisierung kritischer Ressourcen |

## Abgrenzung

Die Case Study wird bewusst auf ein realistisches Semesterprojekt begrenzt.

Nicht im Muss-Umfang enthalten:

1. echte Zahlungsabwicklung,
2. vollständige KI-Prognosen,
3. echte Live-Sensordaten,
4. produktives Raumfahrt-Sicherheitssystem,
5. vollständige Rollen- und Rechteverwaltung,
6. komplexe Optimierungsalgorithmen für alle Transporte.

Diese Funktionen können als Ausblick genannt werden, gehören aber nicht zum notwendigen Kern.

## Überarbeitete Kurzfassung für Projektbericht

Die **Ares Logistik Verwaltung** ist eine datenbankgestützte Webanwendung zur operativen Steuerung einer simulierten Marskolonie. Die Kolonie besteht aus mehreren Städten, Bewohnern, Mitarbeitern, Lagern, Ressourcen, Energiequellen, Fahrzeugen und Transportwegen. Ziel des Systems ist es, kritische Versorgungsdaten zentral auszuwerten und wirtschaftliche Fehlplanungen zu reduzieren.

Im Mittelpunkt stehen Geschäftsprozesse wie Ressourcenüberwachung, Lagerkontrolle, Fahrzeugverwaltung, Missionsauswertung, Energieanalyse und Personalverwaltung. Die Anwendung unterstützt dadurch Entscheidungen, die in einem geschlossenen Versorgungssystem direkt wirtschaftliche Auswirkungen haben: Engpässe werden früher erkannt, Fahrzeuge besser ausgelastet, Transportlücken sichtbar gemacht und Personal gezielter eingesetzt.

Die vorhandene GitHub-Repo bildet dafür bereits eine geeignete technische Grundlage. Sie enthält eine React/TypeScript-WebApp, eine PHP-API, SQL-Abfragen, Datenbankmodelle und eine Dokumentationsstruktur. Die Case Study wird deshalb nicht neu erfunden, sondern auf Basis des vorhandenen Systems erweitert und fachlich geschärft.

**Ergebnis AP5:**  
Die alte Case Study wurde überprüft, erweitert und auf die aktuelle Repo-Struktur sowie auf wirtschaftlich relevante Geschäftsprozesse ausgerichtet.

 