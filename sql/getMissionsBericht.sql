SELECT t.tpw_id,
    m.login AS pilot,
    f.f_name AS fahrzeug,
    s.stadt_name AS sektor,
    t.dauer,
    t.tpw_status
FROM TRANSPORTWEGE t
    JOIN MITARBEITER m ON t.mitarbeiter_id = m.mitarbeiter_id
    JOIN FAHRZEUGE f ON t.fahrzeug_id = f.fahrzeug_id
    JOIN STADT s ON t.stadt_id = s.stadt_id