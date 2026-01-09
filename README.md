<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/HSBI_Logo_RGB_schwarz.svg/1200px-HSBI_Logo_RGB_schwarz.svg.png" alt="Logo" width="700" height="120">

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

## ⚙️ Technologie-Stack

| Rolle | Technologie | Beschreibung |
| :--- | :--- | :--- |
| **Frontend Framework** | **React** (mit Hooks) | Komponentenbasiertes UI-Design. |
| **Sprache** | **TypeScript** | Stellt Typensicherheit und bessere Wartbarkeit sicher. |
| **Build Tool** | **Vite** | Schneller Development-Server und effizientes Bundling. |
| **Styling** | **Tailwind CSS v4** | Utility-First CSS-Framework für das futuristische Mars-Design. |
| **Backend/Daten** | **Oracle Database** | Der geplante Datenbank-Layer für die persistente Speicherung der Kolonie-Daten. |

---

## 🛠️ Einrichtung und Installation (Schritt-für-Schritt)

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