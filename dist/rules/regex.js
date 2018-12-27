"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (value, row, msg, arg) => {
    const test = typeof arg === 'function' ? arg(value, row) : arg;
    const regex = new RegExp(test, 'g');
    if (regex.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
