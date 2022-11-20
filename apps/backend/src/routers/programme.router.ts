import { catchAsync, extractHeaderAuthToken } from "../utils/index.ts";
import { ProgrammeService } from "../database/index.ts";
import { type Router } from "../types.d.ts";
import { Router as AppRouter } from "npm:express@^4.18";

const router = AppRouter();
addRoutes(router);

export default { path: "/programmes", router };

function addRoutes(router: Router) {
  router.get("/", catchAsync(ProgrammeService.getAllProgrammes));

  router.get(
    "/:programmeId/schedules",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.getAllSchedules),
  );

  router.get(
    "/schedules/:scheduleId/weeks/:week",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.getWeeklySchedule),
  );

  router.put(
    "/:programmeId/password",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.changeProgrammePassword),
  );

  router.get(
    "/schedules/info",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.getAllSchedulesInfo),
  );

  // get programmes that a shedule has been published to
  router.get(
    "/schedules/:scheduleId/publish/available.programmes",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.getAvailableProgrammesToPublish),
  );

  router.post(
    "/schedules",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.createWeeklySchedules),
  );

  router.put(
    "/schedules",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.updateWeeklySchedules),
  );

  router.delete(
    "/schedules/:scheduleId",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.deleteSchedule),
  );

  router.post(
    //recieves an array of programmeIds in req.body
    "/schedules/:scheduleId/publish/",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.publishSchedule),
  );

  router.delete(
    //DELETE req should not have a body
    "/schedules/:scheduleId/unpublish/:programmeId",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.unpublishSchedule),
  );

  router.get(
    "/exercises",
    extractHeaderAuthToken,
    catchAsync(ProgrammeService.getAllExercises),
  );
}
