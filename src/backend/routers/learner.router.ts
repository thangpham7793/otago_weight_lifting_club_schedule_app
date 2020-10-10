import {
  catchAsync,
  checkEmail,
  extractHeaderAuthToken,
} from "../utils/register"
import { LearnerService, ProgrammeService } from "../database/register"
import { Router, Application } from "express"

export class LearnerRouter {
  private learnerRouter: Router
  private learnerService: LearnerService
  private scheduleService: ProgrammeService
  private extractHeaderAuthToken: typeof extractHeaderAuthToken

  constructor(private app: Application) {
    this.learnerService = new LearnerService()
    this.scheduleService = new ProgrammeService()
    this.learnerRouter = Router()

    this.extractHeaderAuthToken = extractHeaderAuthToken

    this.app.use("/learners", this.learnerRouter)
    this.addRoutes(this.learnerRouter)
  }

  addRoutes(learnerRouter: Router) {
    learnerRouter.get(
      "/",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.learnerService.getAllLearners)
    )

    learnerRouter.get("/signup", this.learnerService.redirectToSignupPage)

    learnerRouter.post(
      "/signup",
      checkEmail,
      catchAsync(this.learnerService.createLearner)
    )

    learnerRouter.post(
      "/login",
      checkEmail,
      catchAsync(this.learnerService.checkCredentials),
      catchAsync(this.scheduleService.getAllSchedules)
    )

    learnerRouter.get(
      "/pbs",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.learnerService.getPbs)
    )

    learnerRouter.put(
      "/pbs",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.learnerService.updatePbs)
    )

    learnerRouter.put(
      "/details",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.learnerService.updateLearnerDetail)
    )

    learnerRouter.delete(
      "/:learnerId",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.learnerService.deleteLearner)
    )
  }
}
