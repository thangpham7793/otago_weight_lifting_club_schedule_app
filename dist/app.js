"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var App = (function () {
    function App() {
        this.app = express_1.default();
        this.setConfig();
    }
    App.prototype.setConfig = function () {
        this.app.use(body_parser_1.default.json({ limit: "50mb" }));
        this.app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(cors_1.default());
    };
    return App;
}());
exports.default = new App().app;
