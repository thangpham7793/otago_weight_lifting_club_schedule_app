"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRouter = void 0;
var register_1 = require("./../utils/register");
var register_2 = require("./../database/register");
var express_1 = require("express");
var ScheduleRouter = (function () {
    function ScheduleRouter(app) {
        this.app = app;
        this.scheduleService = new register_2.ScheduleService();
        this.scheduleRouter = express_1.Router();
        this.extractHeaderAuthToken = register_1.extractHeaderAuthToken;
        this.addRoutes(this.scheduleRouter);
        this.app.use(this.scheduleRouter);
    }
    ScheduleRouter.prototype.addRoutes = function (scheduleRouter) {
        scheduleRouter.get("/programmes", register_1.catchAsync(register_1.extractHeaderAuthToken), register_1.catchAsync(this.scheduleService.getAllProgrammes));
        scheduleRouter.get("/programmes/:programmeId/schedules", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.scheduleService.getAllSchedules));
        scheduleRouter.get("/programmes/schedules/:scheduleId/weeks/:week", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.scheduleService.getWeeklySchedule));
        scheduleRouter.put("/programmes/:programmeId/password", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.scheduleService.changeProgrammePassword));
    };
    return ScheduleRouter;
}());
exports.ScheduleRouter = ScheduleRouter;
