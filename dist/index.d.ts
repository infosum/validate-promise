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
import url from './rules/url';
import whitelist from './rules/whitelist';
export { default as atleastOneRequired } from './rules/atleastOneRequired';
export { default as isUploaded } from './rules/isUploaded';
export declare type ArgFunc<T extends object, R> = (value: string, row: T) => R;
export declare type MsgFunc<T extends object, A = any> = (value: string, row: T, arg?: A | ArgFunc<T, A>) => string;
export declare type ValidationPromise<T extends object = object, A = any> = (value: string | string[] | Record<string, number> | number | Date, row: T, msg: MsgFunc<T, A>, arg?: A | ArgFunc<T, A>) => Promise<string | void>;
interface IAPromise<T extends object = object> {
    rule: ValidationPromise<T>;
    arg?: (value?: string, row?: T) => any;
    msg?: (value?: string, row?: T, arg?: any) => string;
    condition?: (value?: string, row?: T) => boolean;
}
export interface Validation<T extends object = object> {
    promises: IAPromise<T>[];
    key: string | string[];
    keys?: Array<string | string[]>;
    msg?: (value?: string, row?: T, arg?: any) => string;
}
declare const validate: <T extends object = Object>(contract: Validation<T>[], data: any) => Promise<boolean | Object>;
export default validate;
export { after, before, blacklist, email, equals, equalto, float, greaterthan, int, lessthan, notEquals, regex, required, url, whitelist, };
