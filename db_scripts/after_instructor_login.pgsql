--SCHEDULE TAB

--instructor logs in (similar to student)
--at least gives him a student account as well

--retrieve all programmes (this happens if logs in successfully)
SELECT "programmeId", "programmeName" FROM programme;
--

--retrieve and display all schedules, even those who haven't been published of a programme
SELECT 
      schedule_id, 
      schedule_name, 
      week_count  
    FROM schedule s
    JOIN programme p
    ON (s.programme_id = p.programme_id)
    WHERE p.programme_id = $1;

--select a schedule 
SELECT timetable, week, weekly_timetable_id, schedule_id 
FROM weekly_timetable
WHERE schedule_id = 1;  --depending on user's choice

--filter schedules based on classes, published or not (client side)

--edit an existing schedule and save (...need to know which weeks have been updated?)
--consider treating each week separately, nah just do 5 inserts/updates really (resending the whole schedule back)
--do this for all week
UPDATE weekly_timetable
SET timetable = '{"value": "edited"}'
WHERE weekly_timetable_id = 1;

--delete a schedule
DELETE FROM schedule 
WHERE schedule_id = 1; --simple

--publish a schedule to a class (make it available for students)
--need to clarify with Callan whether students can only access one schedule at a time
UPDATE schedule
SET programme_id = 1 --add a schedule to an existing programme
WHERE schedule_id = 1;

--make a new schedule and save (hard!) (doo need to retrieve everything)
--make a new schedule first
--a schedule can belong to one class though
--IF IT'S A DRAFT
INSERT INTO schedule (schedule_name, week_count, programme_id)
VALUES ('name', 5, 1) RETURNING schedule_id;
--IF IT'S FINISHED
INSERT INTO schedule (schedule_name, week_count, programme_id, status)
VALUES ('name', 5, 1, 'published') RETURNING schedule_id;

--draft or not, insert weekly content with the returned schedule_id, programme_id;
INSERT INTO weekly_timetable (week, timetable, schedule_id, programme_id)
VALUES (1, '{}', 2, 1);

--STUDENT TAB

--this is a lot though ... (just get their names first?) (need to ask Callan)
SELECT CONCAT(first_name, last_name) as fullName, s.programme_id, p.programme_name 
FROM student s 
JOIN programme p
ON (s.programme_id = p.programme_id);

--retrieve a student's info
SELECT snatch, clean, jerk, cleanandjerk, backsquat, frontsquat, pushpress
FROM student
WHERE student_id = 1;

--then what? update?

