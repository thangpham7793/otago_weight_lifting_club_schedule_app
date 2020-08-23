"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var schedule_service_1 = require("../database/schedule.service");
var Controller = (function () {
    function Controller(app) {
        this.app = app;
        this.scheduleService = new schedule_service_1.ScheduleService();
        this.routes();
    }
    Controller.prototype.routes = function () {
        this.app.route("/").get(this.scheduleService.welcomeMessage);
    };
    return Controller;
}());
exports.Controller = Controller;
