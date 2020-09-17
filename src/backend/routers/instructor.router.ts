import { catchAsync } from "./../utils/register"
import { InstructorService, ScheduleService } from "./../database/register"
import { Router, Application } from "express"
import { nextTick } from "process"

export class InstructorRouter {
  private instructorRouter: Router
  private instructorService: InstructorService
  private scheduleService: ScheduleService

  constructor(private app: Application) {
    this.instructorService = new InstructorService()
    this.scheduleService = new ScheduleService()
    this.instructorRouter = Router()
    this.addRoutes(this.instructorRouter)
    this.app.use("/instructor", this.instructorRouter)
  }

  addRoutes(instructorRouter: Router) {
    instructorRouter.post(
      "/login",
      catchAsync(this.instructorService.checkCredentials),
      catchAsync(this.scheduleService.getAllProgrammes)
    )

    instructorRouter.post(
      "/password",
      (req, res, next) => {
        console.log(`I'm working!`, req.body)
        next()
      },
      catchAsync(this.instructorService.changeInstructorPassword)
    )
  }
}
