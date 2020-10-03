"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var config_1 = require("../utils/config");
var pg_1 = require("pg");
exports.pool = new pg_1.Pool(config_1.appConfig.DB_CONFIG);
