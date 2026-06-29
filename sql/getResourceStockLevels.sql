SELECT
    R_TYP AS ressource,
    MENGE AS bestand,
    MIN_SCHWELLENWERT AS mindestbestand,
    COALESCE(MENGE_EINHEIT, '') AS einheit,
    ROUND(
        COALESCE(MENGE, 0) / NULLIF(MIN_SCHWELLENWERT, 0) * 100,
        1
    ) AS prozent
FROM RESSOURCE
WHERE R_TYP IN ('Wasser', 'Sauerstoff', 'Nahrung')
  AND MIN_SCHWELLENWERT IS NOT NULL
  AND MIN_SCHWELLENWERT > 0
ORDER BY R_TYP;
