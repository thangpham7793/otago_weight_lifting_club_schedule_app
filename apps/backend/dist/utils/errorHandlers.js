"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = exports.serverError = exports.httpError = exports.catchAsync = void 0;
var path_1 = __importDefault(require("path"));
var dotenv_1 = require("dotenv");
var catchAsync = function (handler) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return handler.apply(void 0, args).catch(args[2]);
}; };
exports.catchAsync = catchAsync;
var httpError = (function (_super) {
    __extends(httpError, _super);
    function httpError(status, message, code, detail) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.code = code;
        _this.detail = detail;
        return _this;
    }
    return httpError;
}(Error));
exports.httpError = httpError;
(0, dotenv_1.config)({ path: path_1.default.resolve(__dirname, "../.env") });
var serverError = function (err, req, res, next) {
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }
    else if (err.code) {
        console.log(err);
        switch (err.code) {
            case "23505":
                if (err.detail.includes("Key (email)") &&
                    err.detail.includes("already exists")) {
                    return res.status(400).json({ message: "Email Already Used!" });
                }
                return res.status(400).json({ message: "".concat(err.detail) });
            case "22004":
                return res.status(404).json({ message: "no schedule found" });
            default:
                return res.status(400).json({ message: err.detail });
        }
    }
    else {
        res.status(500).json({ message: "Something wrong happen ".concat(err) });
    }
    return;
};
exports.serverError = serverError;
var unknownEndpoint = function (req, res, next) {
    res.redirect(301, "/");
};
exports.unknownEndpoint = unknownEndpoint;
