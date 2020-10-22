CREATE TABLE IF NOT EXISTS exercise (
    "exerciseName" VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS rep_max (
    "repMax" VARCHAR(3) UNIQUE PRIMARY KEY
);

INSERT INTO rep_max VALUES ('x1'), ('x2'), ('x3'), ('x4'), ('x5'), ('x6'), ('x7'), ('x8'), ('x9'), ('x10');

INSERT INTO exercise VALUES ('snatch'), ('clean and jerk'), ('clean'), ('split jerk'), ('comp snatch'), ('comp clean and jerk'), ('comp total'), ('power snatch'), ('power clean'), ('power jerk'), ('push press'), ('back squat'), ('front squat'), ('overhead squat'), ('hang snatch'), ('hang clean'), ('block snatch'), ('block clean'), ('muscle snatch'), ('strict press'), ('snatch balance'), ('snatch pull'), ('clean pull'), ('snatch deadlift'), ('clean deadlift'), ('pushups'), ('pull-ups'), ('dips');

CREATE TABLE IF NOT EXISTS practice_bests (
    "pbId" SERIAL,
    "learnerId" INT NOT NULL REFERENCES learner("learnerId") ON DELETE CASCADE,
    "exerciseName" VARCHAR(50) NOT NULL REFERENCES exercise("exerciseName") ON DELETE CASCADE,
    "repMax" VARCHAR(3) NOT NULL REFERENCES rep_max("repMax") ON DELETE CASCADE,
    "weight" NUMERIC(5,2) NOT NULL DEFAULT 0,
    "lastEdited" DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY("pbId") -- this ensures uniqueness and "pbId" makes updating and keeping historical record possible
);

-- , "learnerId", "exerciseName", "repMax"

-- first update
INSERT INTO practice_bests ("learnerId", "exerciseName", "repMax", "weight") VALUES (1, 'snatch', 'x1', 100);

-- update using "pbId" (simple) and user doesn't need to pick the date 
UPDATE practice_bests 
SET weight = 120, 
"lastEdited" = CURRENT_DATE 
WHERE "pbId" = 1;

-- insert with date
INSERT INTO practice_bests ("learnerId", "exerciseName", "repMax", "weight", "lastEdited") VALUES (1, 'clean', 'x4', 100, '2020-10-20');

INSERT INTO practice_bests ("learnerId", "exerciseName", "repMax", "weight", "lastEdited") VALUES (1, 'clean', 'x5', 100, '2020-10-20');

INSERT INTO practice_bests ("learnerId", "exerciseName", "repMax", "weight", "lastEdited") VALUES (1, 'clean', 'x7', 100, '2020-10-20');

INSERT INTO practice_bests ("learnerId", "exerciseName", "repMax", "weight", "lastEdited") VALUES (1, 'clean', 'x8', 100, '2020-10-15');

INSERT INTO practice_bests ("learnerId", "exerciseName", "repMax", "weight", "lastEdited") VALUES (1, 'clean and jerk', 'x5', 100, '2020-10-20');

INSERT INTO practice_bests ("learnerId", "exerciseName", "repMax", "weight", "lastEdited") VALUES (1, 'clean and jerk', 'x7', 100, '2020-10-20');

INSERT INTO practice_bests ("learnerId", "exerciseName", "repMax", "weight", "lastEdited") VALUES (1, 'clean and jerk', 'x8', 100, '2020-10-15');


-- get records of one exercise (order by rep max) (when user choose an exercise)
SELECT "pbId", "learnerId", "exerciseName", "repMax", "weight", CAST("lastEdited" as TEXT) FROM practice_bests WHERE "learnerId" = 1 AND "exerciseName" = 'clean and jerk' ORDER BY "repMax";


