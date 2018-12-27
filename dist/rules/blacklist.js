"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (value, row, msg, arg) => {
    if (typeof arg === 'function') {
        arg = arg(value, row);
    }
    if (arg.indexOf(value) === -1) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
