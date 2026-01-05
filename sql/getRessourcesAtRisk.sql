SELECT r.ressource_id,
    r.r_typ as ressource_typ,
    r.ablaufdatum,
    ig.lager_id
FROM RESSOURCE r
    JOIN IST_GELAGERT_IN ig ON r.ressource_id = ig.ressource_id
WHERE r.ablaufdatum BETWEEN CURRENT_DATE AND DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY)
ORDER BY r.ablaufdatum ASC;