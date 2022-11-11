"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
var dotenv_1 = require("dotenv");
var path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.resolve(__dirname, "../.env") });
var localConfig = {
    host: process.env.DOCKER ? "db" : "0.0.0.0",
    user: process.env.POSTGRES_USER,
    port: 5432,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
};
var prodDbConfig = {
    connectionString: process.env.DATABASE_URL || process.env.STORED_DATABASE_URL,
};
exports.appConfig = {
    PORT: Number.parseInt(process.env.PORT) || 8080,
    DB_CONFIG: process.env.NODE_ENV !== "production" ? localConfig : prodDbConfig,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PW: process.env.GMAIL_PW,
    OAUTH_CLIENTID: process.env.OAUTH_CLIENTID,
    OAUTH_CLIENTSECRET: process.env.OAUTH_CLIENTSECRET,
    OAUTH_REFRESHTOKEN: process.env.OAUTH_REFRESHTOKEN,
    OAUTH_ACCESSTOKEN: process.env.OAUTH_ACCESSTOKEN,
};
