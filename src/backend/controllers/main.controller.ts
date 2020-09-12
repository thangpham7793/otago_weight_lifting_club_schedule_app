import { verifyToken } from "./../utils/jwtHelpers"
import { ScheduleService } from "../database/schedule.service"
import { Application, Request, Response } from "express"
import { LearnerService } from "../database/learner.service"

export class Controller {
  private scheduleService: ScheduleService
  private learnerService: LearnerService
  private verifyToken: typeof verifyToken

  constructor(private app: Application) {
    this.scheduleService = new ScheduleService()
    this.learnerService = new LearnerService()
    this.verifyToken = verifyToken
    this.routes()
  }
  //most routes still need to be protected with jwt
  routes() {
    //learners
    this.app.route("/learners/signup").get((req: Request, res: Response) => {
      res.redirect("../signup.html")
    })

    this.app.route("/learners/signup").post(this.learnerService.createLearner)

    this.app
      .route("/learners/login")
      .post(
        this.learnerService.checkCredentials,
        this.scheduleService.getAllSchedules
      )

    this.app
      .route("/learners/:learnerId/pbs")
      .get(this.verifyToken, this.learnerService.getPbs)

    this.app
      .route("/learners/:learnerId/pbs")
      .put(this.verifyToken, this.learnerService.updatePbs)

    //programmes/schedules
    this.app.route("/programmes").get(this.scheduleService.getAllProgrammes)

    this.app
      .route("/programmes/:programmeId/schedules")
      .get(this.verifyToken, this.scheduleService.getAllSchedules)

    this.app
      .route("/schedules/:scheduleId/weeks/:week")
      .get(this.verifyToken, this.scheduleService.getWeeklySchedule)

    //instructor
    this.app
      .route("/instructor/login")
      .post(this.verifyToken, this.scheduleService.getAllProgrammes)
  }
}
