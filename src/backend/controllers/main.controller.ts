import { InstructorRouter } from "./../routers/register"
import { Application, Request, Response } from "express"
import {
  catchAsync,
  extractHeaderAuthToken,
  checkEmail,
} from "./../utils/register"
import { LearnerService, ScheduleService } from "../database/register"

export class Controller {
  private scheduleService: ScheduleService
  private learnerService: LearnerService
  private extractHeaderAuthToken: typeof extractHeaderAuthToken
  private instructorRouter: InstructorRouter

  constructor(private app: Application) {
    this.scheduleService = new ScheduleService()
    this.learnerService = new LearnerService()
    this.instructorRouter = new InstructorRouter(app)
    this.extractHeaderAuthToken = extractHeaderAuthToken
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
      .route("/learners/pbs")
      .get(
        catchAsync(this.extractHeaderAuthToken),
        catchAsync(this.learnerService.getPbs)
      )

    this.app
      .route("/learners/pbs")
      .put(
        catchAsync(this.extractHeaderAuthToken),
        catchAsync(this.learnerService.updatePbs)
      )

    //programmes/schedules
    this.app
      .route("/programmes")
      //TODO: should I check for Bearer Auth here?
      .get(catchAsync(this.scheduleService.getAllProgrammes))

    this.app
      .route("/programmes/:programmeId/schedules")
      .get(
        catchAsync(this.extractHeaderAuthToken),
        catchAsync(this.scheduleService.getAllSchedules)
      )

    this.app
      .route("/schedules/:scheduleId/weeks/:week")
      .get(
        catchAsync(this.extractHeaderAuthToken),
        catchAsync(this.scheduleService.getWeeklySchedule)
      )

    this.app
      .route("/programmes/:programmeId/password")
      .put(
        catchAsync(this.extractHeaderAuthToken),
        catchAsync(this.scheduleService.changeProgrammePassword)
      )

    // //instructor
    // this.app
    //   .route("/instructor/login")
    //   .post(catchAsync(this.scheduleService.getAllProgrammes))
  }
}
