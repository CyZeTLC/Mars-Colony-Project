SELECT b.bewohner_id,
    b.vorname,
    b.nachname,
    a.stra_e as 'Straße',
    a.hausnummer
FROM BEWOHNER b
    JOIN ADRESSE a ON b.adresse_id = a.adresse_id
ORDER BY b.nachname,
    b.vorname;