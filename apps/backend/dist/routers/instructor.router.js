"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorRouter = void 0;
var register_1 = require("./../utils/register");
var register_2 = require("./../database/register");
var express_1 = require("express");
var InstructorRouter = (function () {
    function InstructorRouter(app) {
        this.app = app;
        this.instructorService = new register_2.InstructorService();
        this.scheduleService = new register_2.ProgrammeService();
        this.instructorRouter = (0, express_1.Router)();
        this.extractHeaderAuthToken = register_1.extractHeaderAuthToken;
        this.addRoutes(this.instructorRouter);
        this.app.use("/instructor", this.instructorRouter);
    }
    InstructorRouter.prototype.addRoutes = function (instructorRouter) {
        instructorRouter.post("/login", (0, register_1.catchAsync)(this.instructorService.checkCredentials), (0, register_1.catchAsync)(this.scheduleService.getAllProgrammes));
        instructorRouter.post("/password", (0, register_1.catchAsync)(this.extractHeaderAuthToken), (0, register_1.catchAsync)(this.instructorService.changeInstructorPassword));
    };
    return InstructorRouter;
}());
exports.InstructorRouter = InstructorRouter;
