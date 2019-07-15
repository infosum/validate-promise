"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (value, row, msg) => {
    return new Promise((resolve, reject) => {
        const found = value.some((v) => v !== '' && v !== undefined);
        if (found) {
            return resolve();
        }
        return reject(msg(value.join(', '), row));
    });
};
