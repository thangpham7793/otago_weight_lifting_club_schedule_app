import {
  catchAsync,
  checkEmail,
  extractHeaderAuthToken,
} from "../utils/index.ts";
import { LearnerService, ProgrammeService } from "../database/index.ts";
import { type Router } from "../types.d.ts";
import { Router as AppRouter } from "npm:express@^4.18";

const router = AppRouter();
addRoutes(router);

export default { path: "/learners", router };

function addRoutes(router: Router) {
  router.get(
    "/",
    extractHeaderAuthToken,
    catchAsync(LearnerService.getAllLearners),
  );

  router.get("/signup", LearnerService.redirectToSignupPage);

  router.post("/signup", checkEmail, catchAsync(LearnerService.createLearner));

  router.post(
    "/login",
    catchAsync(LearnerService.checkCredentials),
    catchAsync(ProgrammeService.getAllSchedules),
  );

  router.get(
    "/pbs",
    extractHeaderAuthToken,
    catchAsync(LearnerService.getPbs),
  );

  router.put(
    "/pbs",
    extractHeaderAuthToken,
    catchAsync(LearnerService.updatePbs),
  );

  router.put(
    "/details",
    extractHeaderAuthToken,
    catchAsync(LearnerService.updateLearnerDetail),
  );

  router.delete(
    "/:learnerId",
    extractHeaderAuthToken,
    catchAsync(LearnerService.deleteLearner),
  );

  router.put(
    "/practice.bests",
    extractHeaderAuthToken,
    catchAsync(LearnerService.updatePracticeBest),
  );

  router.get(
    "/practice.bests/:exerciseName",
    extractHeaderAuthToken,
    catchAsync(LearnerService.getPracticeBestsByExerciseName),
  );

  router.get(
    "/:learnerId/practice.bests",
    extractHeaderAuthToken,
    catchAsync(LearnerService.getAllPracticeBestsOfOneLearner),
  );

  router.post(
    "/practice.bests",
    extractHeaderAuthToken,
    catchAsync(LearnerService.postNewPracticeBest),
  );

  router.delete(
    "/practice.bests/:pbId",
    extractHeaderAuthToken,
    catchAsync(LearnerService.deleteOnePracticeBest),
  );
}
