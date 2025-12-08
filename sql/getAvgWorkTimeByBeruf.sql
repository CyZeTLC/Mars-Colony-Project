SELECT b.berufung_name,
    AVG(b.arbeitszeit) AS durchschnittliche_arbeitszeit
FROM Berufung b
GROUP BY b.berufung_name
ORDER BY durchschnittliche_arbeitszeit DESC;