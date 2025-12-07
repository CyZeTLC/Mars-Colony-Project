SELECT *
FROM employees
    INNER JOIN citizens ON employees.citizen_id = citizens.citizen_id
WHERE employees.employee_id = :employee_id;