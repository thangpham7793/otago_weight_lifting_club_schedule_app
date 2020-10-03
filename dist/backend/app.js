"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var register_1 = require("./utils/register");
var register_2 = require("./controllers/register");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var App = (function () {
    function App() {
        this.app = express_1.default();
        this.setConfig();
        this.useStatic();
        this.controller = new register_2.Controller(this.app);
        this.useErrorHandlers();
    }
    App.prototype.setConfig = function () {
        this.app.use(cookie_parser_1.default());
        this.app.use(body_parser_1.default.json({ limit: "50mb" }));
        this.app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(cors_1.default({ credentials: true, origin: "*" }));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(morgan_1.default(":method :url :status :res[content-length] - :response-time ms"));
    };
    App.prototype.useErrorHandlers = function () {
        this.app.use(register_1.unknownEndpoint);
        this.app.use(register_1.serverError);
    };
    App.prototype.useStatic = function () {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
    };
    return App;
}());
exports.default = new App().app;
