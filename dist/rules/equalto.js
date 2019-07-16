"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equalsTo = (value, row, msg, arg) => {
    if (typeof value !== 'string') {
        return Promise.reject('Value must be a string');
    }
    if (typeof arg === 'function') {
        arg = arg(value, row);
    }
    if (value === arg) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
exports.default = equalsTo;
