"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain = (domains) => (value, row, msg, arg) => {
    return new Promise((resolve, reject) => {
        if (typeof value === 'string') {
            value = [value];
        }
        if (!Array.isArray(value)) {
            return reject(msg(String(value), row, Object.assign(Object.assign({}, arg), { type: 'INVALID_FORMAT' })));
        }
        value = value.map((v) => v.toLowerCase());
        if (domains.some((d) => value.includes(d.toLowerCase()))) {
            return reject(msg(String(value), row, Object.assign(Object.assign({}, arg), { type: 'IN_USE' })));
        }
        if (!value.every((v) => v.includes('.'))) {
            return reject(msg(String(value), row, Object.assign(Object.assign({}, arg), { type: 'INCORRECT' })));
        }
        const regex = new RegExp('^(?!:\/\/)(?![a-zA-Z0-9-_]+@)([a-zA-Z0-9-_]+)(\.[a-zA-Z]{2,11}?)+$');
        const valid = value
            .map((domain) => regex.test(domain))
            .every((v) => v);
        if (valid) {
            return resolve();
        }
        reject(msg(String(value), row, Object.assign(Object.assign({}, arg), { type: 'INCORRECT' })));
    });
};
exports.default = domain;
