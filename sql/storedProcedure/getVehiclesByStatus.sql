DELIMITER $$

CREATE PROCEDURE getVehiclesByStatus(IN p_status VARCHAR(255))
BEGIN
SELECT COUNT(*) AS vehicle_count
FROM vehicles
WHERE status = p_status;
END $$

DELIMITER ;
