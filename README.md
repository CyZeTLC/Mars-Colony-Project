<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/HSBI_Logo_RGB_schwarz.svg/1200px-HSBI_Logo_RGB_schwarz.svg.png" alt="Logo" width="600" height="120">

  <h3 align="center">Mars Logisitik Verwaltung - Projekt</h3>

  <p align="center">
    ERD & PDM, SQL Queries, TypeScript WepApp, php backend, ..
    <br />
    <a href="https://github.com/CyZeTLC/Mars-Colony-Project/issues">Fehler melden</a>
    ·
    <a href="https://github.com/CyZeTLC/Mars-Colony-Project/pulls">Feature Request</a>
  </p>
</div>

<div align="center">

![GitHub License](https://img.shields.io/github/license/CyZeTLC/Mars-Colony-Project?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/CyZeTLC/Mars-Colony-Project?style=for-the-badge)
![Letze Aenderung](https://img.shields.io/github/last-commit/CyZeTLC/Mars-Colony-Project?style=for-the-badge)

</div>

---

## Über das Projekt

Dieses Repository enthält alle technischen Komponenten für das Semesterprojekt **Mars Logisitk Verwaltung** für das Modul Datenbanken-1 im WS 25/26. Es dient als zentraler Speicherort für die serverseitige Logik sowie die Web-Integrationen & SQL Queries.

### Kern-Features:
* **WebApp:** Echtzeit-Datenabfrage über das Web in Form einer modernen TypeScript App.
* **ERD/PDM:** Die Darstellung der Datenbankstruktur durch ein den SAP PowerDesigner.
* **SQL Queries:** Datenbankabfragen für die WebApp.

---

## Technologie-Stack

| Rolle | Technologie | Beschreibung |
| :--- | :--- | :--- |
| **Frontend Framework** | **React** (mit Hooks) | Komponentenbasiertes UI-Design. |
| **Sprache** | **TypeScript** | Stellt Typensicherheit und bessere Wartbarkeit sicher. |
| **Build Tool** | **Vite** | Schneller Development-Server und effizientes Bundling. |
| **Styling** | **Tailwind CSS v4** | Utility-First CSS-Framework für das futuristische Mars-Design. |
| **Backend/Daten** | **Oracle Database** | Der geplante Datenbank-Layer für die persistente Speicherung der Kolonie-Daten. |

---

## Einrichtung und Installation (Schritt-für-Schritt)

### 1. Klonen und Abhängigkeiten installieren

Stelle sicher, dass du **Node.js (LTS)** und **npm** installiert hast.

```bash
# Repository klonen
git clone https://github.com/CyZeTLC/Mars-Colony-Project

# Alle notwendigen Pakete installieren (React, Vite, Tailwind v3, etc.)
npm install
```

### 2. Applikation starten

Starte den Vite-Entwicklungsserver:

```bash
npm run dev
```

Die Anwendung ist nun über die angezeigte lokale URL (z.B. http://localhost:5173/) erreichbar.

---

## REST API Dokumentation

Die Anwendung verfügt über eine interne Schnittstelle zur Abfrage von Datenbank-Statistiken und zur Verwaltung von CSRF-Sicherheitstoken. Alle Antworten werden im **JSON-Format** zurückgegeben.

### Basis-Konfiguration

* **Endpunkt:** `restApi.php`
* **Methode:** `GET`
* **Pflichtparameter:** `action` und `csrf`

---

### Sicherheit (CSRF-Schutz)

Um Anfragen zu autorisieren, muss jeder Request einen gültigen CSRF-Token enthalten.

* Ein Token ist **24 Stunden** gültig.
* Falls kein Token vorhanden ist oder dieser abgelaufen ist, gibt die API einen `403 Forbidden` Fehler zurück.
* **Initialer Abruf:** Nutze die Action `generate_csrf`, um einen Token zu generieren.

---

### Endpunkte (Actions)

| Action | Beschreibung | Parameter |
| --- | --- | --- |
| `generate_csrf` | Generiert einen neuen CSRF-Token für die Session. | - |
| `get_dashboard_stats` | Liefert aggregierte Daten (Bürger, Städte, Fahrzeuge, Energie). | - |
| `get_active_vehicles_count` | Gibt die Anzahl der aktuell aktiven Fahrzeuge zurück. | - |
| `get_citizens_count` | Gibt die Gesamtzahl der Bürger zurück. | - |
| `get_sql_result` | Führt eine spezifische SQL-Datei aus dem `/sql` Ordner aus. | `file` (Dateiname) |
| `get_all_tables` | Gibt alle SQL-Abfrageergebnisse inkl. des SQL-Quellcodes zurück. | - |
| `get_sql_files` | Listet den Inhalt aller verfügbaren SQL-Dateien auf. | - |

---

### ⚠️ Fehlerbehandlung

Die API nutzt Standard-HTTP-Statuscodes:

* **200 OK:** Anfrage erfolgreich.
* **400 Bad Request:** Fehlende Parameter (action/csrf) oder ungültige Datei.
* **403 Forbidden:** CSRF-Token fehlt, ist ungültig oder abgelaufen.
* **501 Not Implemented:** Die angeforderte Action existiert nicht.

**Beispiel für eine Fehlermeldung:**

```json
{
  "error": 403,
  "message": "CSRF-Token expired!"
}
```

---

### Beispiel-Abfrage (JavaScript/Fetch)

```javascript
fetch('api.php?action=get_dashboard_stats&csrf=DEIN_TOKEN_HIER')
  .then(response => response.json())
  .then(data => console.log(data));
```