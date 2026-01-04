SELECT 
    COUNT(*) AS citizens_count,
    COUNT(
        CASE
            WHEN GEB > CURRENT_DATE - INTERVAL '18' YEAR THEN 1
            ELSE NULL
        END
    ) AS minors_count
FROM BEWOHNER;