# 01 - PR 63: Prisma-Umstellung und REST-API

Stand: 2026-06-11

Status: überholt

Abgelöst durch: [`03 - 2026-07-03-prisma-verworfen-bp1-fokus.md`](03%20-%202026-07-03-prisma-verworfen-bp1-fokus.md)

## Merkpunkte

- Eine Umstellung auf Prisma wurde im Review zu PR #63 diskutiert.
- Tom / CyZeTLC kümmert sich um die REST-API-Logik und das passende Routing.
- Änderungen an `api/restApi.php`, API-Routing oder API-Pfadlogik sollen deshalb nicht nebenbei in SQL-, BP- oder Doku-PRs landen.
- Die SQL-/BP1-/BP2-Struktur, Stored Procedures und fachliche Dokumentation bleiben unabhängig davon relevant.

## Umsetzung in PR #63

Die REST-API-Änderungen wurden mit Commit `accdd43` wieder entfernt. Die SQL-/BP1-/BP2-Struktur bleibt erhalten.

## Aktueller Stand

Eine Prisma-Umstellung ist nicht Teil des Repository-Stands. Das Backend bleibt eine PHP-REST-API mit PDO. Datenbankzugriffe sollen gemäß Gesprächsprotokoll 03 künftig über die vorhandenen Stored Procedures erfolgen.
