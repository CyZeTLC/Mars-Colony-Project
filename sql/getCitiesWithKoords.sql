SELECT s.stadt_name,
    k.breitengrad,
    k.laengengrad
FROM STADT s
    JOIN KOORDINATE k ON s.koord_id = k.id;