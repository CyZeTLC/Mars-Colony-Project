UPDATE MITARBEITER m
    JOIN BEWOHNER b ON m.bewohner_id = b.bewohner_id
SET b.Nachname = :neuer_nachname,
    m.login = LOWER(CONCAT(LEFT(b.Vorname, 1), '.', :neuer_nachname))
WHERE b.bewohner_id = :bewohner_id;