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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnerService = void 0;
var bcrypt_1 = require("bcrypt");
var register_1 = require("./../utils/register");
var pool_1 = require("./pool");
var LearnerService = (function () {
    function LearnerService() {
    }
    LearnerService.prototype.redirectToSignupPage = function (req, res) {
        res.redirect("../signup.html");
    };
    LearnerService.prototype.getAllLearners = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, pool_1.pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4, client.query("SELECT \"learnerId\", \"firstName\", \"lastName\", \"snatch\", clean, jerk, \"cleanAndJerk\", \"backSquat\", \"frontSquat\", \"pushPress\" FROM learner LIMIT 10")];
                    case 2:
                        result = _a.sent();
                        res.status(200).json(result.rows);
                        return [2, client.release()];
                }
            });
        });
    };
    LearnerService.prototype.createLearner = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var newLearnerInfo, statement, params, client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newLearnerInfo = req.body;
                        console.log(req.body);
                        statement = "\n    INSERT INTO learner (\"firstName\", \"lastName\", \"email\", \"programmeId\")\n    VALUES ($1, $2, $3, $4) RETURNING \"firstName\", \"lastName\", \"email\", \"programmeId\"";
                        params = Object.values(newLearnerInfo);
                        console.log(params);
                        return [4, pool_1.pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4, client.query(statement, params)];
                    case 2:
                        result = _a.sent();
                        res.status(201).send(result.rows[0]);
                        return [2, client.release()];
                }
            });
        });
    };
    LearnerService.prototype.checkCredentials = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, params, statement, client, rows, _b, hashedPassword, learnerId, isValidPassword, token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        console.log(email, password);
                        params = [email];
                        statement = "    \n      SELECT \n      p.\"hashedPassword\", p.\"programmeId\", p.\"programmeName\", \n      l.\"learnerId\", l.snatch, l.clean, l.jerk, \n      l.\"cleanAndJerk\", l.\"backSquat\", l.\"frontSquat\", l.\"pushPress\"\n      FROM learner l\n      JOIN programme p \n      USING (\"programmeId\")\n      WHERE email = $1;";
                        return [4, pool_1.pool.connect()];
                    case 1:
                        client = _c.sent();
                        return [4, client.query(statement, params)];
                    case 2:
                        rows = (_c.sent()).rows;
                        if (rows.length === 0) {
                            throw new register_1.httpError(401, "unknown email");
                        }
                        _b = rows[0], hashedPassword = _b.hashedPassword, learnerId = _b.learnerId;
                        return [4, bcrypt_1.compare(password, hashedPassword)];
                    case 3:
                        isValidPassword = _c.sent();
                        if (!isValidPassword) return [3, 5];
                        return [4, register_1.makeToken({ learnerId: learnerId })];
                    case 4:
                        token = _c.sent();
                        req.body = __assign(__assign(__assign({}, req.body), rows[0]), { token: token });
                        next();
                        return [3, 6];
                    case 5: throw new register_1.httpError(401, "wrong password");
                    case 6: return [2, client.release()];
                }
            });
        });
    };
    LearnerService.prototype.getPbs = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var learnerId, params, statement, client, rows, pbs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        learnerId = req.body.token.data.learnerId;
                        console.log("Receiving credentials from Auth Header as " + learnerId);
                        params = [learnerId];
                        statement = "\n    SELECT\n    snatch,\n    clean,\n    jerk,\n    \"cleanAndJerk\",\n    \"backSquat\",\n    \"frontSquat\",\n    \"pushPress\" \n    FROM learner\n    WHERE \"learnerId\" = $1;\n    ";
                        return [4, pool_1.pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4, client.query(statement, params)];
                    case 2:
                        rows = (_a.sent()).rows;
                        pbs = __assign({}, rows[0]);
                        Object.keys(rows[0]).forEach(function (k) {
                            pbs[k] = parseFloat(rows[0][k]);
                        });
                        res.status(200).json(pbs);
                        return [2, client.release()];
                }
            });
        });
    };
    LearnerService.prototype.updatePbs = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, newPbs, params, statement, client;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, token = _a.token, newPbs = _a.newPbs;
                        console.log("Received", token, newPbs);
                        if (!newPbs) {
                            throw new register_1.httpError(400, "Missing new personal bests to update!");
                        }
                        params = __spreadArrays(Object.values(newPbs), [
                            token.data.learnerId,
                        ]).map(function (ele) { return parseFloat(ele); });
                        console.log(params);
                        statement = "\n    UPDATE learner SET\n    snatch = $1,\n    clean = $2,\n    jerk = $3,\n    \"cleanAndJerk\" = $4,\n    \"backSquat\" = $5,\n    \"frontSquat\" = $6,\n    \"pushPress\" = $7\n    WHERE \"learnerId\" = $8;\n    ";
                        return [4, pool_1.pool.connect()];
                    case 1:
                        client = _b.sent();
                        return [4, client.query(statement, params)];
                    case 2:
                        _b.sent();
                        res.status(204).send();
                        return [2, client.release()];
                }
            });
        });
    };
    return LearnerService;
}());
exports.LearnerService = LearnerService;
