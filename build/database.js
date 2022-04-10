"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config_1 = __importDefault(require("./config"));
var client = new pg_1.Pool({
    host: config_1.default.host,
    port: config_1.default.port,
    database: config_1.default.database,
    user: config_1.default.user,
    password: config_1.default.password
});
exports.default = client;
