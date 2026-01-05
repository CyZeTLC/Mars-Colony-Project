SELECT 
    b.bewohner_id,
    b.vorname,
    b.nachname,
    b.geb
FROM BEWOHNER b
WHERE 
    EXTRACT(MONTH FROM b.geb) = EXTRACT(MONTH FROM CURRENT_DATE)
AND EXTRACT(DAY FROM b.geb) = EXTRACT(DAY FROM CURRENT_DATE);