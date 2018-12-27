"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (value, row, msg, arg) => {
    let compare = arg;
    if (typeof arg === 'function') {
        compare = arg(value, row);
    }
    if (typeof compare === 'object') {
        value = compare.value;
        compare = compare.compare;
    }
    if (Number(value) < Number(compare)) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
