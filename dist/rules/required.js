"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const required = (value, row, msg) => {
    return new Promise((resolve, reject) => {
        if (value !== '' && value !== undefined) {
            return resolve();
        }
        return reject(msg(value, row));
    });
};
exports.default = required;
