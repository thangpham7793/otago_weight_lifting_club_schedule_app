"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.config();
var localConfig = {
    host: "0.0.0.0",
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
var DB_CONFIG = process.env.NODE_ENV === "production" ? herokuConfig : localConfig;
var PORT = process.env.PORT || 3000;
exports.appConfig = {
    PORT: PORT,
    DB_CONFIG: DB_CONFIG,
};
