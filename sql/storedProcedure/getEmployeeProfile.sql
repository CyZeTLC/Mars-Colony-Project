DELIMITER $$

CREATE PROCEDURE getEmployeeProfile(IN p_employee_id DECIMAL(8,0))
BEGIN
SELECT *
FROM employees
    INNER JOIN citizens ON employees.citizen_id = citizens.citizen_id
WHERE employees.employee_id = p_employee_id;
END $$

DELIMITER ;
