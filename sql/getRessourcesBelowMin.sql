SELECT
    r.RESSOURCE_ID,
    r.r_typ,
    r.menge,
    r.min_schwellenwert,
    l.lagertyp
FROM RESSOURCE r
INNER JOIN IST_GELAGERT_IN ig 
    ON r.RESSOURCE_ID = ig.ressource_id
INNER JOIN LAGER l 
    ON ig.lager_id = l.lager_id
WHERE r.menge < r.min_schwellenwert;