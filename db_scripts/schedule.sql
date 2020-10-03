INSERT INTO
  schedule ("scheduleName", "weekCount", timetable)
VALUES
  (
    'October 2020 Peaking Cycle',
    6,
    ARRAY['{"day1": "testing"}', '{"day1": "testing"}']   
);

-- cannot use ARRAY[] since the unested array from json does not delimit each elements
-- why does it gives 2 rows of result?
WITH result AS (
  SELECT
    name,
    programme,
    -- it seems that this somehow iterates over both objects
    json_array_elements(timetable -> 'timetable') -> 'week 2' as "week 2"
  FROM
    schedule
)
SELECT
  *
FROM
  result
WHERE
  "week 2" IS NOT NULL;