import { catchAsync, extractHeaderAuthToken } from "./../utils/register"
import { InstructorService, ProgrammeService } from "./../database/register"
import { Router, Application } from "express"

export class InstructorRouter {
  private instructorRouter: Router
  private instructorService: InstructorService
  private scheduleService: ProgrammeService
  private extractHeaderAuthToken: typeof extractHeaderAuthToken

  constructor(private app: Application) {
    this.instructorService = new InstructorService()
    this.scheduleService = new ProgrammeService()
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
