SELECT b.bewohner_id,
    b.vorname,
    b.nachname,
    a.strasse,
    a.hausnummer
FROM Bewohner b
    JOIN Adresse a ON b.adresse_id = a.adresse_id
ORDER BY b.nachname,
    b.vorname;