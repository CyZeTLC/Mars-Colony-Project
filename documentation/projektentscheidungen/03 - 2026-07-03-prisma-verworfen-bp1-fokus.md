# 03 – Prisma verworfen, Fokus auf BP1

Stand: 2026-07-03

Status: beschlossen

## Entscheidung

Die geplante Umstellung des Backends auf Prisma wird nicht weiterverfolgt.

Die bestehende Architektur aus React-/TypeScript-Webanwendung, PHP-REST-API und MariaDB/MySQL bleibt für die Abschlusspräsentation erhalten.

## Begründung

Gemäß dem Gesprächsprotokoll vom 24.06.2026 soll die Abschlusspräsentation einen vollständigen Zusammenhang anhand von BP1 zeigen:

```text
Use Case → Businessprozess → BPMN-Modell → Stored Procedures → Applikationsbezug
```

Der vorhandene Projektumfang reicht dafür bereits aus. Eine zusätzliche Backend-Migration auf Prisma würde Zeit und Komplexität erhöhen, ohne den fachlichen BP1-Schwerpunkt wesentlich zu verbessern.

## Konsequenzen

- BP1 wird für die Abschlusspräsentation vollständig und nachvollziehbar vorbereitet.
- Das PHP-Backend bleibt bestehen.
- MariaDB/MySQL bleibt die aktuelle Datenbanklinie.
- Die vorhandenen Stored Procedures sollen in die bestehende PHP-API eingebunden werden.
- Prisma ist nicht Bestandteil des aktuellen Projektumfangs.
- BP2 bleibt dokumentiert, steht in der Präsentation aber nicht im Mittelpunkt.
