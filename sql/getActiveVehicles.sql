SELECT 
    SUM(CASE WHEN `F_STATUS` = 'im Einsatz' THEN 1 ELSE 0 END) AS active_vehicles_count,
    SUM(CASE WHEN `F_STATUS` != 'im Einsatz' THEN 1 ELSE 0 END) AS inactive_vehicles_count,
    COUNT(*) AS total_vehicles_count
FROM FAHRZEUGE;