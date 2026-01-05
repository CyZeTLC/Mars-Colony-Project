SELECT s.stadt_name
FROM STADT s
    LEFT JOIN TRANSPORTWEGE t ON s.stadt_id = t.stadt_id
WHERE t.tpw_id IS NULL;