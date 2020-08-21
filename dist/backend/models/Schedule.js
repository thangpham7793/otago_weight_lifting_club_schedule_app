"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var weightEstimateMethods = ["percentage", "rir", "rep"];
var requiredString = { type: String, required: true };
var requiredNumber = { type: Number, required: true };
var ExerciseSchema = new mongoose_1.Schema({
    name: requiredString,
    type: __assign(__assign({}, requiredString), { enum: weightEstimateMethods }),
    value: requiredNumber,
    rep: { type: Number, default: 0 },
    set: requiredNumber,
}, { timestamps: true });
var DaySchema = new mongoose_1.Schema({
    number: requiredString,
    exercises: { type: [ExerciseSchema], required: true },
}, { timestamps: true });
var WeeklyScheduleSchema = new mongoose_1.Schema({
    group: requiredString,
    number: requiredString,
    days: { type: [DaySchema], required: true },
}, { timestamps: true });
var WeeklySchedule = mongoose_2.default.model("Schedule", WeeklyScheduleSchema);
exports.default = WeeklySchedule;
