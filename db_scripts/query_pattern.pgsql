-- 1. create a programme
INSERT INTO programme (programme_name) 
VALUES ('Youth and Junior');

-- 2. create a schedule for a programme
-- First, get the list of all programmes
SELECT programme_id, programme_name FROM programme;
-- Second, create an empty schedule for a programme
INSERT INTO schedule (programme_id, schedule_name, week_count) 
VALUES (1, 'July-August 2020 Hypertrophy', 4);

-- 3. create weekly schedules
-- First, get all schedule ids and names
SELECT schedule_id, schedule_name FROM schedule;
-- Next, create a weekly timetable for one schedule
INSERT INTO weekly_timetable (schedule_id, week, timetable) 
VALUES (1, 1, '...');

-- 4. signing up student
-- First, get the list of all programmes
SELECT programme_id, programme_name FROM programme; --can also select programme and get the result as ROW type
-- Second, student adds details and signs up for one programme
INSERT INTO student (programme_id, first_name, last_name, username, password) 
VALUES (1, 'Tom', 'Doe', 'username', 'password');
-- pbs are set to 0 initially

-- 5. retrieve schedule (after logged in or signed up). So should have access to student_id/programme_id
-- First, get all available schedules for a programme joined with schedule
SELECT schedule_name, week_count, schedule_id 
FROM programme p 
INNER JOIN schedule s 
ON (schedule_id = schedule_id); --no need to specify which?
-- Next, based on user's choices, get the timetable for a given week
SELECT timetable 
FROM schedule s --main table
INNER JOIN weekly_timetable w --referencing table
ON (s.schedule_id = w.schedule_id) 
WHERE week = 1;
-- 6. Update/Add Pb with the retreived student_id
UPDATE student 
SET snatch = 100,
    clean = 100,
    jerk = 100,
    cleanAndJerk = 100,
    backSquat = 100,
    frontSquat = 100,
    pushPress = 100
WHERE student_id = 1;