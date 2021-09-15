"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excludes = (value, row, msg, arg) => {
    if (typeof value !== 'string') {
        return Promise.reject('Value must be a string');
    }
    if (typeof arg === 'function') {
        arg = arg(value, row);
    }
    if (arg.some((a) => value.includes(a))) {
        return Promise.reject(msg(value, row, arg));
    }
    return Promise.resolve();
};
exports.default = excludes;
