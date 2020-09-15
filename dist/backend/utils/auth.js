"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = exports.isEmail = void 0;
exports.isEmail = function (email) {
    var pattern = /^([\w_-]+|[\w_-]+(.[\w_-]+)+?)@([\w_-]+|[\w_-]+(.[\w_-]+)+?)$/;
    return pattern.test(email);
};
exports.checkEmail = function (req, res, next) {
    if (exports.isEmail(req.body.email) === false) {
        return res.status(400).json({ message: "bad email format" });
    }
    else {
        next();
    }
};
