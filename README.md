# otago_weight_lifting_club_schedule_app

[Heroku Link](https://lifting-schedule-v2.herokuapp.com/)

A simple web app for lifting instructors to create, update lift schedules and collect learner feedbacks

To run:

- Clone and cd into the repo

Add execute permission to start script, which will run containers, and dump data into postgres:

- chmod +x start.sh
- ./start.sh

Log in to the learner app (phamt/6500826) or instructor app (thangnus@gmail.com/admin) at [localhost:5000](localhost:5000).

To connect to postgres, open [localhost:8080](localhost:8080) and fill in the credentials from db.env