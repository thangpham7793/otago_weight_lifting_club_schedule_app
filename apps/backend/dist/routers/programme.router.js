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
        this.programmeRouter = (0, express_1.Router)();
        this.extractHeaderAuthToken = register_1.extractHeaderAuthToken;
        this.addRoutes(this.programmeRouter);
        this.app.use("/programmes", this.programmeRouter);
    }
    ProgrammeRouter.prototype.addRoutes = function (programmeRouter) {
        programmeRouter.get("/", (0, register_1.catchAsync)(this.programmeService.getAllProgrammes));
        programmeRouter.get("/:programmeId/schedules", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.getAllSchedules));
        programmeRouter.get("/schedules/:scheduleId/weeks/:week", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.getWeeklySchedule));
        programmeRouter.put("/:programmeId/password", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.changeProgrammePassword));
        programmeRouter.get("/schedules/info", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.getAllSchedulesInfo));
        programmeRouter.get("/schedules/:scheduleId/publish/available.programmes", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.getAvailableProgrammesToPublish));
        programmeRouter.post("/schedules", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.createWeeklySchedules));
        programmeRouter.put("/schedules", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.updateWeeklySchedules));
        programmeRouter.delete("/schedules/:scheduleId", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.deleteSchedule));
        programmeRouter.post("/schedules/:scheduleId/publish/", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.publishSchedule));
        programmeRouter.delete("/schedules/:scheduleId/unpublish/:programmeId", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.unpublishSchedule));
        programmeRouter.get("/exercises", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.programmeService.getAllExercises));
    };
    return ProgrammeRouter;
}());
exports.ProgrammeRouter = ProgrammeRouter;
