"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var register_1 = require("./../utils/register");
var register_2 = require("../database/register");
var Controller = (function () {
    function Controller(app) {
        this.app = app;
        this.scheduleService = new register_2.ScheduleService();
        this.learnerService = new register_2.LearnerService();
        this.extractHeaderAuthToken = register_1.extractHeaderAuthToken;
        this.routes();
    }
    Controller.prototype.routes = function () {
        this.app.route("/learners/signup").get(function (req, res) {
            res.redirect("../signup.html");
        });
        this.app
            .route("/learners/signup")
            .post(register_1.checkEmail, register_1.catchAsync(this.learnerService.createLearner));
        this.app
            .route("/learners/login")
            .post(register_1.checkEmail, register_1.catchAsync(this.learnerService.checkCredentials), register_1.catchAsync(this.scheduleService.getAllSchedules));
        this.app
            .route("/learners/pbs")
            .get(register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.learnerService.getPbs));
        this.app
            .route("/learners/pbs")
            .put(register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.learnerService.updatePbs));
        this.app
            .route("/programmes")
            .get(register_1.catchAsync(this.scheduleService.getAllProgrammes));
        this.app
            .route("/programmes/:programmeId/schedules")
            .get(register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.scheduleService.getAllSchedules));
        this.app
            .route("/schedules/:scheduleId/weeks/:week")
            .get(register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.scheduleService.getWeeklySchedule));
        this.app
            .route("/programmes/:programmeId/password")
            .put(register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.scheduleService.changeProgrammePassword));
        this.app
            .route("/instructor/login")
            .post(register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.scheduleService.getAllProgrammes));
    };
    return Controller;
}());
exports.Controller = Controller;
