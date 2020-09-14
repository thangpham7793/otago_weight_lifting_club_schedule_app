"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var auth_1 = require("./../utils/auth");
var register_1 = require("./../utils/register");
var register_2 = require("../database/register");
var Controller = (function () {
    function Controller(app) {
        this.app = app;
        this.scheduleService = new register_2.ScheduleService();
        this.learnerService = new register_2.LearnerService();
        this.verifyToken = register_1.verifyToken;
        this.routes();
    }
    Controller.prototype.routes = function () {
        this.app.route("/learners/signup").get(function (req, res) {
            res.redirect("../signup.html");
        });
        this.app
            .route("/learners/signup")
            .post(auth_1.checkEmail, register_1.catchAsync(this.learnerService.createLearner));
        this.app
            .route("/learners/login")
            .post(auth_1.checkEmail, register_1.catchAsync(this.learnerService.checkCredentials), register_1.catchAsync(this.scheduleService.getAllSchedules));
        this.app
            .route("/learners/:learnerId/pbs")
            .get(this.verifyToken, register_1.catchAsync(this.learnerService.getPbs));
        this.app
            .route("/learners/:learnerId/pbs")
            .put(this.verifyToken, register_1.catchAsync(this.learnerService.updatePbs));
        this.app
            .route("/programmes")
            .get(register_1.catchAsync(this.scheduleService.getAllProgrammes));
        this.app
            .route("/programmes/:programmeId/schedules")
            .get(this.verifyToken, register_1.catchAsync(this.scheduleService.getAllSchedules));
        this.app
            .route("/schedules/:scheduleId/weeks/:week")
            .get(this.verifyToken, register_1.catchAsync(this.scheduleService.getWeeklySchedule));
        this.app
            .route("/instructor/login")
            .post(this.verifyToken, register_1.catchAsync(this.scheduleService.getAllProgrammes));
    };
    return Controller;
}());
exports.Controller = Controller;
