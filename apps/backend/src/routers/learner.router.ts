import {
  catchAsync,
  checkEmail,
  extractHeaderAuthToken,
} from "../utils"
import { LearnerService, ProgrammeService } from "../database"
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

    learnerRouter.put(
      "/practice.bests",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.learnerService.updatePracticeBest)
    )

    learnerRouter.get(
      "/practice.bests/:exerciseName",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.learnerService.getPracticeBestsByExerciseName)
    )

    learnerRouter.get(
      "/:learnerId/practice.bests",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.learnerService.getAllPracticeBestsOfOneLearner)
    )

    learnerRouter.post(
      "/practice.bests",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.learnerService.postNewPracticeBest)
    )

    learnerRouter.delete(
      "/practice.bests/:pbId",
      catchAsync(this.extractHeaderAuthToken),
      catchAsync(this.learnerService.deleteOnePracticeBest)
    )
  }
}
