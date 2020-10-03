### 1. Quick Demo: 

sign up, login, display schedules, load weekly schedules by day, add pbs, edit pbs (dynamic rendering), and add feedback.

### 2. Folder / File Walkthrough: 

.gitignore, .env, docker, todos (JIRA, issues), nodemon, build/test/dev scripts in package.json

### 3. Backend Source Code: 

server => app => index => controllers => handlers => services => middlewares => tests

- Separation of Concerns (similar functionalities are grouped into its own folders)

- Uniform Interface for Importing Modules ({folderName}/register.ts)

- Dependency Injections Constructors (not quite...)

- Prepared Statements + Connection Pooling to handle concurrency

- Bearer Authentication required for most requests

- Async/Await Error Handlings + DB calls

- Custom ErrorHandlers (catchAsync, httpError, serverError, unknownEndpoint )

- Unit Tests, Integration Tests for API Endpoints (AAA)

- Expressive Variable and Function Names

### 4. Build Pipeline (Heroku)

- Basic understanding of CI/CD

- Deployed on Pushes to Main Github Branch

- Staging App / Production App

- Git Branch for Feature & Testing

### 5. Improvements

- Input Validation (JOI)

- Models/ORMs instead of raw SQL?

- Better Logging

- Better Build Process (grunt, uglify, etc.)

- Separate Database for Testing

- Server-side Caching?

- Load Balancer/Request Throttler