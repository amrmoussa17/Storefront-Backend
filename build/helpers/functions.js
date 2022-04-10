"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPass = void 0;
var config_1 = __importDefault(require("../config"));
var bcrypt_1 = __importDefault(require("bcrypt"));
// using bcrypt module to hash user's password
var hashPass = function (pass) {
    return bcrypt_1.default.hashSync("".concat(pass).concat(config_1.default.pepper), config_1.default.saltRounds);
};
exports.hashPass = hashPass;
