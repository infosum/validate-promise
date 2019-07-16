"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_email_1 = __importDefault(require("is-email"));
const email = (value, row, msg, arg) => {
    if (typeof value !== 'string') {
        return Promise.reject('Value must be a string');
    }
    if (is_email_1.default(value)) {
        return Promise.resolve();
    }
    ;
    return Promise.reject(msg(value, row, arg));
};
exports.default = email;
