import { ScheduleService } from "../database/schedule.service"
import { Application } from "express"
import { LearnerService } from "../database/learner.service"

export class Controller {
  private scheduleService: ScheduleService
  private learnerService: LearnerService

  constructor(private app: Application) {
    this.scheduleService = new ScheduleService()
    this.learnerService = new LearnerService()
    this.routes()
  }

  routes() {
    this.app.route("/learners/signup").post(this.learnerService.createLearner)

    this.app
      .route("/instructor/login")
      .post(this.scheduleService.getAllProgrammes)

    this.app
      .route("/learners/login")
      .post(this.scheduleService.checkCredentialsAndGetSchedules)

    this.app
      .route("/learners/:learnerId/pbs")
      .put(this.learnerService.updatePbs)

    this.app
      .route("/programmes/:programmeId/schedules")
      .get(this.scheduleService.getAllSchedules)

    this.app
      .route("/schedules/:scheduleId/weeks/:week")
      .get(this.scheduleService.getWeeklySchedule)
  }
}
