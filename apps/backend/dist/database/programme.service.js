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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgrammeService = void 0;
var bcrypt_1 = require("bcrypt");
var pool_1 = require("./pool");
var programmeServiceHelpers_1 = require("../utils/programmeServiceHelpers");
var register_1 = require("./register");
var ProgrammeService = (function () {
    function ProgrammeService() {
    }
    ProgrammeService.prototype.getAllProgrammes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var statement, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statement = "SELECT \"programmeName\", \"programmeId\" FROM programme;";
                        return [4, (0, register_1.execute)(statement)];
                    case 1:
                        rows = (_a.sent()).rows;
                        if (rows.length === 0) {
                            res.status(404).json({ message: "no programme found" });
                        }
                        else {
                            res.status(200).json({ programmes: rows, token: req.body.token });
                        }
                        return [2];
                }
            });
        });
    };
    ProgrammeService.prototype.getAllSchedules = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, programmeId, programmeName, learnerName, token, snatch, clean, jerk, cleanAndJerk, backSquat, frontSquat, pushPress, pbs, params, statement, rows, schedules;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, programmeId = _a.programmeId, programmeName = _a.programmeName, learnerName = _a.learnerName, token = _a.token, snatch = _a.snatch, clean = _a.clean, jerk = _a.jerk, cleanAndJerk = _a.cleanAndJerk, backSquat = _a.backSquat, frontSquat = _a.frontSquat, pushPress = _a.pushPress;
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
                        return [4, (0, register_1.execute)(statement, params)];
                    case 1:
                        rows = (_b.sent()).rows;
                        schedules = rows.map(function (schedule) {
                            return __assign(__assign({}, schedule), { programmeName: programmeName });
                        });
                        res.status(200).send({ pbs: pbs, schedules: schedules, learnerName: learnerName, token: token });
                        return [2];
                }
            });
        });
    };
    ProgrammeService.prototype.getWeeklySchedule = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, scheduleId, week, params, statement, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, scheduleId = _a.scheduleId, week = _a.week;
                        console.log(scheduleId, week);
                        params = [scheduleId, week].map(function (ele) { return parseInt(ele); });
                        statement = "\n    SELECT timetable[$2] as week_".concat(week, " FROM schedule WHERE \"scheduleId\" = $1;");
                        return [4, (0, register_1.execute)(statement, params)];
                    case 1:
                        rows = (_b.sent()).rows;
                        if (!rows) {
                            res.status(404).json({ message: "no weekly schedule found" });
                        }
                        res.status(200).json(rows[0]["week_".concat(week)]);
                        return [2];
                }
            });
        });
    };
    ProgrammeService.prototype.deleteSchedule = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var scheduleId, params, statement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scheduleId = req.params.scheduleId;
                        console.log("Received schedule Id ".concat(scheduleId));
                        params = [parseInt(scheduleId)];
                        statement = "DELETE FROM schedule WHERE \"scheduleId\" = $1;";
                        return [4, (0, register_1.execute)(statement, params)];
                    case 1:
                        _a.sent();
                        res.status(204).send();
                        return [2];
                }
            });
        });
    };
    ProgrammeService.prototype.getAvailableProgrammesToPublish = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var scheduleId, statement, params, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scheduleId = req.params.scheduleId;
                        statement = "\n    SELECT p.\"programmeId\", p.\"programmeName\" \n    FROM programme p \n    WHERE p.\"programmeId\" NOT IN (\n      SELECT ps.\"programmeId\" \n      FROM programme_schedule ps \n      WHERE ps.\"scheduleId\" = $1\n    );\n    ";
                        params = [parseInt(scheduleId)];
                        return [4, (0, register_1.execute)(statement, params)];
                    case 1:
                        rows = (_a.sent()).rows;
                        if (!rows) {
                            res.status(404).json({ message: "no schedule found" });
                        }
                        res.status(200).json(rows);
                        return [2];
                }
            });
        });
    };
    ProgrammeService.prototype.getAllSchedulesInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var statement, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statement = "\n    SELECT \n    s.\"scheduleId\", s.\"scheduleName\", s.\"weekCount\",\n    p.\"programmeId\", p.\"programmeName\"\n    FROM schedule s\n    LEFT JOIN programme_schedule ps\n    ON s.\"scheduleId\" = ps.\"scheduleId\"\n    LEFT JOIN programme p\n    ON ps.\"programmeId\" = p.\"programmeId\";";
                        return [4, (0, register_1.execute)(statement)];
                    case 1:
                        rows = (_a.sent()).rows;
                        if (!rows) {
                            res.status(404).json({ message: "no schedule found" });
                        }
                        res.status(200).json((0, programmeServiceHelpers_1.scheduleInfoJsonFormatter)(rows));
                        return [2];
                }
            });
        });
    };
    ProgrammeService.prototype.changeProgrammePassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newPassword, programmeId, hashedPassword, params, statement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPassword = req.body.newPassword;
                        programmeId = req.params.programmeId;
                        return [4, (0, bcrypt_1.hash)(newPassword, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        params = [hashedPassword, programmeId];
                        statement = "\n      UPDATE programme \n      SET \"hashedPassword\" = $1 \n      WHERE \"programmeId\" = $2";
                        return [4, (0, register_1.execute)(statement, params)];
                    case 2:
                        _a.sent();
                        res.status(204).send();
                        return [2];
                }
            });
        });
    };
    ProgrammeService.makeWeeklySchedulesString = function (weeklySchedules) {
        return Object.values(weeklySchedules).reduce(function (acc, week, index) {
            if (index === 0) {
                return "'".concat(JSON.stringify(week), "'");
            }
            else {
                return "".concat(acc, ", '").concat(JSON.stringify(week), "'");
            }
        }, "");
    };
    ProgrammeService.prototype.createWeeklySchedules = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, timetable, scheduleName, weekCount, programmeIds, weeklySchedules, params, statement, client, rows, newScheduleId, tasks;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, timetable = _a.timetable, scheduleName = _a.scheduleName, weekCount = _a.weekCount, programmeIds = _a.programmeIds;
                        weeklySchedules = ProgrammeService.makeWeeklySchedulesString(timetable);
                        console.log({ scheduleName: scheduleName, weekCount: weekCount, programmeIds: programmeIds });
                        params = [scheduleName, weekCount];
                        statement = "\n    INSERT INTO schedule (\"scheduleName\", \"weekCount\", timetable)\n    VALUES ($1, $2, ARRAY[".concat(weeklySchedules, "]) \n    RETURNING \"scheduleId\", \"scheduleName\", \"weekCount\"\n    ");
                        return [4, pool_1.pool.connect()];
                    case 1:
                        client = _b.sent();
                        return [4, client.query(statement, params)];
                    case 2:
                        rows = (_b.sent()).rows;
                        newScheduleId = rows[0].scheduleId;
                        if (!(programmeIds.length > 0)) return [3, 4];
                        tasks = programmeIds.map(function (programmeId) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        params = [newScheduleId, programmeId];
                                        statement = "\n        INSERT INTO programme_schedule (\"scheduleId\", \"programmeId\")\n        VALUES ($1, $2);\n        ";
                                        return [4, client.query(statement, params)];
                                    case 1: return [2, _a.sent()];
                                }
                            });
                        }); });
                        return [4, Promise.all(tasks)];
                    case 3:
                        _b.sent();
                        res.status(200).json(rows[0]);
                        _b.label = 4;
                    case 4:
                        res.status(200).json(rows[0]);
                        return [2, client.release()];
                }
            });
        });
    };
    ProgrammeService.prototype.updateWeeklySchedules = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, scheduleName, timetable, scheduleId, weekCount, statement, params, weeklySchedules;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, scheduleName = _a.scheduleName, timetable = _a.timetable, scheduleId = _a.scheduleId, weekCount = _a.weekCount;
                        if (timetable) {
                            weeklySchedules = ProgrammeService.makeWeeklySchedulesString(timetable);
                            params = [scheduleId, scheduleName, weekCount];
                            statement = "\n      UPDATE schedule\n      SET timetable = ARRAY[".concat(weeklySchedules, "], \n      \"scheduleName\" = $2, \n      \"weekCount\" = $3\n      WHERE \"scheduleId\" = $1;\n      ");
                        }
                        else {
                            params = [scheduleId, scheduleName];
                            statement = "\n      UPDATE schedule\n      SET \"scheduleName\" = $2\n      WHERE \"scheduleId\" = $1;\n      ";
                        }
                        return [4, (0, register_1.execute)(statement, params)];
                    case 1:
                        _b.sent();
                        res.status(204).send();
                        return [2];
                }
            });
        });
    };
    ProgrammeService.prototype.unpublishSchedule = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, scheduleId, programmeId, params, statement;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, scheduleId = _a.scheduleId, programmeId = _a.programmeId;
                        console.log(scheduleId, programmeId);
                        params = [parseInt(scheduleId), parseInt(programmeId)];
                        statement = "\n      DELETE FROM programme_schedule\n      WHERE \"scheduleId\" = $1\n      AND \"programmeId\" = $2\n      ";
                        return [4, (0, register_1.execute)(statement, params)];
                    case 1:
                        _b.sent();
                        res.status(204).send();
                        return [2];
                }
            });
        });
    };
    ProgrammeService.prototype.publishSchedule = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var programmeIds, scheduleId, client, params, statement, tasks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        programmeIds = req.body.programmeIds;
                        scheduleId = req.params.scheduleId;
                        console.log("Publish schedule ".concat(scheduleId, " to programmes ").concat(JSON.stringify(programmeIds)));
                        return [4, pool_1.pool.connect()];
                    case 1:
                        client = _a.sent();
                        tasks = programmeIds.map(function (programmeId) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        params = [scheduleId, programmeId];
                                        statement = "\n      INSERT INTO programme_schedule (\"scheduleId\", \"programmeId\")\n      VALUES ($1, $2);\n      ";
                                        return [4, client.query(statement, params)];
                                    case 1: return [2, _a.sent()];
                                }
                            });
                        }); });
                        return [4, Promise.all(tasks)];
                    case 2:
                        _a.sent();
                        res.status(204).send();
                        client.release();
                        return [2];
                }
            });
        });
    };
    ProgrammeService.prototype.getAllExercises = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var statement, rows, exerciseNames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statement = "SELECT * FROM exercise";
                        return [4, (0, register_1.execute)(statement)];
                    case 1:
                        rows = (_a.sent()).rows;
                        exerciseNames = rows.reduce(function (acc, exercise) {
                            return __spreadArray(__spreadArray([], acc, true), [exercise.exerciseName], false);
                        }, []);
                        res.status(200).json({ exerciseNames: exerciseNames });
                        return [2];
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
