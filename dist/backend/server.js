"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var register_1 = require("./utils/register");
app_1.default.listen(register_1.appConfig.PORT, function () {
    return console.log("Listening on port " + register_1.appConfig.PORT);
});
