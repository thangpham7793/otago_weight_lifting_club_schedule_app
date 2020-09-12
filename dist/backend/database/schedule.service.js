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
exports.ScheduleService = void 0;
var pool_1 = __importDefault(require("./pool"));
var ScheduleService = (function () {
    function ScheduleService() {
    }
    ScheduleService.prototype.getAllProgrammes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var statement, client, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statement = "SELECT \"programmeName\", \"programmeId\" FROM programme;";
                        return [4, pool_1.default.connect()];
                    case 1:
                        client = _a.sent();
                        return [4, client.query(statement)];
                    case 2:
                        rows = (_a.sent()).rows;
                        if (rows.length === 0) {
                            res.status(404).json({ message: "no programme found" });
                        }
                        else {
                            res.status(200).json(rows);
                        }
                        return [4, client.release()];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ScheduleService.prototype.getAllSchedules = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var client, _a, programmeId, programmeName, token, snatch, clean, jerk, cleanAndJerk, backSquat, frontSquat, pushPress, pbs, params, statement, rows, schedules, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, pool_1.default.connect()];
                    case 1:
                        client = _b.sent();
                        _a = req.body, programmeId = _a.programmeId, programmeName = _a.programmeName, token = _a.token, snatch = _a.snatch, clean = _a.clean, jerk = _a.jerk, cleanAndJerk = _a.cleanAndJerk, backSquat = _a.backSquat, frontSquat = _a.frontSquat, pushPress = _a.pushPress;
                        pbs = {
                            snatch: snatch,
                            clean: clean,
                            jerk: jerk,
                            cleanAndJerk: cleanAndJerk,
                            backSquat: backSquat,
                            frontSquat: frontSquat,
                            pushPress: pushPress,
                        };
                        pbs.snatch = parseFloat(pbs.snatch);
                        pbs.clean = parseFloat(pbs.clean);
                        pbs.jerk = parseFloat(pbs.jerk);
                        pbs.cleanAndJerk = parseFloat(pbs.cleanAndJerk);
                        pbs.backSquat = parseFloat(pbs.backSquat);
                        pbs.frontSquat = parseFloat(pbs.frontSquat);
                        pbs.pushPress = parseFloat(pbs.pushPress);
                        params = [programmeId];
                        statement = "\n    SELECT \n    \"scheduleId\", \"scheduleName\", \"weekCount\" \n    FROM schedule \n    WHERE \"scheduleId\" = ANY(ARRAY(SELECT \"scheduleIds\" FROM programme WHERE \"programmeId\" = $1)); \n    ";
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, 5, 6]);
                        return [4, client.query(statement, params)];
                    case 3:
                        rows = (_b.sent()).rows;
                        schedules = rows.map(function (schedule) {
                            return __assign(__assign({}, schedule), { programmeName: programmeName });
                        });
                        res.cookie("jwt", token, {
                            expires: new Date(Number(new Date()) + 315360000000),
                            httpOnly: true,
                        });
                        console.log("Sending " + token + " to client!");
                        res.status(200).send({ pbs: pbs, schedules: schedules });
                        return [3, 6];
                    case 4:
                        err_1 = _b.sent();
                        console.log(err_1);
                        res.status(404).send({ error: "no available schedule" });
                        return [3, 6];
                    case 5:
                        client.release();
                        return [7];
                    case 6: return [2];
                }
            });
        });
    };
    ScheduleService.prototype.getWeeklySchedule = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, scheduleId, week, params, statement, client, result, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, scheduleId = _a.scheduleId, week = _a.week;
                        params = [scheduleId, week].map(function (ele) { return parseInt(ele); });
                        statement = "\n    SELECT timetable[$2] as week_" + week + " FROM schedule WHERE \"scheduleId\" = $1;";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, 5, 6]);
                        return [4, pool_1.default.connect()];
                    case 2:
                        client = _b.sent();
                        return [4, client.query(statement, params)];
                    case 3:
                        result = _b.sent();
                        if (!result.rows) {
                            throw new Error("no availale weekly schedule found");
                        }
                        res.status(200).json(result.rows[0]["week_" + week]);
                        return [3, 6];
                    case 4:
                        err_2 = _b.sent();
                        console.log(err_2);
                        res.send("Error" + err_2);
                        return [3, 6];
                    case 5:
                        client.release();
                        return [7];
                    case 6: return [2];
                }
            });
        });
    };
    ScheduleService.prototype.endPool = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, pool_1.default.end()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return ScheduleService;
}());
exports.ScheduleService = ScheduleService;
