"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../utils/config");
var pg_1 = require("pg");
var pool = new pg_1.Pool(config_1.appConfig.DB_CONFIG);
exports.default = pool;
