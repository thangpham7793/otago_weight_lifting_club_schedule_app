import { catchAsync, extractHeaderAuthToken } from "./../utils/register"
import { InstructorService, ScheduleService } from "./../database/register"
import { Router, Application } from "express"

export class InstructorRouter {
  private instructorRouter: Router
  private instructorService: InstructorService
  private scheduleService: ScheduleService
  private extractHeaderAuthToken: typeof extractHeaderAuthToken

  constructor(private app: Application) {
    this.instructorService = new InstructorService()
    this.scheduleService = new ScheduleService()
    this.instructorRouter = Router()
    this.extractHeaderAuthToken = extractHeaderAuthToken
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
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.instructorService.changeInstructorPassword)
    )
  }
}
