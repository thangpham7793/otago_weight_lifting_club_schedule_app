-- INSERT INTO student (first_name, programme_id) VALUES ('Marry', 1) RETURNING student_id, first_name, programme_id;

--there are lots of data though

--so basically 2 calls
--sign up
INSERT INTO student (first_name, last_name, username, hashed_password, programme_id) VALUES ('Thang', 'Pham', 'username', 'password', 1) RETURNING *;

-- should retrieve programme name as well ?

-- check login first/may do the join here?
-- if login is correct, send the schedules information public to the client-side
SELECT username, hashed_password, schedule_name, week_count, schedule_id, programme_name   
FROM student st
JOIN schedule sc
ON (st.programme_id = sc.programme_id)
JOIN programme p
ON (st.programme_id = p.programme_id)
WHERE username = 'username';

-- retrieve the week they want
SELECT timetable 
FROM weekly_timetable w 
JOIN schedule s
ON (w.schedule_id = s.schedule_id)
WHERE week = 1 AND s.schedule_id = 1;