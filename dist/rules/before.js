"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (value, row, msg, arg) => {
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
