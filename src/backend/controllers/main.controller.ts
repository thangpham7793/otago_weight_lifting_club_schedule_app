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
      .route("/programme/:programmeId/schedule/:scheduleId/week/:week")
      .get(this.scheduleService.getWeeklySchedule)
  }
}
