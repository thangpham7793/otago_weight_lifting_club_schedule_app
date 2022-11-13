import { catchAsync, extractHeaderAuthToken } from "./../utils"
import { InstructorService, ProgrammeService } from "./../database"
import { Router, Application } from "express"

const router = Router()
addRoutes(router)

export default { path: "/instructor", router }

function addRoutes(router: Router) {
  router.post(
    "/login",
    catchAsync(InstructorService.checkCredentials),
    catchAsync(ProgrammeService.getAllProgrammes)
  )

  router.post(
    "/password",
    catchAsync(extractHeaderAuthToken),
    catchAsync(InstructorService.changeInstructorPassword)
  )
}
