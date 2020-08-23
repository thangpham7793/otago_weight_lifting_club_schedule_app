"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
var ScheduleService = (function () {
    function ScheduleService() {
    }
    ScheduleService.prototype.welcomeMessage = function (req, res) {
        return res.status(200).send("Welcome!");
    };
    return ScheduleService;
}());
exports.ScheduleService = ScheduleService;
