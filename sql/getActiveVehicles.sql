SELECT 
    SUM(CASE WHEN Status = 'im Einsatz' OR Status = 'im Flug' THEN 1 ELSE 0 END) AS active_vehicles_count,
    SUM(CASE WHEN Status NOT IN ('im Einsatz', 'im Flug') THEN 1 ELSE 0 END) AS inactive_vehicles_count,
    COUNT(*) AS total_vehicles_count
FROM (
    SELECT F_STATUS AS Status FROM FAHRZEUGE
    UNION ALL
    SELECT RF_STATUS AS Status FROM RAUMFAHRZEUG
) combined_assets;