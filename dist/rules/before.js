"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const before = (value, row, msg, arg) => {
    if (typeof value !== 'string') {
        return Promise.reject('Value must be a string');
    }
    const test = Date.parse(value);
    if (typeof arg === 'function') {
        arg = arg(value, row);
    }
    const compare = Date.parse(arg);
    if (test < compare) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
exports.default = before;
