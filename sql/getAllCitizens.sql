SELECT
    b.bewohner_id,
    b.vorname,
    b.nachname,
    CONCAT(CONCAT(CONCAT(CONCAT(a.stra_e, ' '), a.hausnummer), ', '), s.stadt_name) AS adresse,
    CASE 
        WHEN m.bewohner_id IS NOT NULL THEN 'Ja' 
        ELSE 'Nein' 
    END AS ist_mitarbeiter
FROM BEWOHNER b
INNER JOIN MITARBEITER m 
    ON b.bewohner_id = m.bewohner_id
INNER JOIN ADRESSE a 
    ON b.adresse_id = a.adresse_id
INNER JOIN STADT s 
    ON a.stadt_id = s.stadt_id;