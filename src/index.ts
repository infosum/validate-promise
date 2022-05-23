import get from 'lodash.get';
import update from 'lodash.update';

import after from './rules/after';
import before from './rules/before';
import blacklist from './rules/blacklist';
import domain from './rules/domain';
import email from './rules/email';
import equals from './rules/equals';
import equalto from './rules/equalto';
import excludes from './rules/excludes';
import float from './rules/float';
import greaterthan from './rules/greaterthan';
import int from './rules/int';
import lessthan from './rules/lessthan';
import notEquals from './rules/notEquals';
import regex from './rules/regex';
import required from './rules/required';
import url from './rules/url';
import whitelist from './rules/whitelist';

export { generateContract } from './generator';
export { default as atleastOneRequired } from './rules/atleastOneRequired';
export { default as isUploaded } from './rules/isUploaded';
export { shorterThan } from './rules/shorterThan';
export { longerThan } from './rules/longerThan';

/**
 * @template T Interface for the validation row
 * @template R Return type for the validation argument
 */
export type ArgFunc<T extends object, R> = (value: string, row: T) => R;
/**
 * @template T Interface for the validation row
 * @template A Argument type for validation rule
 */
export type MsgFunc<T extends object, A = any> = (value: string, row: T, arg?: A | ArgFunc<T, A>) => string;


export type ValidationPromise<T extends object = object, A = any, V = string | string[] | Record<string, number> | number | Date> = (
  value: V,
  row: T,
  msg: MsgFunc<T, A>,
  arg?: A | ArgFunc<T, A>,
) => Promise<string | void>;

interface IAPromise<T extends object = object> {
  rule: ValidationPromise<T>;
  arg?: (value?: string, row?: T) => any;
  msg?: (value?: string, row?: T, arg?: any) => string;
  condition?: (value?: string, row?: T) => boolean,
};

export interface Validation<T extends object = object> {
  promises: IAPromise<T>[];
  key: string | string[];
  keys?: Array<string | string[]>;
  msg?: (value?: string, row?: T, arg?: any) => string;
};

interface ValidationRule {
  propPath: string[];
  rule: Promise<any>;
}


interface ValidationResponse {
  state: 'fulfilled' | 'rejected';
  propPath: string[];
  value?: string;
  reason?: string;
}

/**
 * Sets a value at a nested point within an object
 */
const setNestedValue = (object: object, propPath: string[], value): Object => {
  return update(object, propPath, (arr) => arr ? [...arr, value] : [value]);
};

/**
 * Iterates over an array of promises, unlike Promise.all it will not
 * stop when one promise is rejected. Instead all promises are run and an
 * array of objects describing the promise resolution is returned
 */
const hashSettled = (promises: ValidationRule[]): Promise<Object[]> => {
  return Promise.all(promises.map(({ propPath, rule }) => Promise.resolve(rule)
    .then((value: string): ValidationResponse => {
      let r: ValidationResponse = {
        state: 'fulfilled',
        propPath,
        value,
      };
      return r;
    }, (reason: string): ValidationResponse => {
      let r: ValidationResponse = {
        state: 'rejected',
        propPath,
        reason,
      };
      return r;
    })));
};

const testCondition = (value: any, data: Object) => (p: IAPromise) => {
  if (!p.condition) {
    return true;
  }
  return p.condition(value, data);
}

/**
 * Validate data against fields
 * @param {Array} contract Validation rules
 * @param {Object} data Form data
 * @return {Object|Boolean} true if passed, error object if failed,
 * array error messages keyed on field.name
 */
const validate = <T extends object = Object>(
  contract: Validation<T>[],
  data: any,
): Promise<boolean | Object> => {
  let promises: ValidationRule[] = [];
  contract.forEach((validation: Validation<T>) => {
    if (validation.hasOwnProperty('keys')) {
      const propPaths = validation.keys!.map((key) => {
        return Array.isArray(key) ? key : [key];
      });
      const values = propPaths.map((path) => get(data, path.join('.')));
      promises = promises.concat(
        validation.promises
          .filter(testCondition(values, data))
          .map((p) => ({
            propPath: propPaths[0],
            rule: p.rule(values, data, (p.msg || validation.msg)!, p.arg === undefined ? null : p.arg),
          })),
      );
    } else {
      const propPath = Array.isArray(validation.key) ? validation.key : [validation.key];
      const value = get(data, propPath.join('.'));

      promises = promises.concat(
        validation.promises
          .filter(testCondition(value, data))
          .map((p) => ({
            propPath,
            rule: p.rule(value, data, (p.msg || validation.msg)!, p.arg === undefined ? null : p.arg),
          })),
      );
    }
  });

  return new Promise((resolve: Function, reject: Function) => {
    hashSettled(promises)
      .then((res: Array<ValidationResponse>) => {
        const errors = res.filter((r) => r.state === 'rejected');
        let ret = {};
        errors.forEach(({ propPath, reason }) => {
          ret = setNestedValue(ret, propPath, reason);
        });

        if (errors.length === 0) {
          resolve(true);
        }
        reject(ret);
      });
  });
};

export default validate;

export {
  after,
  before,
  blacklist,
  domain,
  email,
  equals,
  equalto,
  excludes,
  float,
  greaterthan,
  int,
  lessthan,
  notEquals,
  regex,
  required,
  url,
  whitelist,
};
