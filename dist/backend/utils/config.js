"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
var dotenv_1 = require("dotenv");
var path_1 = __importDefault(require("path"));
dotenv_1.config({ path: path_1.default.resolve(__dirname, "../.env") });
var host = process.env.DOCKER ? "pgsql_db" : "0.0.0.0";
var localConfig = {
    host: host,
    user: "test_user",
    port: 5432,
    database: "lifting",
    password: "6500826",
};
var herokuConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
};
var DB_CONFIG = herokuConfig;
var PORT = process.env.PORT || 3000;
exports.appConfig = {
    PORT: PORT,
    DB_CONFIG: DB_CONFIG,
};
