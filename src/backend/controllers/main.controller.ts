import { checkEmail } from "./../utils/auth"
import { catchAsync, verifyToken } from "./../utils/register"
import { LearnerService, ScheduleService } from "../database/register"
import { Application, Request, Response } from "express"

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

    this.app
      .route("/learners/signup")
      .post(checkEmail, catchAsync(this.learnerService.createLearner))

    this.app
      .route("/learners/login")
      .post(
        checkEmail,
        catchAsync(this.learnerService.checkCredentials),
        catchAsync(this.scheduleService.getAllSchedules)
      )

    this.app
      .route("/learners/:learnerId/pbs")
      .get(this.verifyToken, catchAsync(this.learnerService.getPbs))

    this.app
      .route("/learners/:learnerId/pbs")
      .put(this.verifyToken, catchAsync(this.learnerService.updatePbs))

    //programmes/schedules
    this.app
      .route("/programmes")
      .get(catchAsync(this.scheduleService.getAllProgrammes))

    this.app
      .route("/programmes/:programmeId/schedules")
      .get(this.verifyToken, catchAsync(this.scheduleService.getAllSchedules))

    this.app
      .route("/schedules/:scheduleId/weeks/:week")
      .get(this.verifyToken, catchAsync(this.scheduleService.getWeeklySchedule))

    //instructor
    this.app
      .route("/instructor/login")
      .post(this.verifyToken, catchAsync(this.scheduleService.getAllProgrammes))
  }
}
