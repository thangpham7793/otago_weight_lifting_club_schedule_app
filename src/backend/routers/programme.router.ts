import { catchAsync, extractHeaderAuthToken } from "../utils/register"
import { ProgrammeService } from "../database/register"
import { Router, Application } from "express"

export class ProgrammeRouter {
  private programmeRouter: Router
  private programmeService: ProgrammeService
  private extractHeaderAuthToken: typeof extractHeaderAuthToken

  constructor(private app: Application) {
    this.programmeService = new ProgrammeService()
    this.programmeRouter = Router()
    this.extractHeaderAuthToken = extractHeaderAuthToken
    this.addRoutes(this.programmeRouter)
    this.app.use("/programmes", this.programmeRouter)
  }

  addRoutes(programmeRouter: Router) {
    //don't ask for auth since it's used for signing up
    programmeRouter.get("/", catchAsync(this.programmeService.getAllProgrammes))

    programmeRouter.get(
      "/:programmeId/schedules",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.programmeService.getAllSchedules)
    )

    programmeRouter.get(
      "/schedules/:scheduleId/weeks/:week",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.programmeService.getWeeklySchedule)
    )

    programmeRouter.put(
      "/:programmeId/password",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.programmeService.changeProgrammePassword)
    )
  }
}