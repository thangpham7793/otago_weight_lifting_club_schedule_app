DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS weekly_timetable;
DROP TABLE IF EXISTS schedule;
DROP TABLE IF EXISTS programme;

CREATE TABLE programme (
  programme_id SERIAL PRIMARY KEY,
  programme_name VARCHAR(50) NOT NULL
);

CREATE TABLE schedule (
  schedule_id SERIAL PRIMARY KEY,
  schedule_name VARCHAR(50) NOT NULL,
  week_count INT NOT NULL,
  programme_id INT REFERENCES programme(programme_id) ON DELETE CASCADE -- delete weekly timetables if a schedule is deleted 
);

CREATE TABLE weekly_timetable (
  weekly_timetable_id SERIAL PRIMARY KEY,
  week INT NOT NULL,
  timetable JSON,
  schedule_id INT REFERENCES schedule(schedule_id) ON DELETE CASCADE,
  programme_id INT REFERENCES programme(programme_id) ON DELETE CASCADE 
);

CREATE TABLE student (
  student_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  snatch NUMERIC(5,2) DEFAULT 0,
  clean NUMERIC(5,2) DEFAULT 0,
  jerk NUMERIC(5,2) DEFAULT 0,
  cleanAndJerk NUMERIC(5,2) DEFAULT 0,
  backSquat NUMERIC(5,2) DEFAULT 0,
  frontSquat NUMERIC(5,2) DEFAULT 0,
  pushPress NUMERIC(5,2) DEFAULT 0,
  programme_id INT REFERENCES programme(programme_id) ON DELETE SET NULL
);
