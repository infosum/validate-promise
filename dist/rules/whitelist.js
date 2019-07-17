"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist = (value, row, msg, arg) => {
    if (typeof value !== 'string') {
        return Promise.reject('Value must be a string');
    }
    if (typeof arg === 'function') {
        arg = arg(value, row);
    }
    if (arg.indexOf(value) !== -1) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
exports.default = whitelist;
