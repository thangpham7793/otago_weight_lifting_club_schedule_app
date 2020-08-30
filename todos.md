### Outcomes

[] User can select schedule name, week name to search after logging in
[] User can sign up and add themselves to a programme

[x] Users can type in their pbs and update it.
[x] Weight should be calculated
[] Auto-suggest when making new schedules

### Questions

[] What other information Callan may need when he reads a student's comment besides the actual content and the student's name?
[x] Are there multiple existing schedules for a programme? Yes

### Implementation Issues

[] How to use browserify with multiple scripts? Probably need to incorporate some tools?? As of right now it's still okay but later on will be a problem
[] Apply basic authentication (Yes or No?)
[] Should user sign up? If yes, then there needs to be a join or at least 2 separate requests
[] Can't really rely on localStorage => need to save name and pbs in db

[x] Fix localStorage bug (simply increase the key version (v2) at the moment)
[x] What happens when mulitple users access the app?
[x] Where to store the personal bests? (local storage?) => It's different for each user right?
[] Learn more about json in POSTGRESQL https://www.postgresql.org/docs/10/datatype-json.html

### Tickets

[] Implement Schedule Search Form by Programme, Schedule Name, and Week
[] Implement basic signup, login, and authentication
[] Test Queries for Client Access Patterns
[] Can't inject Pool/Client into Schedule Service?
[] Persist Schedule Data

[x] Set up test with Jest
[x] Draft schema for Programme, Schedule, Timetable, Student
[x] Update form should be inside a modal
[x] Fix 3 position snatch (High Hang, Below Knee, Floor) bug
[x] Deploy
