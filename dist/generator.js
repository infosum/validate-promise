"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContract = void 0;
const required_1 = __importDefault(require("./rules/required"));
exports.generateContract = (fields) => {
    return fields.map(({ key, rule, msg }) => ({
        key: key,
        promises: [
            {
                msg: () => msg !== null && msg !== void 0 ? msg : '* Required',
                rule: rule !== null && rule !== void 0 ? rule : required_1.default,
            },
        ],
    }));
};
