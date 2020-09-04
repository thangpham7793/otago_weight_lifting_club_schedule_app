"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = void 0;
exports.checkPassword = function (password, hashed_password) {
    return password === hashed_password;
};
