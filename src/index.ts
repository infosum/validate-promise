import get from 'lodash.get';
import update from 'lodash.update';

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

export type ValidationPromise<T> = (
  value: string,
  row: T,
  msg: (value: string, row: T, arg?: any) => string,
  arg?: any,
) => Promise<string | void>;

export interface Validation<T extends object = object> {
  promises: {
    rule: ValidationPromise<T>;
    arg?: (value?: string, row?: T) => any;
    msg?: (value?: string, row?: T, arg?: any) => string;
  }[];
  key: string | string[];
  msg?: (value?: string, row?: T, arg?: any) => string;
};

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


interface ValidationRule {
  propPath: string[];
  rule: Promise<any>;
}

/**
 * Iterates over an array of promises, unline Promise.all it will not
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
  },

  /**
   * Validate data againsts fields
   * @param {Array} contract Validation rules
   * @param {Object} data Form data
   * @return {Object|Boolean} true if passed, error object if failed,
   * array error messages keyed on field.name
   */
  validate = (contract: Validation[], data: Object): Promise<boolean | Object> => {
    let promises: ValidationRule[] = [];
    contract.forEach((validation: Validation) => {
      const propPath = Array.isArray(validation.key) ? validation.key : [validation.key];
      const value = get(data, propPath.join('.'));

      promises = promises.concat(
        validation.promises.map((p) => ({
          propPath,
          rule: p.rule(value, data, (p.msg || validation.msg)!, p.arg === undefined ? null : p.arg),
        })),
      );
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


export {
  after,
  before,
  blacklist,
  email,
  equals,
  equalto,
  float,
  greaterthan,
  int,
  lessthan,
  notEquals,
  regex,
  required,
  whitelist
};
