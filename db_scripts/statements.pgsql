INSERT INTO schedule (schedule_name, week_count, programme_id)
VALUES ('September 2020 Strength', 5, 1);

SELECT * FROM schedule;

ALTER TABLE weekly_timetable 
ALTER COLUMN week TYPE INT 
USING week::integer;

INSERT INTO weekly_timetable (programme_id, schedule_id, week, timetable)
VALUES (1, 1, 1, '{
      "day 1": [
        {
          "exerciseName": "Snatch",
          "instruction": "77% 2r3s"
        },
        {
          "exerciseName": "Split Jerk",
          "instruction": "77% 2r3s"
        },
        {
          "exerciseName": "Front Squat",
          "instruction": "77% 2r3s"
        },
        {
          "exerciseName": "Snatch Pull",
          "instruction": "95% 3r3s"
        },
        {
          "exerciseName": "Snatch Grip Back Extension + Row",
          "instruction": "8r3s"
        }
      ],
      "day 2.5": [
        {
          "exerciseName": "Hang Power Clean Below Knee",
          "instruction": "65% 2r3s"
        },
        {
          "exerciseName": "Pullups",
          "instruction": "4RIR3s or RPE6 6r2s"
        },
        {
          "exerciseName": "Luxiaojun Raise",
          "instruction": "RPE6 10r2s"
        }
      ],
      "day 2": [
        {
          "exerciseName": "Muscle Snatch",
          "instruction": "50% 2r3s"
        },
        {
          "exerciseName": "Clean",
          "instruction": "77% 2r3s"
        },
        {
          "exerciseName": "Push Press",
          "instruction": "77% 3r1s, 72% 3r2s"
        },
        {
          "exerciseName": "Back Squat",
          "instruction": "75% 5r2s"
        },
        {
          "exerciseName": "Situps on Roman Chair or Hanging knee/leg raise",
          "instruction": "RPE6 10r2s or 4RIR2s"
        }
      ],
      "day 3.5": [
        {
          "exerciseName": "Hang Power Snatch Below Knee",
          "instruction": "65% 1r4s"
        },
        {
          "exerciseName": "Power Clean + Power Jerk",
          "instruction": "65% 1r4s"
        },
        {
          "exerciseName": "Seated Box Jump",
          "instruction": "Start easy 4r2s"
        }
      ],
      "day 3": [
        {
          "exerciseName": "Snatch",
          "instruction": "82% 1r4s"
        },
        {
          "exerciseName": "Clean and Jerk",
          "instruction": "82% 1r3s"
        },
        {
          "exerciseName": "Front Squat",
          "instruction": "83% 2r1s, 78% 2r1s"
        },
        {
          "exerciseName": "Bench Press",
          "instruction": "RPE6 6r3s"
        },
        {
          "exerciseName": "Clean Deadlift",
          "instruction": "105% 5r2s"
        }
      ]
    }');

SELECT 
  p.programme_name as programme,
  s.schedule_name as schedule,
  w.timetable as week_1
FROM
  weekly_timetable w
  INNER JOIN schedule s ON w.schedule_id = s.schedule_id
  INNER JOIN programme p ON w.programme_id = p.programme_id
  -- can also use main table to join
WHERE
  w.week = 1 AND w.programme_id = 1 AND w.schedule_id = 1;