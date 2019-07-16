"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atleastOneRequried = (value, row, msg) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(value)) {
            return reject('Value must be an array');
        }
        const found = value.some((v) => v !== '' && v !== undefined);
        if (found) {
            return resolve();
        }
        return reject(msg(value.join(', '), row));
    });
};
exports.default = atleastOneRequried;
