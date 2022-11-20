import { catchAsync, extractHeaderAuthToken } from "./../utils/index.ts";
import { InstructorService, ProgrammeService } from "../database/index.ts";
import { type Router } from "../types.d.ts";
import { Router as AppRouter } from "npm:express@^4.18";

const router = AppRouter();
addRoutes(router);

export default { path: "/instructor", router };

function addRoutes(router: Router) {
  router.post(
    "/login",
    catchAsync(InstructorService.checkCredentials),
    catchAsync(ProgrammeService.getAllProgrammes),
  );

  router.post(
    "/password",
    extractHeaderAuthToken,
    catchAsync(InstructorService.changeInstructorPassword),
  );
}
