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
UPDATE programme SET "scheduleIds" = "scheduleIds" || 6;
UPDATE programme SET "scheduleIds" = ARRAY_REMOVE("scheduleIds", 6);

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
SELECT * FROM schedule WHERE 1 = ANY(ARRAY(SELECT * FROM res); 
--either works
SELECT * FROM schedule WHERE 1 = ANY(ARRAY(SELECT "scheduleIds" FROM programme WHERE "programmeId" = 1)); 


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

INSERT INTO learner ("firstName", "lastName", email, "programmeId") VALUES ('Thang', 'Pham', 'thangnus@gmail.com', 1);

