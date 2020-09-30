DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS schedule;
DROP TABLE IF EXISTS programme;

--so when he creates the a programme he will set the password for it as well
CREATE TABLE programme (
  "programmeId" SERIAL PRIMARY KEY,
  "programmeName" VARCHAR(50) NOT NULL,
  "hashedPassword" VARCHAR(100) DEFAULT 'password',
  "scheduleIds" INT[]
);

INSERT INTO programme ("programmeName") VALUES ('Youth and Junior');

-- Not hard to update SCHEDULEIDS
-- add a single element
UPDATE programme SET "scheduleIds" = "scheduleIds" || 6 WHERE "programmeId" = 1;

-- add multiple eles
UPDATE programme SET "scheduleIds" = array_cat("scheduleIds", ARRAY[2,3]) WHERE "programmeId" = 1;

-- remove one ele
UPDATE programme SET "scheduleIds" = ARRAY_REMOVE("scheduleIds", 6) WHERE "programmeId" = 1;

-- this can take care of updating as well!
CREATE TABLE programme_schedule (
  "programmeId" INT NOT NULL REFERENCES programme("programmeId") ON DELETE CASCADE, 
  "scheduleId" INT NOT NULL REFERENCES schedule("scheduleId") ON DELETE CASCADE, 
  PRIMARY KEY("scheduleId", "programmeId")
);

-- To publish a schedule to a certain programme
INSERT INTO programme_schedule
VALUES (@programmeId, @scheduleId);

-- To unpublish a schedule from a certain programme
DELETE FROM programme_schedule
WHERE @scheduleId = ... AND @programmeId = ...;

-- 11

-- To get all schedules belonging to a programme
-- only get timetable when he actually needs to open it 
SELECT s."scheduleName", s."scheduleId", s."weekCount" 
FROM schedule s
JOIN programme_schedule ps
ON s."scheduleId" = ps."scheduleId"
WHERE ps."programmeId" = 1;

-- 9 + 10
-- need to also delete the id from the programme
CREATE TABLE schedule (
  "scheduleId" SERIAL PRIMARY KEY,
  "scheduleName" VARCHAR(50) NOT NULL,
  "weekCount" INT NOT NULL,
  "timetable" TEXT[]
);

-- status VARCHAR(10) DEFAULT 'draft', not necessary since draft will have no referenced programme
INSERT INTO schedule ("scheduleName", "weekCount") VALUES ('September 2020 Strength', 5), ('October 2020 Strength', 6), ('November 2020 Agility', 4) RETURNING "scheduleName", "scheduleId";
-- string must be single-quoted

--https://dba.stackexchange.com/questions/110743/use-array-expression-from-subquery-in-any-condition
WITH res AS (SELECT "scheduleIds" FROM programme WHERE "programmeId" = 1) 
SELECT "scheduleId", "scheduleName", "weekCount" FROM schedule WHERE "scheduleId" = ANY(ARRAY(SELECT * FROM res)); 
--either works
SELECT "scheduleId", "scheduleName", "weekCount" FROM schedule WHERE "scheduleId" = ANY(ARRAY(SELECT "scheduleIds" FROM programme WHERE "programmeId" = 1)); 



--SELECT * FROM schedule WHERE 1 = ANY("programmeId");
CREATE TABLE IF NOT EXISTS learner (
  "learnerId" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(50) NOT NULL,
  "lastName" VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  snatch NUMERIC(5,2) DEFAULT 0,
  clean NUMERIC(5,2) DEFAULT 0,
  jerk NUMERIC(5,2) DEFAULT 0,
  "cleanAndJerk" NUMERIC(5,2) DEFAULT 0,
  "backSquat" NUMERIC(5,2) DEFAULT 0,
  "frontSquat" NUMERIC(5,2) DEFAULT 0,
  "pushPress" NUMERIC(5,2) DEFAULT 0,
  "programmeId" INT REFERENCES programme("programmeId") ON DELETE SET NULL
);

CREATE TABLE instructor (
  "instructorId" SERIAL PRIMARY KEY,
  "email" VARCHAR(50) UNIQUE NOT NULL,
  "hashedPassword" VARCHAR(150) NOT NULL
);

INSERT INTO learner ("firstName", "lastName", email, "programmeId") VALUES ('Thang', 'Pham', 'thangnus@gmail.com', 1);



SELECT timetable[1] as week_5 FROM schedule WHERE "scheduleId" = 6;