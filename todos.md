### Outcomes

- [   ] User can sign up and add themselves to a programme of their choice
- [   ] User receives descriptive messages on failed login

- [ x ] User can select schedule name, week name to search after logging in
- [ x ] User can log in after they successfully register
- [ x ] Users can type in their pbs and update it.
- [ x ] Weight should be automatically calculated
- [ x ] User can log out
- [ x ] User can go back and choose a different week

### Questions

- [  ] What other information Callan may need when he reads a student's comment besides the actual content and the student's name?
- [ x ] Ask Callan what he wants to see - after he logs in as instructor
- [ x ] Are there multiple existing schedules for a programme? Yes

### Tickets

- [  ] fix 400 error can't update pbs when deployed
- [  ] Should alert user when CAPLOCK is on
- [  ] Handle errors on both sides
- [  ] Refactor client-side scripts
- [  ] Create store procedures for each service
- [  ] Use a framework to make instructor's UI (React/Vue)
- [  ] Figure out Callan's use patterns and write tests
- [  ] Auto-suggest when making new schedules
- [  ] Refactor schedule services to instructor/learner routes
- [  ] Replace JQuery with native functions

- [ x ] Add spinning icon during network calls
- [ x ] rewrite fetch requests on client side to user Bearer Auth Header
- [ x ] Need to switch to bearer authorization scheme to avoid TypeError with fetch requests
- [ x ] Encrypt programmes' passwords with BCrypt
- [ x ] rewrite routes to avoid including user credentials in the url
- [ x ] deploy as a separate app to test on Heroku
- [ x ] does FetchRequest error out on new page load cause pbs to not be saved on mobile ? https://bugzilla.mozilla.org/show_bug.cgi?id=1280189
- [ x ] Added input validation on client side
- [ x ] User can stil sign up with the same email
- [ x ] Programme doesn't default to first option when signing up/this freezes screen with spinner
- [ x ] Added basic custom errors to backend
- [ x ] How to restrict access to certain routes using cookies + jwt
- [ x ] Add logout button
- [ x ] Implement cookie/session so that the browser remembers
- [ x ] Rewrite POST pbs routes & handlers to save pbs using learnerId
- [ x ] Add sign up page
- [ x ] Hide password when user types in login form
- [ x ] Fix Signup CSS Style
- [ x ] Make browser remember session to avoid asking users to login again 
- [ x ] Rewrite tests and handlers to support new schemas
- [ x ] Save and retrieve students' pbs from server
- [ x ] Implement Schedule Search Form by Schedule Name, and Week
- [ x ] Implement basic signup, login, and authentication
- [ x ] Adjust frontend to the APIs using fetch
- [ x ] Set up login so that students can saved their db
- [ x ] Use middleware stacking to protect certain routes
- [ x ] Set up database on heroku PostgreSQL and populate them
- [ x ] Think about when you should fetch pbs from server
- [ x ] Retrieve schedule data from pgsql DB
- [ x ] Finalized schemas based on new input
- [ x ] Fix CSS styling to make login form mobile-responsive
- [ x ] Add basic credentials validation and error message notification
- [ x ] How to make container talk to each other
- [ x ] Persist Schedule Data
- [ x ] Set up routes for frontend to call after user logs in successfuly
- [ x ] Added basic tests for retrieving schedules after user logs in
- [ x ] Set up test with Jest
- [ x ] Draft schema for Programme, Schedule, Timetable, Student
- [ x ] Update form should be inside a modal
- [ x ] Fix 3 position snatch (High Hang, Below Knee, Floor) bug
- [ x ] Deploy
- [ x ] Fix localStorage bug (simply increase the key version (v2) at the moment)
- [ x ] What happens when mulitple users access the app?
- [ x ] Where to store the personal bests? (local storage?) => It's different for each user right?
- [ x ] How to use browserify with multiple scripts? Probably need to incorporate some tools?? As of right now it's still okay but later on will be a problem
- [ x ] Apply basic authentication (Yes or No?)
- [ x ] Should user sign up? If yes, then there needs to be a join or at least 2 separate requests
