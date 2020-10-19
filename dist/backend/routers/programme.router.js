"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgrammeRouter = void 0;
var register_1 = require("../utils/register");
var register_2 = require("../database/register");
var express_1 = require("express");
var ProgrammeRouter = (function () {
    function ProgrammeRouter(app) {
        this.app = app;
        this.programmeService = new register_2.ProgrammeService();
        this.programmeRouter = express_1.Router();
        this.extractHeaderAuthToken = register_1.extractHeaderAuthToken;
        this.addRoutes(this.programmeRouter);
        this.app.use("/programmes", this.programmeRouter);
    }
    ProgrammeRouter.prototype.addRoutes = function (programmeRouter) {
        programmeRouter.get("/", register_1.catchAsync(this.programmeService.getAllProgrammes));
        programmeRouter.get("/:programmeId/schedules", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.programmeService.getAllSchedules));
        programmeRouter.get("/schedules/:scheduleId/weeks/:week", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.programmeService.getWeeklySchedule));
        programmeRouter.put("/:programmeId/password", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.programmeService.changeProgrammePassword));
        programmeRouter.get("/schedules/info", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.programmeService.getAllSchedulesInfo));
        programmeRouter.get("/schedules/:scheduleId/publish/available.programmes", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.programmeService.getAvailableProgrammesToPublish));
        programmeRouter.post("/schedules", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.programmeService.createWeeklySchedules));
        programmeRouter.put("/schedules", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.programmeService.updateWeeklySchedules));
        programmeRouter.delete("/schedules/:scheduleId", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.programmeService.deleteSchedule));
        programmeRouter.post("/schedules/:scheduleId/publish/", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.programmeService.publishSchedule));
        programmeRouter.delete("/schedules/:scheduleId/unpublish/:programmeId", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.programmeService.unpublishSchedule));
    };
    return ProgrammeRouter;
}());
exports.ProgrammeRouter = ProgrammeRouter;
