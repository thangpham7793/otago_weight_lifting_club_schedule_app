"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnerRouter = void 0;
var register_1 = require("../utils/register");
var register_2 = require("../database/register");
var express_1 = require("express");
var LearnerRouter = (function () {
    function LearnerRouter(app) {
        this.app = app;
        this.learnerService = new register_2.LearnerService();
        this.scheduleService = new register_2.ProgrammeService();
        this.learnerRouter = (0, express_1.Router)();
        this.extractHeaderAuthToken = register_1.extractHeaderAuthToken;
        this.app.use("/learners", this.learnerRouter);
        this.addRoutes(this.learnerRouter);
    }
    LearnerRouter.prototype.addRoutes = function (learnerRouter) {
        learnerRouter.get("/", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.learnerService.getAllLearners));
        learnerRouter.get("/signup", this.learnerService.redirectToSignupPage);
        learnerRouter.post("/signup", register_1.checkEmail, (0, register_1.catchAsync)(this.learnerService.createLearner));
        learnerRouter.post("/login", (0, register_1.catchAsync)(this.learnerService.checkCredentials), (0, register_1.catchAsync)(this.scheduleService.getAllSchedules));
        learnerRouter.get("/pbs", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.learnerService.getPbs));
        learnerRouter.put("/pbs", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.learnerService.updatePbs));
        learnerRouter.put("/details", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.learnerService.updateLearnerDetail));
        learnerRouter.delete("/:learnerId", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.learnerService.deleteLearner));
        learnerRouter.put("/practice.bests", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.learnerService.updatePracticeBest));
        learnerRouter.get("/practice.bests/:exerciseName", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.learnerService.getPracticeBestsByExerciseName));
        learnerRouter.get("/:learnerId/practice.bests", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.learnerService.getAllPracticeBestsOfOneLearner));
        learnerRouter.post("/practice.bests", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.learnerService.postNewPracticeBest));
        learnerRouter.delete("/practice.bests/:pbId", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.learnerService.deleteOnePracticeBest));
    };
    return LearnerRouter;
}());
exports.LearnerRouter = LearnerRouter;