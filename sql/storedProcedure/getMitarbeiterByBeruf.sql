DELIMITER $$

CREATE PROCEDURE getMitarbeiterByBeruf(IN p_berufung_name VARCHAR(255))
BEGIN
SELECT m.mitarbeiter_id,
    m.vorname,
    m.nachname,
    m.gehalt
FROM Mitarbeiter m
    JOIN Berufung b ON m.berufung_id = b.b_id
WHERE b.berufung_name = p_berufung_name;
END $$

DELIMITER ;
