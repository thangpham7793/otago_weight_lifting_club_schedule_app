import { catchAsync, extractHeaderAuthToken } from "../utils"
import { ProgrammeService } from "../database"
import { Router } from "express"

const router = Router()
addRoutes(router)

export default { path: "/programmes", router }

function addRoutes(router: Router) {
  router.get("/", catchAsync(ProgrammeService.getAllProgrammes))

  router.get(
    "/:programmeId/schedules",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.getAllSchedules)
  )

  router.get(
    "/schedules/:scheduleId/weeks/:week",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.getWeeklySchedule)
  )

  router.put(
    "/:programmeId/password",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.changeProgrammePassword)
  )

  router.get(
    "/schedules/info",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.getAllSchedulesInfo)
  )

  // get programmes that a shedule has been published to
  router.get(
    "/schedules/:scheduleId/publish/available.programmes",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.getAvailableProgrammesToPublish)
  )

  router.post(
    "/schedules",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.createWeeklySchedules)
  )

  router.put(
    "/schedules",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.updateWeeklySchedules)
  )

  router.delete(
    "/schedules/:scheduleId",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.deleteSchedule)
  )

  router.post(
    //recieves an array of programmeIds in req.body
    "/schedules/:scheduleId/publish/",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.publishSchedule)
  )

  router.delete(
    //DELETE req should not have a body
    "/schedules/:scheduleId/unpublish/:programmeId",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.unpublishSchedule)
  )

  router.get(
    "/exercises",
    catchAsync(extractHeaderAuthToken),
    catchAsync(ProgrammeService.getAllExercises)
  )
}
