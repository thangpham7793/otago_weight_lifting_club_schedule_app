"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.unknownEndpoint = exports.httpError = exports.catchAsync = void 0;
exports.catchAsync = function (handler) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return handler.apply(void 0, args).catch(args[2]);
}; };
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
exports.unknownEndpoint = function (req, res, next) {
    res.status(404).json({ message: "Unable to locate the requested resource" });
};
exports.serverError = function (err, req, res, next) {
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }
    else if (err.code) {
        switch (err.code) {
            case "23505":
                return res.status(400).json({ message: "email already used" });
            default:
                return res.status(400).json({ message: err.detail });
        }
    }
    else {
        res.status(500).json({ errorMessage: "Something wrong happen " + err });
    }
    return;
};
