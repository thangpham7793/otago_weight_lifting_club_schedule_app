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
        this.learnerRouter = express_1.Router();
        this.extractHeaderAuthToken = register_1.extractHeaderAuthToken;
        this.app.use("/learners", this.learnerRouter);
        this.addRoutes(this.learnerRouter);
    }
    LearnerRouter.prototype.addRoutes = function (learnerRouter) {
        learnerRouter.get("/signup", this.learnerService.redirectToSignupPage);
        learnerRouter.post("/signup", register_1.checkEmail, register_1.catchAsync(this.learnerService.createLearner));
        learnerRouter.post("/login", register_1.checkEmail, register_1.catchAsync(this.learnerService.checkCredentials), register_1.catchAsync(this.scheduleService.getAllSchedules));
        learnerRouter.get("/pbs", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.learnerService.getPbs));
        learnerRouter.put("/pbs", register_1.catchAsync(this.extractHeaderAuthToken), register_1.catchAsync(this.learnerService.updatePbs));
    };
    return LearnerRouter;
}());
exports.LearnerRouter = LearnerRouter;