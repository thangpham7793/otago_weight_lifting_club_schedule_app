DROP TABLE schedule;

CREATE TABLE schedule (
  id SERIAL NOT NULL PRIMARY KEY,
  programme VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  timetable JSON NOT NULL
);

INSERT INTO
  schedule (programme, name, timetable)
VALUES
  (
    'Youth and Junior',
    'July-August 2020 Hypertrophy',
    '{
  "timetable": [
    {
      "week 1": {
        "day 1": [
          {
            "exerciseName": "3 position snatch (High Hang, Below Knee, Floor)",
            "options": [{ "scale": "70%", "repSet": "1 + 1 + 1r3s" }]
          },
          {
            "exerciseName": "power clean + split jerk",
            "options": [{ "scale": "70%", "repSet": "1 + 3r3s" }]
          },
          {
            "exerciseName": "back squat",
            "options": [
              { "scale": "70%", "repSet": "8r1s" },
              { "scale": "65%", "repSet": "8r1s" }
            ]
          },
          {
            "exerciseName": "feet elevated pushups",
            "options": [
              { "scale": "3RIR", "repSet": "3s" },
              { "scale": "RPE6", "repSet": "12r2s" }
            ]
          },
          {
            "exerciseName": "situps on GHD/Roman chair",
            "options": [{ "scale": "0", "repSet": "8r3s" }]
          }
        ],
        "day 1.5": [
          {
            "exerciseName": "clean pull",
            "options": [{ "scale": "85%", "repSet": "3r2s" }]
          },
          {
            "exerciseName": "strict press",
            "options": [{ "scale": "RPE6", "repSet": "6r2s" }]
          },
          {
            "exerciseName": "cable row",
            "options": [{ "scale": "RPE6", "repSet": "10r2s" }]
          }
        ]
      }
    },
  {"week 2": {"day 1": [
    {
    "exerciseName": "clean pull",
    "options": [{ "scale": "RPE6", "repSet": "10r2s" }]
    }
    ]
  }}
  ]
}
'
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