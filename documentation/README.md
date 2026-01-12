# Mars Colony Webapp Documentation

## Übersicht

Die Mars Colony Webapp ist eine Webanwendung zur Verwaltung einer simulierten Marskolonie. Sie ermöglicht die Überwachung und Verwaltung von Städten, Bürgern, Mitarbeitern, Ressourcen, Fahrzeugen und Transportwegen auf dem Mars.

## Technologie-Stack

- **Frontend**: React mit TypeScript, Vite als Build-Tool
- **Styling**: Tailwind CSS
- **Backend**: PHP-API
- **Datenbank**: Oracle und MySQL (SQL-Skripte bereitgestellt)
- **Authentifizierung**: Login-System

## Installation

### Voraussetzungen

- Node.js (Version 16 oder höher)
- PHP (für die API)
- Datenbankserver (Oracle oder MySQL)

### Schritte

1. **Repository klonen**:
   ```bash
   git clone https://github.com/CyZeTLC/Mars-Colony-Project.git
   cd mars-colony
   ```

2. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

3. **Datenbank einrichten**:
   - Verwenden Sie die SQL-Skripte in `sql/build/` (oracle.sql oder mysql.sql)
   - Konfigurieren Sie die Datenbankverbindung in `api/config.inc.php`

4. **API starten**:
   - Stellen Sie sicher, dass PHP läuft
   - Die API ist unter `api/` verfügbar

5. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```

## Verwendung

### Navigation

Die App besteht aus folgenden Hauptseiten:

- **Overview**: Dashboard mit Übersicht über die Kolonie
- **Cities**: Verwaltung der Städte und deren Koordinaten
- **Citizens**: Liste und Details der Bürger
- **Employees**: Mitarbeiterverwaltung und Berufe
- **Ressources**: Ressourceninventar und Lager
- **Vehicles**: Fahrzeuge und Raumfahrzeuge
- **SqlOverview**: Direkte SQL-Abfragen

### Login

Melden Sie sich mit einem Mitarbeiter-Account an, um Zugriff auf die Funktionen zu erhalten.

## REST-API (restApi.php)

Die REST-API in `api/restApi.php` stellt die Backend-Funktionalität für die Webapp bereit. Sie verwendet GET-Parameter für Anfragen und gibt JSON-Antworten zurück. Alle Anfragen erfordern einen gültigen CSRF-Token.

### Basis-URL
```
GET /api/restApi.php?action={action}&csrf={csrf}&{additional_params}
```

### CSRF-Schutz
- Jede Anfrage muss einen `csrf`-Parameter enthalten.
- Verwenden Sie `generate_csrf`, um einen neuen Token zu erhalten.
- Tokens sind 24 Stunden gültig.

### Verfügbare Aktionen

#### 1. generate_csrf
Generiert einen neuen CSRF-Token.

**Parameter:**
- Keine zusätzlichen Parameter

**Antwort:**
```json
{
  "csrf": "token_string"
}
```

#### 2. get_sql_result
Führt eine spezifische SQL-Datei aus und gibt das Ergebnis zurück.

**Parameter:**
- `file`: Name der SQL-Datei (z.B. "getCitizensCount.sql")

**Antwort:**
```json
{
  "result": [/* SQL-Ergebnis */]
}
```

**Beispiel:** `/api/restApi.php?action=get_sql_result&csrf={token}&file=getCitizensCount.sql`

#### 3. get_active_vehicles_count
Gibt die Anzahl aktiver Fahrzeuge zurück.

**Parameter:**
- Keine zusätzlichen Parameter

**Antwort:**
```json
{
  "active_vehicles": [/* Fahrzeugdaten */]
}
```

#### 4. get_citizens_count
Gibt die Anzahl der Bürger zurück.

**Parameter:**
- Keine zusätzlichen Parameter

**Antwort:**
```json
{
  "citizens_count": [/* Bürgeranzahl */]
}
```

#### 5. get_dashboard_stats
Gibt Dashboard-Statistiken zurück (Bürger, Städte, Fahrzeuge, Energie).

**Parameter:**
- Keine zusätzlichen Parameter

**Antwort:**
```json
{
  "citizens_count": [...],
  "cities_count": [...],
  "vehicles": [...],
  "energy_power": [...]
}
```

#### 6. get_all_tables
Gibt alle verfügbaren Tabellen aus den SQL-Dateien zurück.

**Parameter:**
- Keine zusätzlichen Parameter

**Antwort:**
```json
{
  "tables": {
    "tableName": {
      "result": [/* Daten */],
      "sql": "/* SQL-Inhalt */"
    }
  }
}
```

#### 7. get_sql_files
Gibt den Inhalt aller SQL-Dateien zurück.

**Parameter:**
- Keine zusätzlichen Parameter

**Antwort:**
```json
{
  "sql_content": "/* Vollständiger SQL-Inhalt aller Dateien */"
}
```

### Fehlerbehandlung
Die API gibt strukturierte Fehlerantworten zurück:

```json
{
  "error": 400,
  "message": "Invalid request!"
}
```

Häufige Fehlercodes:
- `400`: Ungültige Anfrage (fehlende Parameter)
- `403`: Ungültiger oder abgelaufener CSRF-Token
- `501`: Aktion nicht implementiert

### Verwendung im Frontend
Das Frontend verwendet die API über die `restApi.ts`-Datei in `src/utils/`. Beispiel:

```typescript
import { apiCall } from '../utils/restApi';

const stats = await apiCall('get_dashboard_stats');
```

## Datenbankstruktur

## Datenbankstruktur

Die Datenbank enthält Tabellen für:

- Städte (STADT)
- Bürger (BEWOHNER)
- Mitarbeiter (MITARBEITER)
- Ressourcen (RESSOURCE)
- Fahrzeuge (FAHRZEUGE, RAUMFAHRZEUG)
- Transportwege (TRANSPORTWEGE)
- Und mehr...

Vollständiges Schema in `sql/build/oracle.sql` oder `sql/build/mysql.sql`.

## Entwicklung

### Skripte

- `npm run dev` - Entwicklungsserver starten
- `npm run build` - Produktionsbuild erstellen
- `npm run preview` - Build-Vorschau

### Projektstruktur

```
src/
├── components/     # Wiederverwendbare Komponenten
├── pages/          # Hauptseiten der App
├── utils/          # Hilfsfunktionen
└── assets/         # Statische Assets

api/                # PHP-API
sql/                # Datenbankskripte
public/             # Öffentliche Assets
```

## Beitrag

Für Beiträge zum Projekt:

1. Fork das Repository
2. Erstellen Sie einen Feature-Branch
3. Committen Sie Ihre Änderungen
4. Erstellen Sie einen Pull-Request

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe `LICENSE.txt` für Details.