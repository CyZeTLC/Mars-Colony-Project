SELECT 
    s.stadt_name,
    k.breitengrad,
    k.laengengrad,
    COUNT(b.bewohner_id) AS einwohner_anzahl
FROM STADT s
JOIN KOORDINATE k ON s.koord_id = k.id
LEFT JOIN ADRESSE a ON s.stadt_id = a.stadt_id
LEFT JOIN BEWOHNER b ON a.adresse_id = b.adresse_id
GROUP BY s.stadt_name, k.breitengrad, k.laengengrad;