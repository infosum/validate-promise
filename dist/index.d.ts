import after from './rules/after';
import before from './rules/before';
import blacklist from './rules/blacklist';
import email from './rules/email';
import equals from './rules/equals';
import equalto from './rules/equalto';
import float from './rules/float';
import greaterthan from './rules/greaterthan';
import int from './rules/int';
import lessthan from './rules/lessthan';
import notEquals from './rules/notEquals';
import regex from './rules/regex';
import required from './rules/required';
import whitelist from './rules/whitelist';
export declare type ValidationPromise<T> = (value: string, row: T, msg: (value: string, row: T, arg: any) => string, arg: any) => Promise<string | void>;
export interface Validation<T extends object = object> {
    promises: {
        rule: ValidationPromise<T>;
        arg?: (value: string, row: T) => any;
        msg?: (value: string, row: T, arg: any) => string;
    }[];
    key: string | string[];
    msg: (value: string, row: T, arg: any) => string;
}
declare const validate: (contract: Validation<object>[], data: Object) => Promise<boolean | Object>;
export default validate;
export declare type ArgFunc<T extends object, R> = (value: string, row: T) => R;
export declare type MsgFunc<T extends object, A = any> = (value: string, row: T, arg?: A | ArgFunc<T, A>) => string;
export { after, before, blacklist, email, equals, equalto, float, greaterthan, int, lessthan, notEquals, regex, required, whitelist };
