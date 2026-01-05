SELECT m.login,
    bw.vorname,
    bw.nachname,
    be.berufung_name,
    m.gehalt
FROM MITARBEITER m
    JOIN BERUFUNG be ON m.berufung_id = be.berufung_id
    JOIN BEWOHNER bw ON bw.BEWOHNER_ID = m.bewohner_id;