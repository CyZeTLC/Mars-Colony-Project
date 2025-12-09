SELECT r.ressource_id,
    r.name,
    r.ablaufdatum,
    ig.lager_id
FROM Ressource r
    JOIN ist_gelagert_in ig ON r.ressource_id = ig.ressource_id
WHERE r.ablaufdatum BETWEEN CURRENT_DATE AND DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY)
ORDER BY r.ablaufdatum ASC;