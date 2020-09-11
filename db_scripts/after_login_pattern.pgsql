

--SIGN UP/LOGIN PAGE
--Get available programmes
SELECT "programmeId", "programmeName" FROM programme;

--when they sign up they won't know the password
INSERT INTO student (first_name, last_name, username, programme_id) VALUES ('Thang', 'Pham', 'username', 'password', 1) RETURNING *;

--REDIRECT TO LOGIN PAGE 

-- check login first/may do the join here?
-- return programmeId if correct
SELECT p."hashedPassword", p."programmeId", p."programmeName"
FROM learner l
JOIN programme p 
USING ("programmeId")
WHERE email = 'thangnus@gmail.com';

-- if not, stay on page?

-- if login is correct, send the schedules information public to the client-side (maybe server-side rendering here actually)
SELECT "scheduleId", "weekCount", "scheduleName" FROM schedule WHERE "scheduleId" = ANY(ARRAY(SELECT "scheduleIds" FROM programme WHERE "programmeId" = 1));

-- retrieve the week they want using array index
SELECT timetable[3] FROM schedule WHERE "scheduleId" = 6;

-- update pbs (just the email?/or userId)


