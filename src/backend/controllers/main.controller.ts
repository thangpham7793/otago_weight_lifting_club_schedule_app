import {
  InstructorRouter,
  ProgrammeRouter,
  LearnerRouter,
} from "./../routers/register"
import { Application } from "express"

export class Controller {
  //should be interfaces instead
  instructorRouter: InstructorRouter
  learnerRouter: LearnerRouter
  scheduleRouter: ProgrammeRouter

  //dependency injection
  constructor(app: Application) {
    this.instructorRouter = new InstructorRouter(app)
    this.learnerRouter = new LearnerRouter(app)
    this.scheduleRouter = new ProgrammeRouter(app)
  }
}
