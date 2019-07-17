"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const greaterthan = (value, row, msg, arg) => {
    if (typeof value === 'number') {
        value = String(value);
    }
    if (typeof value !== 'string') {
        return Promise.reject('Value must be a string or number');
    }
    let compare = arg;
    if (typeof arg === 'function') {
        compare = arg(value, row);
    }
    if (typeof compare === 'object') {
        value = compare.value;
        compare = compare.compare;
    }
    if (Number(value) > Number(compare)) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
exports.default = greaterthan;
