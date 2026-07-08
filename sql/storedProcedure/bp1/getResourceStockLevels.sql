DROP PROCEDURE IF EXISTS getResourceStockLevels;
DELIMITER $$

CREATE PROCEDURE getResourceStockLevels()
READS SQL DATA
BEGIN
SELECT
    r.R_TYP AS ressource,
    COALESCE(r.MENGE, 0) AS bestand,
    r.MIN_SCHWELLENWERT AS mindestbestand,
    COALESCE(r.MENGE_EINHEIT, '') AS einheit,
    ROUND(
        COALESCE(r.MENGE, 0) / NULLIF(r.MIN_SCHWELLENWERT, 0) * 100,
        1
    ) AS prozent
FROM RESSOURCE r
WHERE r.R_TYP IN ('Wasser', 'Sauerstoff', 'Nahrung')
  AND r.MIN_SCHWELLENWERT IS NOT NULL
  AND r.MIN_SCHWELLENWERT > 0
ORDER BY
    r.R_TYP;
END $$

DELIMITER ;
