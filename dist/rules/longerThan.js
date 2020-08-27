"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.longerThan = void 0;
exports.longerThan = (value, row, msg, arg) => {
    if (typeof value !== 'string') {
        return Promise.reject('Value must be a string');
    }
    if (typeof arg === 'function') {
        arg = arg(value, row);
    }
    if (value.length > arg) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
