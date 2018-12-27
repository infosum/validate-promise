"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_email_1 = __importDefault(require("is-email"));
exports.default = (value, row, msg, arg) => {
    if (is_email_1.default(value)) {
        return Promise.resolve();
    }
    ;
    return Promise.reject(msg(value, row, arg));
};
