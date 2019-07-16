"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regex = (value, row, msg, arg) => {
    if (typeof value !== 'string') {
        return Promise.reject('Value must be a string');
    }
    const test = typeof arg === 'function' ? arg(value, row) : arg;
    const regex = new RegExp(test, 'g');
    if (regex.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
exports.default = regex;
