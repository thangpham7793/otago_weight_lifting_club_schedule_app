# otago_weight_lifting_club_schedule_app

A simple web app for lifting instructors to create, update lift schedules and collect learner feedbacks

To run:

- Clone and cd into `apps/backend`
- Change sample_env into .env (missing values are for prod env, local will run normally)

Add execute permission to start script, which will run containers, and dump data into postgres:

- chmod +x start.sh
- ./start.sh

Log in to the learner app (thomash/password) or instructor app (admin@admin.com/admin) at [localhost:5000](localhost:5000).

To connect to postgres, open [localhost:8080](localhost:8080) and fill in the credentials from db.env
