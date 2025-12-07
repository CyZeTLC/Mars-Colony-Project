SELECT COUNT(*) AS citizens_count,
    COUNT(
        CASE
            WHEN age < 18 THEN 1
            ELSE NULL
        END
    ) AS minors_count
FROM citizens;