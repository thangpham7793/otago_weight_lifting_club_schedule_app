"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
var dotenv_1 = require("dotenv");
var path_1 = __importDefault(require("path"));
dotenv_1.config({ path: path_1.default.resolve(__dirname, "../.env") });
var localConfig = {
    host: process.env.DOCKER ? "pgsql_db" : "0.0.0.0",
    user: "test_user",
    port: 5432,
    database: "lifting",
    password: "6500826",
};
var herokuConfig = {
    connectionString: process.env.DATABASE_URL || process.env.STORED_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
};
exports.appConfig = {
    PORT: process.env.PORT || 5000,
    DB_CONFIG: herokuConfig,
    TEST_TOKEN: process.env.TEST_TOKEN,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PW: process.env.GMAIL_PW,
    OAUTH_CLIENTID: process.env.OAUTH_CLIENTID,
    OAUTH_CLIENTSECRET: process.env.OAUTH_CLIENTSECRET,
    OAUTH_REFRESHTOKEN: process.env.OAUTH_REFRESHTOKEN,
    OAUTH_ACCESSTOKEN: process.env.OAUTH_ACCESSTOKEN,
};
