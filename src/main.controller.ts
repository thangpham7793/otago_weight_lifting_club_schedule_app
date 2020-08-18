import { ScheduleService } from "./services/schedule.service"
import { Application } from "express"

export class Controller {
  private scheduleService: ScheduleService

  constructor(private app: Application) {
    this.scheduleService = new ScheduleService()
    this.routes()
  }

  public routes() {
    this.app.route("/").get(this.scheduleService.welcomeMessage)
  }
}
