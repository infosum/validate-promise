"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = (value, row, msg, arg) => {
    if (typeof value !== 'string') {
        return Promise.reject('Value must be a string');
    }
    if (value === '') {
        return Promise.resolve();
    }
    const urlRegex = '^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[A-Za-z\u00a1-\uffff0-9]-*)*[A-Za-z\u00a1-\uffff0-9]+)(?:\.(?:[A-Za-z\u00a1-\uffff0-9]-*)*[A-Za-z\u00a1-\uffff0-9]+)*(?:\.(?:[A-Za-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$';
    const regex = new RegExp(urlRegex, 'g');
    if (regex.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
exports.default = url;
