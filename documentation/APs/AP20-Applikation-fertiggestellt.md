# AP20 – Applikation fertiggestellt

Status: abgeschlossen

## Ziel

Die wesentlichen Implementierungen des Anforderungskatalogs wurden gemäß Lastenheft und Pflichtenheft fertiggestellt.

## Umgesetzter Stand

| Bereich | Ergebnis |
|---|---|
| Webanwendung | React-/TypeScript-Anwendung mit Dashboard und Verwaltungsseiten vorhanden |
| BP1-Applikationsbezug | Ressourcenverbrauch und Bestand gegen Mindestbestand im Dashboard, Ressourcen-/Lageransichten und Nachbestellungsseite vorhanden |
| BP1-Datenbanklogik | Queries und Stored Procedures für kritische Ressourcen und Nachschub vorhanden |
| BP1-BPMN | finales Modell v11 vorhanden |
| BP2-Datenbanklogik | Überschuss-, Bewertungs- und Verkaufstabellen, Stored Procedures und dreistufige Verkaufsansicht vorhanden |
| Backend | PHP-REST-API mit PDO, generischem Procedure-Aufruf, Session und CSRF-Schutz vorhanden |
| Dokumentation | Implementierung, Architektur und Datenbanklogik dem Projektumfang zugeordnet |

## Abgleich mit der Spezifikation

Die Anwendung bildet die wesentlichen Anforderungen des Projekts ab. BP1 ist als vollständiger Zusammenhang aus Use Case, Businessprozess, BPMN-Modell, Datenbanklogik und Applikationsbezug vorbereitet. BP2 bleibt als zweiter Businessprozess datenbankseitig, fachlich und über die Verkaufsansicht dokumentiert.

Nicht Bestandteil des finalen Kernumfangs sind eine dauerhafte Speicherung ausgelöster Nachschubaktionen, ein vollständiges Bestellwesen sowie Rechnungs-, Vertrags- oder Zahlungsfunktionen für BP2.

## Technische Abgrenzung

Die PHP-API führt im finalen Projektstand SQL-Dateien über PDO aus. Die vorhandenen Stored Procedures sind fachlich zugeordnet und dokumentiert, wurden im vereinbarten Projektumfang aber nicht mehr produktiv in die API eingebunden.

## Ergebnis

Die Applikation ist für den vereinbarten Projektumfang fertiggestellt und kann für Tests, Abschlusspräsentation und Projektdokumentation verwendet werden.

## Dauer

Dauer: projektbegleitend
