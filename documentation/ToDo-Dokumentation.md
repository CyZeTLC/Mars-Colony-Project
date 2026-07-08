# To-do – Dokumentation der Stored-Procedure-Anbindung

Status: offen

Ziel ist, die Projektdokumentation nach der produktiven Anbindung und erfolgreichen Prüfung der Stored Procedures auf den tatsächlichen Implementierungsstand zu bringen.

> Die folgenden Punkte erst abhaken, wenn die jeweilige Aussage durch Code, Datenbankstand und Tests nachweisbar ist.

---

## 1. Technische Dokumentation

- [ ] Ist-Architektur auf den produktiven Aufruf von Stored Procedures aktualisieren.
- [ ] Alte Aussage „Die API verwendet ausschließlich SQL-Dateien“ entfernen oder historisch einordnen.
- [ ] Neue feste BP1-API-Actions dokumentieren.
- [ ] Zuordnung der API-Actions zu den Stored Procedures dokumentieren.
- [ ] Procedure-Whitelist und ihre Sicherheitsfunktion erklären.
- [ ] Festhalten, dass keine Procedure-Namen aus URL-Parametern ausgeführt werden.
- [ ] Erfolgreiches JSON-Antwortformat dokumentieren.
- [ ] Fehlerformat und HTTP-Statuscodes dokumentieren.
- [ ] CSRF-Schutz der neuen Endpunkte beschreiben.
- [ ] Import der Procedure-Definitionen in MariaDB dokumentieren.
- [ ] Benötigte Datenbankrechte wie `CREATE ROUTINE` und `EXECUTE` dokumentieren.
- [ ] Deployment- und Aktualisierungsablauf dokumentieren.
- [ ] Beschreiben, wie der Importstatus der Procedures geprüft wird.
- [ ] Beispielaufrufe für API und Datenbank ergänzen.

### Zu dokumentierende BP1-Zuordnung

| API-Action | Stored Procedure | Zweck |
|---|---|---|
| `get_bp1_resources_below_min` | `getRessourcesBelowMin()` | Ressourcen unter Mindestbestand anzeigen |
| `get_bp1_resources_at_risk` | `getRessourcesAtRisk()` | Ablauf- und Bestandsrisiken anzeigen |
| `get_bp1_replenishment_requirements` | `getNachschubanforderungen()` | Nachschubbedarf und Maßnahme berechnen |
| `get_bp1_resources_with_storage` | `getRessourcenWithLager()` | Ressourcen mit Lagerbezug anzeigen |

### Vorgesehenes Erfolgsformat

```json
{
  "result": []
}
```

### Vorgesehenes Fehlerformat

```json
{
  "error": 500,
  "code": "STORED_PROCEDURE_FAILED",
  "message": "Die Datenbankfunktion konnte nicht ausgeführt werden."
}
```

---

## 2. Projektdokumentation

- [ ] [`README.md`](README.md) aktualisieren.
- [ ] [`datenbankabfragen-v4.md`](datenbankabfragen-v4.md) aktualisieren.
- [ ] [`APs/AP16-Architektur-Entwurf.md`](APs/AP16-Architektur-Entwurf.md) aktualisieren.
- [ ] [`lastenheft-und-pflichtenheft-v2.md`](lastenheft-und-pflichtenheft-v2.md) aktualisieren.
- [ ] [`APs/AP20-Applikation-fertiggestellt.md`](APs/AP20-Applikation-fertiggestellt.md) um die Umsetzung ergänzen.
- [ ] [`APs/AP21-Software-getestet.md`](APs/AP21-Software-getestet.md) um die Testergebnisse ergänzen.
- [ ] Neue Projektentscheidung zur produktiven Procedure-Anbindung anlegen.
- [ ] Neue Projektentscheidung in [`projektentscheidungen/README.md`](projektentscheidungen/README.md) aufnehmen.
- [ ] Bekannte technische Abgrenzung „Procedure-Anbindung offen“ als erledigt markieren.
- [ ] Prüfen, ob weitere aktuelle AP-Dokumente die alte Architektur beschreiben.
- [ ] Widersprüche zwischen aktuellem Code und Dokumentation beseitigen.
- [ ] Historische Dokumente unter `archive/` unverändert lassen.

### Vorgesehene neue Projektentscheidung

```text
documentation/projektentscheidungen/
04 - YYYY-MM-DD-stored-procedures-produktiv-angebunden.md
```

Sie soll mindestens enthalten:

- Datum und Status der Entscheidung
- eingebundene Stored Procedures
- neue API-Actions
- Sicherheitskonzept mit Whitelist und CSRF
- durchgeführte Tests
- verbleibende Abgrenzungen

---

## 3. Präsentationsdokumentation

### Freigabebedingung

Dieser Abschnitt darf erst bearbeitet werden, wenn:

- [ ] die Procedures in der Präsentationsdatenbank importiert sind,
- [ ] die API-Actions erfolgreich getestet wurden,
- [ ] das Frontend die erwarteten Ergebnisse anzeigt,
- [ ] TypeScript-Prüfung und Produktionsbuild erfolgreich sind,
- [ ] die vollständige Live-Demo erfolgreich durchgespielt wurde.

### Änderungen nach erfolgreicher Freigabe

- [ ] [`Abschlusspraesentation-Leitfaden-BP1.md`](Abschlusspraesentation-Leitfaden-BP1.md) aktualisieren.
- [ ] Ist-/Soll-Architektur durch die neue tatsächliche Ist-Architektur ersetzen.
- [ ] Formulierung „Procedure-Anbindung noch offen“ entfernen.
- [ ] Live-Aufruf der Procedure in den Demoablauf aufnehmen.
- [ ] Nur tatsächlich getestete Ergebniswerte verwenden.
- [ ] Wasserbeispiel mit dem realen API-Ergebnis abgleichen.
- [ ] Screenshots und Demo-Fallback nach der neuen Umsetzung aktualisieren.
- [ ] Keine Funktionen darstellen, die nicht erfolgreich getestet wurden.
- [ ] Alle Sprechertexte auf den neuen technischen Stand prüfen.
- [ ] Professor-Vorgabe „Use Case → Businessprozess → BPMN → Stored Procedures → Applikationsbezug“ erneut abgleichen.

---

## 4. Abschlusskontrolle

- [ ] Alle geänderten Dokumente nennen denselben technischen Ist-Stand.
- [ ] MariaDB/MySQL bleibt als aktuelle Datenbanklinie dokumentiert.
- [ ] PHP-REST-API mit PDO bleibt korrekt beschrieben.
- [ ] Procedure-Dateien, importierte Procedures und API-Anbindung werden begrifflich getrennt.
- [ ] Keine Zugangsdaten, Passwörter oder Tokens wurden dokumentiert.
- [ ] Alle relativen Markdown-Links funktionieren.
- [ ] Rechtschreibung und Formatierung wurden geprüft.
- [ ] Änderungen wurden von mindestens einer zweiten Person gegengelesen.
