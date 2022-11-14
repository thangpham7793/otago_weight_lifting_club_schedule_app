import { catchAsync, checkEmail, extractHeaderAuthToken } from "../utils"
import { LearnerService, ProgrammeService } from "../database"
import { Router } from "express"

const router = Router()
addRoutes(router)

export default { path: "/learners", router }

function addRoutes(router: Router) {
  router.get(
    "/",
    catchAsync(extractHeaderAuthToken),
    catchAsync(LearnerService.getAllLearners)
  )

  router.get("/signup", LearnerService.redirectToSignupPage)

  router.post("/signup", checkEmail, catchAsync(LearnerService.createLearner))

  router.post(
    "/login",
    catchAsync(LearnerService.checkCredentials),
    catchAsync(ProgrammeService.getAllSchedules)
  )

  router.get(
    "/pbs",
    catchAsync(extractHeaderAuthToken),
    catchAsync(LearnerService.getPbs)
  )

  router.put(
    "/pbs",
    catchAsync(extractHeaderAuthToken),
    catchAsync(LearnerService.updatePbs)
  )

  router.put(
    "/details",
    catchAsync(extractHeaderAuthToken),
    catchAsync(LearnerService.updateLearnerDetail)
  )

  router.delete(
    "/:learnerId",
    catchAsync(extractHeaderAuthToken),
    catchAsync(LearnerService.deleteLearner)
  )

  router.put(
    "/practice.bests",
    catchAsync(extractHeaderAuthToken),
    catchAsync(LearnerService.updatePracticeBest)
  )

  router.get(
    "/practice.bests/:exerciseName",
    catchAsync(extractHeaderAuthToken),
    catchAsync(LearnerService.getPracticeBestsByExerciseName)
  )

  router.get(
    "/:learnerId/practice.bests",
    catchAsync(extractHeaderAuthToken),
    catchAsync(LearnerService.getAllPracticeBestsOfOneLearner)
  )

  router.post(
    "/practice.bests",
    catchAsync(extractHeaderAuthToken),
    catchAsync(LearnerService.postNewPracticeBest)
  )

  router.delete(
    "/practice.bests/:pbId",
    catchAsync(extractHeaderAuthToken),
    catchAsync(LearnerService.deleteOnePracticeBest)
  )
}
