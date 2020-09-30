"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var register_1 = require("./../routers/register");
var Controller = (function () {
    function Controller(app) {
        this.instructorRouter = new register_1.InstructorRouter(app);
        this.learnerRouter = new register_1.LearnerRouter(app);
        this.scheduleRouter = new register_1.ProgrammeRouter(app);
    }
    return Controller;
}());
exports.Controller = Controller;
