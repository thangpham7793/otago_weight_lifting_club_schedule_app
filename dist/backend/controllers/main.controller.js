"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var schedule_service_1 = require("../database/schedule.service");
var learner_service_1 = require("../database/learner.service");
var Controller = (function () {
    function Controller(app) {
        this.app = app;
        this.scheduleService = new schedule_service_1.ScheduleService();
        this.learnerService = new learner_service_1.LearnerService();
        this.routes();
    }
    Controller.prototype.routes = function () {
        this.app
            .route("/instructor/login")
            .post(this.scheduleService.getAllProgrammes);
        this.app
            .route("/learners/login")
            .post(this.scheduleService.checkCredentialsAndGetSchedules);
        this.app
            .route("/learners/:learnerId/pbs")
            .put(this.learnerService.updatePbs);
        this.app
            .route("/programmes/:programmeId/schedules")
            .get(this.scheduleService.getAllSchedules);
        this.app
            .route("/schedules/:scheduleId/weeks/:week")
            .get(this.scheduleService.getWeeklySchedule);
    };
    return Controller;
}());
exports.Controller = Controller;
