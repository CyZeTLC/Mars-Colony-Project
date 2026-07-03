# AP13 – Proposal Ausgearbeitet

> Einordnung: Dieses Dokument hält den Stand der Proposal-Phase fest. Für die Abschlusspräsentation wurde später gemäß Gesprächsprotokoll 04 BP1 als durchgehendes Beispiel priorisiert; der aktuelle technische Stand ist in `documentation/README.md` zusammengefasst.

Status: ausgearbeitet / vortragsfähig

Projekt: Mars Logistik Verwaltung [ALS]  
Praktikumsgruppe: 1  
Betreuer: Prof. Dr. Dominic Becking  
Stand: 14.05.2026

---

## 1. Ziel des Projektproposals

Dieses Dokument bereitet das Projektproposal für die Mars Logistik Verwaltung [ALS] ausformuliert vor.

Das Proposal soll in etwa 15 Minuten zeigen, was im Projekt umgesetzt werden soll, warum der Projektumfang reduziert wurde und wie Case Study, Businessprozesse, Use Cases, BPMN, Datenbank, Spezifikation und Implementierung zusammenpassen.

Es ist kein Abschlussbericht, sondern ein klarer Zwischenstand mit Plan für die weitere Umsetzung.

---

## 2. Projektidee

Mars Logistik Verwaltung [ALS] ist ein datenbankgestütztes Verwaltungssystem für eine simulierte Marskolonie.

Die Kolonie ist auf stabile Ressourcenversorgung angewiesen. Kritische Ressourcen wie Sauerstoff, Wasser, Nahrung, Ersatzteile oder technische Materialien müssen rechtzeitig erkannt werden, bevor sie zu einem Risiko für Betrieb und Überleben der Kolonie werden.

Gleichzeitig können Ressourcenüberschüsse entstehen. Diese Überschüsse sollen nicht unkontrolliert gelagert werden, sondern wirtschaftlich bewertet und für eine externe Abgabe vorbereitet werden.

Der fachliche Kern des Projekts lautet deshalb:

**Ressourcen erkennen, bewerten, absichern und wirtschaftlich nutzen.**

---

## 3. Anlass der Reduktion

Die ursprüngliche Case Study war breiter angelegt und enthielt viele mögliche Geschäftsbereiche der Marskolonie, zum Beispiel Transport, Energie, Personal, Städte, Bewohner, Fahrzeuge und Lagerverwaltung.

Nach dem zweiten Gespräch mit Prof. Dr. Becking wurde der Projektumfang bewusst reduziert. Das Projekt soll nicht zu viele Geschäftsprozesse gleichzeitig behandeln, sondern zwei zentrale Prozesse sauber ausarbeiten.

Diese Reduktion verbessert:

| Punkt | Wirkung |
|---|---|
| Fachlicher Fokus | Die Dokumentation bleibt klar und nachvollziehbar. |
| BPMN-Modellierung | Die Prozesse können genauer und sauberer modelliert werden. |
| Datenbankbezug | Die vorhandenen Tabellen werden gezielter genutzt. |
| Implementierung | Die Webanwendung bleibt realistisch umsetzbar. |
| Präsentation | Der rote Faden ist leichter erklärbar. |

---

## 4. Ausgewählte Businessprozesse

| Nr. | Businessprozess | Ziel | Warum ausgewählt? |
|---:|---|---|---|
| 1 | Kritische Ressourcen überwachen und Nachschub auslösen | Kritische Bestände erkennen und Nachschubbedarf fachlich vorbereiten. | Der Prozess passt direkt zur Kernidee einer Marskolonie, weil Versorgungssicherheit überlebenswichtig ist. |
| 6 | Überschüssige Ressourcen an externe Unternehmen verkaufen | Ressourcenüberschüsse erkennen, bewerten und eine externe Abgabe vorbereiten. | Der Prozess ergänzt den Sicherheitsfokus um wirtschaftlichen Nutzen und nutzt vorhandene Ressourcen- und Lagerdaten. |

Beide Prozesse basieren auf demselben fachlichen Kern: Ressourcenbestände, Mindestwerte, Lagerbezug und Bewertung von Mengen.

---

## 5. Abgrenzung

Nicht im aktuellen Hauptfokus stehen:

| Bereich | Grund |
|---|---|
| Transportmissionen | Fachlich sinnvoll, aber zu groß als zusätzlicher Hauptprozess. |
| Energieversorgung | Bleibt mögliche Erweiterung, gehört aber nicht zum aktuellen Zwei-Prozess-Fokus. |
| Personalplanung | Unterstützt Betriebsabläufe, ist aber nicht Kern der Ressourcenentscheidung. |
| Städte und Bewohner | Wichtige Stammdaten, aber kein Haupt-Use-Case der aktuellen Revision. |
| Vollständiges Verkaufsmodul | Rechnung, Zahlung, Vertrag und Buchhaltung wären ein eigenes Modul. |
| Automatische Nachschubbestellung | Der Nachschubbedarf wird vorbereitet, aber nicht vollständig automatisiert. |

Diese Abgrenzung ist bewusst gewählt, damit das Projekt realistisch, demonstrierbar und bewertbar bleibt.

---

## 6. Use Cases

Die Use Cases wurden aus den zwei ausgewählten Businessprozessen abgeleitet.

| Nr. | Use Case | Businessprozess | Datenbedarf | Priorität |
|---:|---|---|---|---|
| 1 | Ressourcenbestand anzeigen | Kritische Ressourcen überwachen und Nachschub auslösen | Ressource, Menge, Einheit, Lagerbezug | Hoch |
| 2 | Kritische Ressourcen anzeigen | Kritische Ressourcen überwachen und Nachschub auslösen | Menge, Mindestbestand, Lagerdaten | Hoch |
| 3 | Nachschubbedarf erkennen | Kritische Ressourcen überwachen und Nachschub auslösen | Fehlmenge, Mindestwert, verfügbare Lagerbestände | Hoch |
| 4 | Überschüssige Ressourcen anzeigen | Überschüssige Ressourcen an externe Unternehmen verkaufen | aktuelle Menge, Mindestreserve, Lagerbezug | Hoch |
| 5 | Verkaufspotenzial bewerten | Überschüssige Ressourcen an externe Unternehmen verkaufen | verkaufbare Menge, Ressourcentyp, Begründung | Mittel |
| 6 | Externe Abgabe vorbereiten | Überschüssige Ressourcen an externe Unternehmen verkaufen | Unternehmen, Verkaufspositionen, Gesamtwert | Mittel |

SQL-Abfragen und Stored Procedures sind dabei keine eigenen Use Cases, sondern technische Unterstützung für diese Systemhandlungen.

---

## 7. Datenbankgrundlage

Die vorhandene Datenbank bildet bereits viele Bereiche der Marskolonie ab. Für den aktuellen Projektfokus sind besonders wichtig:

| Tabelle / Bereich | Bedeutung |
|---|---|
| `RESSOURCE` | Speichert Ressourcentypen, Mengen, Einheiten und Mindestwerte. |
| `LAGER` | Speichert Lagerorte der Marskolonie. |
| `IST_GELAGERT_IN` | Verbindet Ressourcen mit konkreten Lagern. |
| `MITARBEITER` | Kann Bewertungen oder vorbereitete Vorgänge fachlich zuordnen. |

Für Prozess 1 reichen diese vorhandenen Strukturen bereits weitgehend aus.

Für Prozess 6 wurden zusätzliche Tabellen ergänzt, damit der Verkauf überschüssiger Ressourcen nachvollziehbar vorbereitet werden kann.

| Neue Tabelle | Zweck |
|---|---|
| `EXTERNES_UNTERNEHMEN` | Speichert externe Firmen, die Ressourcen kaufen oder übernehmen können. |
| `RESSOURCEN_UEBERSCHUSS_BEWERTUNG` | Dokumentiert, welche Ressourcen als Überschuss bewertet wurden. |
| `RESSOURCEN_VERKAUF` | Bildet einen vorbereiteten Verkauf oder eine externe Abgabe ab. |
| `RESSOURCEN_VERKAUF_POSITION` | Speichert die einzelnen Ressourcenpositionen eines vorbereiteten Verkaufs. |

Die Erweiterung ist additiv. Bestehende Tabellen wurden nicht gelöscht und nicht grundlegend umgebaut.

---

## 8. Beispieldaten

Für die Präsentation wurden einfache Beispieldaten vorbereitet.

| Bereich | Beispiel |
|---|---|
| Externe Unternehmen | Deutsche Mars Bau GmbH, Deutsche Mars Versorgung AG |
| Überschussbewertungen | Eisenerz aus Lager 2, Aluminiumplatten aus Lager 2 |
| Vorbereiteter Verkauf | Verkauf an Deutsche Mars Bau GmbH |
| Verkaufspositionen | 3000 KG Eisenerz, 120 Stück Aluminiumplatten |

Diese Beispieldaten sind bewusst leicht verständlich, damit sie in der Präsentation schnell erklärt werden können.

---

## 9. BPMN-Modellierung

Für AP11 werden die zwei ausgewählten Businessprozesse als BPMN-Prozesse dokumentiert.

| BPMN-Prozess | Inhalt |
|---|---|
| Kritische Ressourcen überwachen und Nachschub auslösen | Mindestbestand prüfen, Bedarf berechnen, interne Verfügbarkeit prüfen, Nachschubmaßnahme vorbereiten. |
| Überschüssige Ressourcen an externe Unternehmen verkaufen | Überschuss erkennen, interne Reserve prüfen, Verkaufspotenzial bewerten, externe Abgabe vorbereiten. |

Die BPMN-Modelle zeigen nicht nur technische Schritte, sondern fachliche Entscheidungen. Besonders wichtig sind die Entscheidungspunkte:

| Entscheidung | Bedeutung |
|---|---|
| Unter Mindestbestand? | Startet die Bearbeitung kritischer Ressourcen. |
| Intern verfügbar? | Unterscheidet interne Lösung und externen Nachschub. |
| Überschuss vorhanden? | Startet die Bewertung verkaufbarer Ressourcen. |
| Externe Abgabe sinnvoll? | Entscheidet, ob ein Verkauf vorbereitet wird. |

---

## 10. Spezifikation

AP12 fasst Lastenheft und Pflichtenheft für den reduzierten Projektumfang zusammen.

| Bereich | Inhalt |
|---|---|
| Lastenheft | Anforderungen aus Sicht der Kolonieleitung. |
| Pflichtenheft | Technische Umsetzung durch Web-App, PHP-API, MariaDB, SQL-Dateien und Stored Procedures. |
| Priorisierung | Muss-Anforderungen, wichtige Anforderungen und optionale Erweiterungen. |
| Abnahmekriterien | Prüfpunkte für Ressourcenwarnung, Lagerbezug, Verkaufsbewertung und Demonstrierbarkeit. |

Wichtig ist, dass die Anforderungen nicht mehr alle möglichen Projektideen abdecken, sondern direkt auf die zwei Businessprozesse ausgerichtet sind.

---

## 11. Technische Umsetzung

Die technische Grundlage ist bereits vorhanden und wird nicht vollständig neu aufgebaut.

| Bereich | Umsetzung |
|---|---|
| Frontend | React mit TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend / API | PHP-API |
| Datenformat | JSON |
| Datenbank | MariaDB / MySQL |
| Datenbanklogik | SQL-Dateien und Stored Procedures |
| Infrastruktur | MariaDB auf VPS, keine neue Oracle-Datenbank notwendig |

Die Web-App dient als zentrale Oberfläche. Die PHP-API stellt Daten aus der Datenbank bereit. Die Datenbank enthält die fachliche Grundlage für Ressourcenbestände, kritische Mindestwerte, Lagerbezug und vorbereitete Verkäufe.

---

## 12. Implementierungsstrategie

Die Implementierung folgt einer konservativen Strategie:

| Entscheidung | Begründung |
|---|---|
| Bestehende Web-App weiterverwenden | Die technische Grundlage ist bereits vorhanden und demonstrierbar. |
| MariaDB/MySQL als Hauptlinie nutzen | Die Gruppe hat bereits eine MariaDB auf einem VPS eingerichtet. |
| Bestehende Datenbank nicht ersetzen | Der Entwurf unterstützt Prozess 1 bereits gut. |
| Verkaufstabellen additiv ergänzen | Prozess 6 kann sauber abgebildet werden, ohne bestehende Bereiche umzubauen. |
| Fokus auf zwei Businessprozesse halten | Verhindert unnötigen Umfang und verbessert die Nachvollziehbarkeit. |

Damit wird die Projektarbeit nicht künstlich vergrößert, sondern gezielt auf die bewertungsrelevanten Punkte ausgerichtet.

---

## 13. Projektplan und Meilensteine

| Phase | Inhalt | Ergebnis |
|---|---|---|
| AP4 / AP5 | Case Study auswählen und nach Feedback reduzieren | Überarbeitete Case Study mit Zwei-Prozess-Fokus |
| AP7 | Datenbankentwurf prüfen und erweitern | Verkaufstabellen und Beziehungen ergänzt |
| AP8 | DBMS und Infrastruktur festlegen | MariaDB/MySQL als Hauptlinie bestätigt |
| AP9 | Implementierung prüfen | Web-App, API und SQL auf Fokus eingeordnet |
| AP10 | Use Cases überarbeiten | Sechs Use Cases passend zu den zwei Businessprozessen |
| AP11 | BPMN modellieren | Zwei BPMN-Prozesse für Ressourcenüberwachung und Ressourcenverkauf |
| AP12 | Lastenheft und Pflichtenheft ausarbeiten | Spezifikation mit Anforderungen und Abnahmekriterien |
| AP13 | Proposal vorbereiten | Vortragsfähige Zusammenfassung für KW 20 |
| AP14 | Methodenwahl festlegen | Iterative und prototypische Vorgehensweise begründet |

Nächste Arbeitsschritte:

| Schritt | Ziel |
|---|---|
| BPMN-Grafiken final prüfen | Modelle sollen syntaktisch und fachlich sauber sein. |
| SQL-/Stored-Procedure-Zuordnung finalisieren | Datenbanklogik soll eindeutig den Use Cases zugeordnet werden. |
| Web-App-Demo vorbereiten | Ressourcenbestand, kritische Ressourcen und Verkaufsbeispiele sollen zeigbar sein. |
| Präsentation erstellen | Proposal in 15 Minuten klar vorstellen. |
| Dokumentation glätten | Alle APs sollen denselben Projektfokus verwenden. |

### Dauerübersicht des Projektplans

Hinweis: Die Dauerangaben sind geschätzte Arbeitstage bzw. Personentage inklusive Abstimmung, Prüfung und Dokumentation. Sie beschreiben nicht nur reine Schreib- oder Implementierungszeit.

| Woche | Arbeitspakete | Dauer |
|---:|---|---:|
| 17 | AP1 Gruppe finden, AP2 Kommunikation sichern, AP3 Sprecher:in wählen | 5 Tage |
| 18 | AP4 Auswahl Case Study, AP5 Revision Case Study, AP6 Verantwortungen festlegen | 5 Tage |
| 19 | AP7 Revision Datenbankentwurf | 5 Tage |
| 20 | AP8 Auswahl DBMS-Infrastruktur, AP9 Revision Implementierung, AP10 Revision Use Cases | 5 Tage |
| 21 | AP11 BPMN-Modellierung, AP12 Spezifikation | 5 Tage |
| 22 | AP13 Proposal Vorbereitung, Proposal Vortrag, AP14 Methodenwahl | 5 Tage |
| Gesamt | Projektplan KW 17 bis KW 22 | 30 Tage |

---

## 14. Aufwandsschätzung

| Aufgabe | Geschätzter Aufwand |
|---|---:|
| Case Study und Use Cases abstimmen | 1 PT |
| Datenbankänderungen prüfen und dokumentieren | 1 PT |
| BPMN-Prozesse vorbereiten und prüfen | 2 PT |
| Lastenheft und Pflichtenheft ausarbeiten | 2 PT |
| Web-App-/API-Bezug für die Demo vorbereiten | 2 PT |
| Proposal-Präsentation erstellen und proben | 1 PT |

Geschätzter Aufwand für die nächste Projektphase: **9 Personentage**

---

## 15. Risiken und Gegenmaßnahmen

| Risiko | Gegenmaßnahme |
|---|---|
| Projekt wird wieder zu breit | Fokus konsequent auf zwei Businessprozesse halten. |
| BPMN wird zu technisch | Fachliche Entscheidungen und Rollen sichtbar machen. |
| Verkauf wird zu groß | Nur Bewertung und Vorbereitung abbilden, keine vollständige Abrechnung. |
| Stored Procedures sind noch nicht vollständig zugeordnet | SQL-Dateien und Datenbanklogik Schritt für Schritt den Use Cases zuordnen. |
| Präsentation wird zu detailreich | Nur wichtigste Tabellen, Use Cases und Prozessentscheidungen zeigen. |

---

## 16. Vorschlag für die 15-Minuten-Präsentation

| Zeit | Inhalt |
|---:|---|
| 1 min | Projektname, Gruppe und kurze Idee |
| 2 min | Case Study: Ressourcenverwaltung für eine Marskolonie |
| 2 min | Feedback und Reduktion auf zwei Businessprozesse |
| 3 min | Businessprozesse und daraus abgeleitete Use Cases |
| 3 min | Datenbankgrundlage, neue Tabellen und Beispieldaten |
| 2 min | BPMN, Lastenheft/Pflichtenheft und technische Umsetzung |
| 1 min | Projektplan, nächste Schritte und Risiken |
| 1 min | Kurzfazit |

Damit deckt die Präsentation die wichtigsten Kriterien ab: Case Study, Geschäftsprozesse, Use Cases, Datenbankänderungen, Spezifikation, Implementierungsstrategie und Projektplan.

---

## 17. Abdeckung der Projektkriterien

| Kriterium | Abdeckung im Projektproposal |
|---|---|
| Anforderungsanalyse und Geschäftsprozesse | Zwei ausgewählte Businessprozesse werden begründet, beschrieben und abgegrenzt. |
| Lastenheft und Pflichtenheft | AP12 enthält Anforderungen, technische Umsetzung, Prioritäten und Abnahmekriterien. |
| BPMN-Modellierung | AP11 beschreibt beide Hauptprozesse mit fachlichen Entscheidungen und Datenbankbezug. |
| API / Stored Procedures / SQL | Vorhandene SQL-Dateien und Stored Procedures werden den Use Cases und Prozessen zugeordnet. |
| Applikation | Die vorhandene React-/TypeScript-Web-App mit PHP-API bleibt zentrale Oberfläche. |
| Dokumentation des Systems | AP5, AP7, AP9, AP10, AP11, AP12 und AP13 bilden den Projektstand nachvollziehbar ab. |
| Implementierungsstrategie | MariaDB/MySQL, Web-App, PHP-API und additive Datenbankerweiterungen werden begründet. |
| Änderungen an Daten und Modell | Neue Verkaufstabellen und Beispieldaten dokumentieren den Ausbau für Prozess 6. |
| Präsentation | Die 15-Minuten-Struktur bereitet die KW-20-Proposal-Präsentation direkt vor. |

---

## 18. Kurzfazit

Das Projektproposal zeigt einen realistischen und klar abgegrenzten Projektstand.

Mars Logistik Verwaltung [ALS] konzentriert sich auf zwei zentrale Businessprozesse: kritische Ressourcen überwachen und Nachschub auslösen sowie überschüssige Ressourcen an externe Unternehmen verkaufen.

Die vorhandene Datenbank, Web-App und API werden weiterverwendet. Für den Verkaufsprozess wurden gezielt neue Tabellen und Beispieldaten ergänzt. Dadurch bleibt das Projekt fachlich nachvollziehbar, technisch machbar und gut präsentierbar.

## Dauer

Dauer: 2 Tage

Hinweis: Diese Dauer beschreibt AP13 insgesamt. Die kurze Vorbereitung und die ausgearbeitete Proposal-Fassung gehören zum selben Arbeitspaket.
