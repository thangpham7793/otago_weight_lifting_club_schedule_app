import {
  InstructorRouter,
  ProgrammeRouter,
  LearnerRouter,
} from "./../routers"
import { Application } from "express"

export class Controller {
  instructorRouter: InstructorRouter
  learnerRouter: LearnerRouter
  scheduleRouter: ProgrammeRouter

  constructor(app: Application) {
    this.instructorRouter = new InstructorRouter(app)
    this.learnerRouter = new LearnerRouter(app)
    this.scheduleRouter = new ProgrammeRouter(app)
  }
}
