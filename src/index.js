// @flow
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
import type {ValidationPromise,
  Validation, ValidationResponse} from './flow-declarations';

/**
 * Sets a value at a nested point within an object
 */
const setNestedValue = (object: Object, propPath: string[], value): Object => {
  propPath.reduce((acc, next, i) => {
    if (i === propPath.length - 1) {
      if (acc[next]) {
        acc[next].push(value);
      } else {
        acc[next] = [value];
      }
    } else if (!acc[next]) {
      acc[next] = {};
    }

    return acc[next];
  }, object);


  return object;
};

/**
 * Iterates over an array of promises, unline Promise.all it will not
 * stop when one promise is rejected. Instead all promises are run and an
 * array of objects describing the promise resolution is returned
 */
const hashSettled = (promises: Object[]): Promise<Object[]> => {
    return Promise.all(promises.map(({ propPath, rule }) => Promise.resolve(rule)
      .then((value: string): ValidationResponse => {
        let r: ValidationResponse = {
          state: 'fulfilled',
          propPath,
          value
        };
        return r;
      }, (reason: string): ValidationResponse => {
        let r: ValidationResponse = {
          state: 'rejected',
          propPath,
          reason
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
  validate = (contract: Array<Validation>, data: Object): boolean | Object => {
    let promises = [];
    contract.forEach((validation: Validation, cx: number) => {
      const propPath = Array.isArray(validation.key) ? validation.key : [validation.key];
      const value = Array.isArray(propPath) ? propPath.reduce((acc, next) => acc[next], data) : data[propPath];

      promises = promises.concat(
        validation.promises.map((p) => ({
          propPath,
          rule: p.rule(value, data, p.msg || validation.msg, p.arg === undefined ? null : p.arg),
        })),
      );
    });

    return new Promise((resolve: Function, reject: Function) => {
      hashSettled(promises)
        .then((res: Array<Object>) => {
          const rejectedErrors = (r: ValidationResponse): boolean => r.state === 'rejected';
          const errors = res.filter(rejectedErrors);
          let ret = {};
          errors.forEach(({ propPath, reason }: ValidationResponse) => {
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
