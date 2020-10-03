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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgrammeService = void 0;
var octoberSchedule_1 = require("../data/octoberSchedule");
var bcrypt_1 = require("bcrypt");
var pool_1 = require("./pool");
var ProgrammeService = (function () {
    function ProgrammeService() {
    }
    ProgrammeService.prototype.getAllProgrammes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var statement, client, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statement = "SELECT \"programmeName\", \"programmeId\", \"scheduleIds\" FROM programme;";
                        return [4, pool_1.pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4, client.query(statement)];
                    case 2:
                        rows = (_a.sent()).rows;
                        if (rows.length === 0) {
                            res.status(404).json({ message: "no programme found" });
                        }
                        else {
                            res.status(200).json({ programmes: rows, token: req.body.token });
                        }
                        return [2, client.release()];
                }
            });
        });
    };
    ProgrammeService.prototype.getAllSchedules = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var client, _a, programmeId, programmeName, token, snatch, clean, jerk, cleanAndJerk, backSquat, frontSquat, pushPress, pbs, params, statement, rows, schedules;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, pool_1.pool.connect()];
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
                        statement = "\n    SELECT \n    s.\"scheduleId\", s.\"scheduleName\", s.\"weekCount\" \n    FROM programme p\n    JOIN programme_schedule ps\n    ON ps.\"programmeId\" = p.\"programmeId\"\n    JOIN schedule s\n    ON ps.\"scheduleId\" = s.\"scheduleId\"\n    WHERE p.\"programmeId\" = $1 \n    ORDER BY s.\"scheduleId\" DESC;\n    ";
                        return [4, client.query(statement, params)];
                    case 2:
                        rows = (_b.sent()).rows;
                        schedules = rows.map(function (schedule) {
                            return __assign(__assign({}, schedule), { programmeName: programmeName });
                        });
                        res.status(200).send({ pbs: pbs, schedules: schedules, token: token });
                        return [2, client.release()];
                }
            });
        });
    };
    ProgrammeService.prototype.getWeeklySchedule = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, scheduleId, week, params, statement, client, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, scheduleId = _a.scheduleId, week = _a.week;
                        console.log(scheduleId, week);
                        params = [scheduleId, week].map(function (ele) { return parseInt(ele); });
                        statement = "\n    SELECT timetable[$2] as week_" + week + " FROM schedule WHERE \"scheduleId\" = $1;";
                        return [4, pool_1.pool.connect()];
                    case 1:
                        client = _b.sent();
                        return [4, client.query(statement, params)];
                    case 2:
                        result = _b.sent();
                        if (!result.rows) {
                            res.status(404).json({ message: "no weekly schedule found" });
                        }
                        res.status(200).json(result.rows[0]["week_" + week]);
                        return [2, client.release()];
                }
            });
        });
    };
    ProgrammeService.prototype.changeProgrammePassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newPassword, programmeId, hashedPassword, params, statement, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPassword = req.body.newPassword;
                        programmeId = req.params.programmeId;
                        return [4, bcrypt_1.hash(newPassword, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        params = [hashedPassword, programmeId];
                        statement = "\n      UPDATE programme \n      SET \"hashedPassword\" = $1 \n      WHERE \"programmeId\" = $2";
                        return [4, pool_1.pool.connect()];
                    case 2:
                        client = _a.sent();
                        return [4, client.query(statement, params)];
                    case 3:
                        _a.sent();
                        return [2, res.status(204)];
                }
            });
        });
    };
    ProgrammeService.prototype.createWeeklySchedules = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var weeklySchedules, params, statement, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.body = {
                            scheduleName: "Testing",
                            weekCount: 5,
                            timetable: octoberSchedule_1.schedules,
                        };
                        weeklySchedules = Object.values(req.body.timetable).reduce(function (acc, week, index) {
                            if (index === 0) {
                                return "'" + JSON.stringify(week) + "'";
                            }
                            else {
                                return acc + ", '" + JSON.stringify(week) + "'";
                            }
                        }, "");
                        params = ["Testing", 5];
                        statement = "\n    INSERT INTO schedule (\"scheduleName\", \"weekCount\", timetable)\n    VALUES ($1, $2, ARRAY[" + weeklySchedules + "])\n    ";
                        return [4, pool_1.pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4, client.query(statement, params)];
                    case 2:
                        _a.sent();
                        return [2, res.status(201).json()];
                }
            });
        });
    };
    ProgrammeService.prototype.updateWeeklySchedules = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var weeklySchedules, params, statement, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.body = {
                            scheduleId: 12,
                            timetable: octoberSchedule_1.schedules,
                        };
                        weeklySchedules = Object.values(req.body.timetable).reduce(function (acc, week, index) {
                            if (index === 0) {
                                return "'" + JSON.stringify(week) + "'";
                            }
                            else {
                                return acc + ", '" + JSON.stringify(week) + "'";
                            }
                        }, "");
                        params = [req.body.scheduleId];
                        statement = "\n    \n    UPDATE schedule\n    SET timetable = ARRAY[" + weeklySchedules + "]\n    WHERE \"scheduleId\" = $1;\n    ";
                        return [4, pool_1.pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4, client.query(statement, params)];
                    case 2:
                        _a.sent();
                        return [2, res.status(204).json()];
                }
            });
        });
    };
    ProgrammeService.prototype.endPool = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, pool_1.pool.end()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return ProgrammeService;
}());
exports.ProgrammeService = ProgrammeService;
