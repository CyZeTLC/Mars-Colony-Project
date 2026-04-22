DELIMITER $$

CREATE PROCEDURE getLagerVersorgungAtRisk()
BEGIN
SELECT lager_id,
    aktuelle_leistung,
    kapazitaet_max
FROM ENERGIEQUELLE
WHERE (aktuelle_leistung / kapazitaet_max) < 0.5;
END $$

DELIMITER ;
