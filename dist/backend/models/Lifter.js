"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var PBsSchema = new mongoose_1.Schema({
    pb1: Number,
    pb2: Number,
    pb3: Number,
    pb4: Number,
    pb5: Number,
}, { timestamps: true });
var LifterSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    group: { type: String, required: true },
    personalBests: PBsSchema,
    schedule: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "WeeklySchedule",
    },
}, { timestamps: true });
var Lifter = mongoose_2.default.model("Lifter", LifterSchema);
exports.default = Lifter;
