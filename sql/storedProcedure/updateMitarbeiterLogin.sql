DELIMITER $$

CREATE PROCEDURE updateMitarbeiterLogin(IN p_neuer_nachname VARCHAR(255), IN p_bewohner_id DECIMAL(8,0))
BEGIN
UPDATE MITARBEITER m
    JOIN BEWOHNER b ON m.bewohner_id = b.bewohner_id
SET b.Nachname = p_neuer_nachname,
    m.login = LOWER(CONCAT(LEFT(b.Vorname, 1), '.', p_neuer_nachname))
WHERE b.bewohner_id = p_bewohner_id;
END $$

DELIMITER ;
