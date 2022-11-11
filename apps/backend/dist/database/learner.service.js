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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnerService = void 0;
var bcrypt_1 = require("bcrypt");
var register_1 = require("./../utils/register");
var register_2 = require("./register");
var AppMailer_1 = __importDefault(require("./AppMailer"));
var LearnerService = (function () {
    function LearnerService() {
    }
    LearnerService.prototype.redirectToSignupPage = function (req, res) {
        res.redirect("../signup.html");
    };
    LearnerService.prototype.getAllLearners = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, register_2.execute)("SELECT \"learnerId\", username, email, \"firstName\", \"lastName\", \"snatch\", clean, jerk, \"cleanAndJerk\", \"backSquat\", \"frontSquat\", \"pushPress\" FROM learner ORDER BY \"firstName\"")];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result.rows);
                        return [2];
                }
            });
        });
    };
    LearnerService.prototype.createLearner = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var newLearnerInfo, statement, params, rows, _a, username, learnerId, email;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        newLearnerInfo = req.body;
                        console.log(req.body);
                        newLearnerInfo.username = "".concat(newLearnerInfo.lastName).concat(newLearnerInfo.firstName.substring(0, 1));
                        statement = "\n    INSERT INTO learner (\"firstName\", \"lastName\", \"email\", \"programmeId\", \"username\")\n    VALUES ($1, $2, $3, $4, $5) RETURNING username, \"learnerId\", \"email\";";
                        params = Object.values(newLearnerInfo).map(function (val) {
                            return typeof val === "string" ? val.toLowerCase() : val;
                        });
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        rows = (_b.sent()).rows;
                        _a = rows[0], username = _a.username, learnerId = _a.learnerId, email = _a.email;
                        res.status(201).send({ username: username, learnerId: learnerId });
                        return [4, new AppMailer_1.default(username, email).sendAccountInfo()];
                    case 2: return [2, _b.sent()];
                }
            });
        });
    };
    LearnerService.prototype.checkCredentials = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, params, statement, rows, _b, hashedPassword, learnerId, isValidPassword, token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        console.log(username, password);
                        params = [username.toLowerCase()];
                        statement = "    \n      SELECT \n      p.\"hashedPassword\", p.\"programmeId\", p.\"programmeName\", \n      l.\"learnerId\", CONCAT(l.\"firstName\",' ', l.\"lastName\") as \"learnerName\", \n      l.snatch, l.clean, l.jerk, \n      l.\"cleanAndJerk\", l.\"backSquat\", l.\"frontSquat\", l.\"pushPress\"\n      FROM learner l\n      JOIN programme p \n      USING (\"programmeId\")\n      WHERE username = $1;";
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        rows = (_c.sent()).rows;
                        if (rows.length === 0) {
                            throw new register_1.httpError(401, "unknown username");
                        }
                        _b = rows[0], hashedPassword = _b.hashedPassword, learnerId = _b.learnerId;
                        return [4, (0, bcrypt_1.compare)(password.toLowerCase(), hashedPassword)];
                    case 2:
                        isValidPassword = _c.sent();
                        if (!isValidPassword) return [3, 4];
                        return [4, (0, register_1.makeToken)({ learnerId: learnerId })];
                    case 3:
                        token = _c.sent();
                        req.body = __assign(__assign(__assign({}, req.body), rows[0]), { token: token });
                        next();
                        return [3, 5];
                    case 4: throw new register_1.httpError(401, "wrong password");
                    case 5: return [2];
                }
            });
        });
    };
    LearnerService.prototype.getPbs = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var learnerId, params, statement, rows, pbs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        learnerId = req.body.token.data.learnerId;
                        console.log("Receiving credentials from Auth Header as ".concat(learnerId));
                        params = [learnerId];
                        statement = "\n    SELECT\n    snatch,\n    clean,\n    jerk,\n    \"cleanAndJerk\",\n    \"backSquat\",\n    \"frontSquat\",\n    \"pushPress\" \n    FROM learner\n    WHERE \"learnerId\" = $1;\n    ";
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        rows = (_a.sent()).rows;
                        pbs = __assign({}, rows[0]);
                        Object.keys(rows[0]).forEach(function (k) {
                            pbs[k] = parseFloat(rows[0][k]);
                        });
                        res.status(200).json(pbs);
                        return [2];
                }
            });
        });
    };
    LearnerService.prototype.updatePbs = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, newPbs, params, statement;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, token = _a.token, newPbs = _a.newPbs;
                        console.log("Received", token, newPbs);
                        if (!newPbs) {
                            throw new register_1.httpError(400, "Missing new personal bests to update!");
                        }
                        params = __spreadArray(__spreadArray([], Object.values(newPbs), true), [
                            token.data.learnerId,
                        ], false).map(function (ele) { return parseFloat(ele); });
                        console.log(params);
                        statement = "\n    UPDATE learner SET\n    snatch = $1,\n    clean = $2,\n    jerk = $3,\n    \"cleanAndJerk\" = $4,\n    \"backSquat\" = $5,\n    \"frontSquat\" = $6,\n    \"pushPress\" = $7\n    WHERE \"learnerId\" = $8;\n    ";
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        _b.sent();
                        res.status(204).send();
                        return [2];
                }
            });
        });
    };
    LearnerService.prototype.updateLearnerDetail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, learner, params, statement;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, token = _a.token, learner = _a.learner;
                        console.log("Received", token, learner);
                        if (!learner) {
                            throw new register_1.httpError(400, "Missing Learner Detail!");
                        }
                        params = __spreadArray([], Object.keys(learner), true).map(function (k) {
                            if (!["firstName", "lastName", "email", "username"].includes(k)) {
                                return parseFloat(learner[k]);
                            }
                            else {
                                return learner[k];
                            }
                        });
                        console.log(params);
                        statement = "\n    UPDATE learner SET\n    username = $2,\n    email = $3,\n    \"firstName\" = $4,\n    \"lastName\" = $5,\n    snatch = $6,\n    clean = $7,\n    jerk = $8,\n    \"cleanAndJerk\" = $9,\n    \"backSquat\" = $10,\n    \"frontSquat\" = $11,\n    \"pushPress\" = $12\n    WHERE \"learnerId\" = $1;\n    ";
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        _b.sent();
                        res.status(204).send();
                        return [2];
                }
            });
        });
    };
    LearnerService.prototype.deleteLearner = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var learnerId, params, statement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        learnerId = req.params.learnerId;
                        if (!learnerId) {
                            throw new register_1.httpError(400, "Missing LearnerId!");
                        }
                        params = [parseInt(learnerId)];
                        statement = "\n    DELETE FROM learner\n    WHERE \"learnerId\" = $1;\n    ";
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        _a.sent();
                        res.status(204).send();
                        return [2];
                }
            });
        });
    };
    LearnerService.prototype.updatePracticeBest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pbId, weight, repMax, statement, params;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, pbId = _a.pbId, weight = _a.weight, repMax = _a.repMax;
                        console.log("received", pbId, weight, repMax);
                        statement = "\n      UPDATE practice_bests \n      SET weight = $2, \n      \"repMax\" = $3,\n      \"lastEdited\" = CURRENT_DATE \n      WHERE \"pbId\" = $1;";
                        params = [pbId, weight, repMax];
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        _b.sent();
                        res.status(204).send();
                        return [2];
                }
            });
        });
    };
    LearnerService.prototype.getPracticeBestsByExerciseName = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var exerciseName, learnerId, statement, params, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exerciseName = req.params.exerciseName;
                        learnerId = req.body.token.data.learnerId;
                        console.log("Received", learnerId, exerciseName);
                        statement = "\n      SELECT \"pbId\", \"learnerId\", \"exerciseName\", \n      \"repMax\", \"weight\", \"lastEdited\"::TEXT \n      FROM practice_bests \n      WHERE \"learnerId\" = $1 \n      AND \"exerciseName\" = $2 \n      ORDER BY \"repMax\";";
                        params = [parseInt(learnerId), exerciseName];
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        rows = (_a.sent()).rows;
                        res.status(200).json(rows);
                        return [2];
                }
            });
        });
    };
    LearnerService.prototype.postNewPracticeBest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exerciseName, repMax, weight, learnerId, statement, params, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, exerciseName = _a.exerciseName, repMax = _a.repMax, weight = _a.weight;
                        learnerId = req.body.token.data.learnerId;
                        console.log("Received", learnerId, exerciseName, repMax, parseFloat(weight));
                        statement = "\n    INSERT INTO practice_bests (\"learnerId\", \"exerciseName\", \"repMax\", \"weight\", \"lastEdited\") VALUES ($1, $2, $3, $4, $5) RETURNING \"pbId\", \"exerciseName\", \"repMax\", \"weight\", \"lastEdited\"::TEXT;\n    ";
                        params = [
                            learnerId,
                            exerciseName,
                            repMax,
                            weight,
                            new Date().toISOString().substring(0, 10),
                        ];
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        rows = (_b.sent()).rows;
                        res.status(201).json(rows[0]);
                        return [2];
                }
            });
        });
    };
    LearnerService.prototype.deleteOnePracticeBest = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var pbId, params, statement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pbId = req.params.pbId;
                        if (!pbId) {
                            throw new register_1.httpError(400, "Missing Personal Best Id!");
                        }
                        console.log("Received ".concat(pbId));
                        params = [parseInt(pbId)];
                        statement = "\n    DELETE FROM practice_bests\n    WHERE \"pbId\" = $1;\n    ";
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        _a.sent();
                        res.status(204).send();
                        return [2];
                }
            });
        });
    };
    LearnerService.prototype.getAllPracticeBestsOfOneLearner = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var learnerId, statement, params, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        learnerId = req.params.learnerId;
                        console.log("Getting all practice bests of learner", learnerId);
                        statement = "\n    SELECT \"pbId\", \"exerciseName\", \"repMax\", \"weight\", CAST(\"lastEdited\" as TEXT) \n    FROM practice_bests \n    WHERE \"learnerId\" = $1 \n    ORDER BY \"exerciseName\" ASC, SUBSTRING(\"repMax\", 2,2)::NUMERIC ASC, \"lastEdited\" DESC;";
                        params = [parseInt(learnerId)];
                        return [4, (0, register_2.execute)(statement, params)];
                    case 1:
                        rows = (_a.sent()).rows;
                        res.status(200).json(rows);
                        return [2];
                }
            });
        });
    };
    return LearnerService;
}());
exports.LearnerService = LearnerService;
