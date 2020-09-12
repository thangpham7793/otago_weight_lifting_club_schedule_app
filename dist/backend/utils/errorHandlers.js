"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpErrorHandlers = function (err, req, res, next) {
    res.status(500).send({ errorMessage: "Something wrong happen " + err });
};
exports.default = { httpErrorHandlers: httpErrorHandlers };
