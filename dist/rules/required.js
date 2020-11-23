"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const required = (value, row, msg) => {
    return new Promise((resolve, reject) => {
        if ((typeof value === 'string' && value.trim() !== '') && value !== undefined) {
            return resolve();
        }
        return reject(msg(String(value), row));
    });
};
exports.default = required;
