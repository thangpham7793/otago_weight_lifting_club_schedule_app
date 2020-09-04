import { ScheduleService } from "../database/schedule.service"
import { Application, Request, Response } from "express"
export class Controller {
  private scheduleService: ScheduleService

  constructor(private app: Application) {
    this.scheduleService = new ScheduleService()
    this.routes()
  }

  routes() {
    this.app
      .route("/")
      .get(function welcomeMessage(req: Request, res: Response) {
        res.status(200).send("Hello World!")
      })

    this.app
      .route("/instructor/login")
      .post(function instructorLogin(req: Request, res: Response) {
        res.status(200).send("Under development!")
      })

    this.app
      .route("/learner/login")
      .post(this.scheduleService.checkCredentialsAndGetSchedules)

    this.app
      .route("/programmes/:programmeId/schedules")
      .get(this.scheduleService.getAllSchedules)

    this.app
      .route("/schedules/:scheduleId/weeks/:week")
      .get(this.scheduleService.getWeeklySchedule)
  }
}
