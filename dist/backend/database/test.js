"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pool_1 = __importDefault(require("./pool"));
var schedules = {
    programme: "Youth and Junior",
    name: "September 2020 Strength",
    schedule: {
        "week 1": {
            "day 1": [
                {
                    exerciseName: "Snatch",
                    instruction: "77% 2r3s",
                },
                {
                    exerciseName: "Split Jerk",
                    instruction: "77% 2r3s",
                },
                {
                    exerciseName: "Front Squat",
                    instruction: "77% 3r3s",
                },
                {
                    exerciseName: "Snatch Pull",
                    instruction: "95% 3r3s",
                },
                {
                    exerciseName: "Snatch Grip Back Extension + Row",
                    instruction: "RPE6 8r3s",
                },
            ],
            "day 2.5": [
                {
                    exerciseName: "Hang Power Clean Below Knee",
                    instruction: "65% 2r3s",
                },
                {
                    exerciseName: "Pullups",
                    instruction: "4RIR3s or RPE6 6r2s",
                },
                {
                    exerciseName: "Luxiaojun Raise",
                    instruction: "RPE6 10r2s",
                },
            ],
            "day 2": [
                {
                    exerciseName: "Muscle Snatch",
                    instruction: "50% 2r3s",
                },
                {
                    exerciseName: "Clean",
                    instruction: "77% 2r3s",
                },
                {
                    exerciseName: "Push Press",
                    instruction: "77% 3r1s, 72% 3r2s",
                },
                {
                    exerciseName: "Back Squat",
                    instruction: "75% 5r2s",
                },
                {
                    exerciseName: "Situps on Roman Chair or Hanging knee/leg raise",
                    instruction: "RPE6 10r2s or 4RIR2s",
                },
            ],
            "day 3.5": [
                {
                    exerciseName: "Hang Power Snatch Below Knee",
                    instruction: "65% 1r4s",
                },
                {
                    exerciseName: "Power Clean + Power Jerk",
                    instruction: "65% 1r4s",
                },
                {
                    exerciseName: "Seated Box Jump",
                    instruction: "Start easy 4r2s",
                },
            ],
            "day 3": [
                {
                    exerciseName: "Snatch",
                    instruction: "82% 1r4s",
                },
                {
                    exerciseName: "Clean and Jerk",
                    instruction: "82% 1r3s",
                },
                {
                    exerciseName: "Front Squat",
                    instruction: "83% 2r1s, 78% 2r1s",
                },
                {
                    exerciseName: "Bench Press",
                    instruction: "RPE6 6r3s",
                },
                {
                    exerciseName: "Clean Deadlift",
                    instruction: "105% 5r2s",
                },
            ],
        },
        "week 2": {
            "day 1": [
                {
                    exerciseName: "Snatch",
                    instruction: "80% 2r4s",
                },
                {
                    exerciseName: "Split Jerk",
                    instruction: "80% 2r4s",
                },
                {
                    exerciseName: "Front Squat",
                    instruction: "80% 3r4s",
                },
                {
                    exerciseName: "Snatch Pull",
                    instruction: "100% 3r4s",
                },
                {
                    exerciseName: "Snatch Grip Back Extension + Row",
                    instruction: "RPE7 8r3s",
                },
            ],
            "day 2.5": [
                {
                    exerciseName: "Hang Power Clean Below Knee",
                    instruction: "68% 2r3s",
                },
                {
                    exerciseName: "Pullups",
                    instruction: "3RIR3s or RPE7 6r3s",
                },
                {
                    exerciseName: "Luxiaojun Raise",
                    instruction: "RPE7 10r3s",
                },
            ],
            "day 2": [
                {
                    exerciseName: "Muscle Snatch",
                    instruction: "55% 2r3s",
                },
                {
                    exerciseName: "Clean",
                    instruction: "80% 2r4s",
                },
                {
                    exerciseName: "Push Press",
                    instruction: "81% 3r1s, 76% 3r2s",
                },
                {
                    exerciseName: "Back Squat",
                    instruction: "79% 5r3s",
                },
                {
                    exerciseName: "Situps on Roman Chair or Hanging knee/leg raise",
                    instruction: "RPE7 10r3s or 3RIR3s",
                },
            ],
            "day 3.5": [
                {
                    exerciseName: "Hang Power Snatch Below Knee",
                    instruction: "68% 1r4s",
                },
                {
                    exerciseName: "Power Clean + Power Jerk",
                    instruction: "68% 1r4s",
                },
                {
                    exerciseName: "Seated Box Jump",
                    instruction: "4r3s",
                },
            ],
            "day 3": [
                {
                    exerciseName: "Snatch",
                    instruction: "85% 1r4s",
                },
                {
                    exerciseName: "Clean and Jerk",
                    instruction: "85% 1r4s",
                },
                {
                    exerciseName: "Front Squat",
                    instruction: "86% 2r1s, 81% 2r2s",
                },
                {
                    exerciseName: "Bench Press",
                    instruction: "RPE7 6r3s",
                },
                {
                    exerciseName: "Clean Deadlift",
                    instruction: "110% 5r3s",
                },
            ],
        },
        "week 3": {
            "day 1": [
                {
                    exerciseName: "Snatch",
                    instruction: "83% 2r4s",
                },
                {
                    exerciseName: "Split Jerk",
                    instruction: "83% 2r4s",
                },
                {
                    exerciseName: "Front Squat",
                    instruction: "83% 3r4s",
                },
                {
                    exerciseName: "Snatch Pull",
                    instruction: "105% 3r4s",
                },
                {
                    exerciseName: "Snatch Grip Back Extension + Row",
                    instruction: "RPE8 8r4s",
                },
            ],
            "day 2.5": [
                {
                    exerciseName: "Hang Power Clean Below Knee",
                    instruction: "71% 2r3s",
                },
                {
                    exerciseName: "Pullups",
                    instruction: "2RIR4s or RPE8 6r3s",
                },
                {
                    exerciseName: "Luxiaojun Raise",
                    instruction: "RPE8 10r3s",
                },
            ],
            "day 2": [
                {
                    exerciseName: "Muscle Snatch",
                    instruction: "58% 2r3s",
                },
                {
                    exerciseName: "Clean",
                    instruction: "83% 2r4s",
                },
                {
                    exerciseName: "Push Press",
                    instruction: "84% 3r1s, 79% 3r2s",
                },
                {
                    exerciseName: "Back Squat",
                    instruction: "82% 5r3s",
                },
                {
                    exerciseName: "Situps on Roman Chair or Hanging knee/leg raise",
                    instruction: "RPE8 10r3s or 2RIR4s",
                },
            ],
            "day 3.5": [
                {
                    exerciseName: "Hang Power Snatch Below Knee",
                    instruction: "71% 1r4s",
                },
                {
                    exerciseName: "Power Clean + Power Jerk",
                    instruction: "71% 1r4s",
                },
                {
                    exerciseName: "Seated Box Jump",
                    instruction: "4r4s",
                },
            ],
            "day 3": [
                {
                    exerciseName: "Snatch",
                    instruction: "88% 1r5s",
                },
                {
                    exerciseName: "Clean and Jerk",
                    instruction: "88% 1r4s",
                },
                {
                    exerciseName: "Front Squat",
                    instruction: "89% 2r1s, 81% 2r2s",
                },
                {
                    exerciseName: "Bench Press",
                    instruction: "RPE8 6r4s",
                },
                {
                    exerciseName: "Clean Deadlift",
                    instruction: "115% 5r3s",
                },
            ],
        },
        "week 4": {
            "day 1": [
                {
                    exerciseName: "Snatch",
                    instruction: "83% 2r1s, 87% 2r1s, 90% 2r1s, heavier?",
                },
                {
                    exerciseName: "Split Jerk",
                    instruction: "83% 2r1s, 87% 2r1s, 90% 2r1s, heavier?",
                },
                {
                    exerciseName: "Front Squat",
                    instruction: "85% 3r2s",
                },
                {
                    exerciseName: "Snatch Pull",
                    instruction: "108% 3r3s",
                },
                {
                    exerciseName: "Snatch Grip Back Extension + Row",
                    instruction: "RPE9 8r4s",
                },
            ],
            "day 2.5": [
                {
                    exerciseName: "Hang Power Clean Below Knee",
                    instruction: "74% 2r2s",
                },
                {
                    exerciseName: "Pullups",
                    instruction: "1RIR3s or RPE9 6r2s",
                },
                {
                    exerciseName: "Luxiaojun Raise",
                    instruction: "RPE9 10r2s",
                },
            ],
            "day 2": [
                {
                    exerciseName: "Muscle Snatch",
                    instruction: "61% 2r3s",
                },
                {
                    exerciseName: "Clean",
                    instruction: "83% 2r1s, 87% 2r1s, 90% 2r1s, heavier?",
                },
                {
                    exerciseName: "Push Press",
                    instruction: "1RM",
                },
                {
                    exerciseName: "Back Squat",
                    instruction: "85% 5r1s",
                },
                {
                    exerciseName: "Situps on Roman Chair or Hanging knee/leg raise",
                    instruction: "RPE9 10r3s or 1RIR4s",
                },
            ],
            "day 3.5": [
                {
                    exerciseName: "Hang Power Snatch Below Knee",
                    instruction: "74% 1r3s",
                },
                {
                    exerciseName: "Power Clean + Power Jerk",
                    instruction: "74% 1r3s",
                },
                {
                    exerciseName: "Seated Box Jump",
                    instruction: "4r2s",
                },
            ],
            "day 3": [
                {
                    exerciseName: "Snatch",
                    instruction: "Heavy Single",
                },
                {
                    exerciseName: "Clean and Jerk",
                    instruction: "Heavy Single",
                },
                {
                    exerciseName: "Front Squat",
                    instruction: "2RM or 1RM",
                },
                {
                    exerciseName: "Bench Press",
                    instruction: "5RM",
                },
                {
                    exerciseName: "Clean Deadlift",
                    instruction: "5RM",
                },
            ],
        },
        "week 5": {
            "day 1": [
                {
                    exerciseName: "Snatch",
                    instruction: "75% 1r4s",
                },
                {
                    exerciseName: "Split Jerk",
                    instruction: "75% 1r4s",
                },
                {
                    exerciseName: "Front Squat",
                    instruction: "75% 2r2s",
                },
                {
                    exerciseName: "Snatch Pull",
                    instruction: "95% 2r2s",
                },
                {
                    exerciseName: "Snatch Grip Back Extension + Row",
                    instruction: "RPE5 6r2s",
                },
            ],
            "day 2.5": [
                {
                    exerciseName: "Hang Power Clean Below Knee",
                    instruction: "65% 1r4s",
                },
                {
                    exerciseName: "Pullups",
                    instruction: "5RIR2s or RPE5 4r2s",
                },
                {
                    exerciseName: "Luxiaojun Raise",
                    instruction: "RPE5 8r2s",
                },
            ],
            "day 2": [
                {
                    exerciseName: "Muscle Snatch",
                    instruction: "50% 1r4s",
                },
                {
                    exerciseName: "Clean",
                    instruction: "75% 1r4s",
                },
                {
                    exerciseName: "Push Press",
                    instruction: "70% 2r3s",
                },
                {
                    exerciseName: "Back Squat",
                    instruction: "70% 3r2s",
                },
                {
                    exerciseName: "Situps on Roman Chair or Hanging knee/leg raise",
                    instruction: "RPE5 8r2s or 5RIR2s",
                },
            ],
            "day 3.5": [
                {
                    exerciseName: "Hang Power Snatch Below Knee",
                    instruction: "65% 1r3s",
                },
                {
                    exerciseName: "Power Clean + Power Jerk",
                    instruction: "65% 1r2s",
                },
                {
                    exerciseName: "Seated Box Jump",
                    instruction: "3r3s",
                },
            ],
            "day 3": [
                {
                    exerciseName: "Snatch",
                    instruction: "78% 1r3s",
                },
                {
                    exerciseName: "Clean and Jerk",
                    instruction: "78% 1r3s",
                },
                {
                    exerciseName: "Front Squat",
                    instruction: "70% 1r4s",
                },
                {
                    exerciseName: "Bench Press",
                    instruction: "RPE5 5r2s",
                },
                {
                    exerciseName: "Clean Deadlift",
                    instruction: "100% 3r3s",
                },
            ],
        },
    },
};
var testConn = function (pool) { return __awaiter(void 0, void 0, void 0, function () {
    var client, name_1, schedule, scheduleArr, rows, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4, pool.connect()];
            case 1:
                client = _a.sent();
                console.log("Connected successfully!");
                name_1 = schedules.name, schedule = schedules.schedule;
                scheduleArr = Object.values(schedule);
                return [4, client.query('SELECT timetable[3] FROM schedule WHERE "scheduleId" = 6;')];
            case 2:
                rows = (_a.sent()).rows;
                console.log(JSON.parse(rows[0].timetable));
                return [4, client.release()];
            case 3:
                _a.sent();
                return [4, pool.end()];
            case 4:
                _a.sent();
                return [3, 6];
            case 5:
                error_1 = _a.sent();
                console.log("Something went wrong!", error_1);
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
testConn(pool_1.default);
