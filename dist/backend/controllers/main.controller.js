"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var jwtHelpers_1 = require("./../utils/jwtHelpers");
var schedule_service_1 = require("../database/schedule.service");
var learner_service_1 = require("../database/learner.service");
var Controller = (function () {
    function Controller(app) {
        this.app = app;
        this.scheduleService = new schedule_service_1.ScheduleService();
        this.learnerService = new learner_service_1.LearnerService();
        this.verifyToken = jwtHelpers_1.verifyToken;
        this.routes();
    }
    Controller.prototype.routes = function () {
        this.app.route("/learners/signup").get(function (req, res) {
            res.redirect("../signup.html");
        });
        this.app.route("/learners/signup").post(this.learnerService.createLearner);
        this.app
            .route("/learners/login")
            .post(this.learnerService.checkCredentials, this.scheduleService.getAllSchedules);
        this.app
            .route("/learners/:learnerId/pbs")
            .get(this.verifyToken, this.learnerService.getPbs);
        this.app
            .route("/learners/:learnerId/pbs")
            .put(this.verifyToken, this.learnerService.updatePbs);
        this.app.route("/programmes").get(this.scheduleService.getAllProgrammes);
        this.app
            .route("/programmes/:programmeId/schedules")
            .get(this.verifyToken, this.scheduleService.getAllSchedules);
        this.app
            .route("/schedules/:scheduleId/weeks/:week")
            .get(this.verifyToken, this.scheduleService.getWeeklySchedule);
        this.app
            .route("/instructor/login")
            .post(this.verifyToken, this.scheduleService.getAllProgrammes);
    };
    return Controller;
}());
exports.Controller = Controller;
