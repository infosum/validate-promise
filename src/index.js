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
 * Iterates over an array of promises, unline Promise.all it will not
 * stop when one promise is rejected. Instead all promises are run and an
 * array of objects describing the promise resolution is returned
 */
const hashSettled = (promises: Object): Promise<Object[]> => {
    let keys: string[] = Object.keys(promises);
    return Promise.all(keys.map((k: string) => Promise.resolve(promises[k])
    .then((value: string): ValidationResponse => {
      let r: ValidationResponse = {
        state: 'fulfilled',
        key: k,
        value
      };
      return r;
    }, (reason: string): ValidationResponse => {
      let r: ValidationResponse = {
        state: 'rejected',
        key: k,
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
    let promises: Object = {};
    contract.forEach((validation: Validation, cx: number) => {
      let name = validation.key,
        value = data[name];
      validation.promises.forEach((p: ValidationPromise, i: number) => {
        let key = name + '.' + cx + '.' + i,
          thisArg = p.arg === undefined ? null : p.arg,
          validationMessage = p.msg || validation.msg;

        promises[key] = p.rule(value, data, validationMessage, thisArg);
      });
    });

    return new Promise((resolve: Function, reject: Function) => {
      hashSettled(promises)
        .then((res: Array<Object>) => {
          const rejectedErrors = (r: ValidationResponse): boolean => r.state === 'rejected';
          let errors = res.filter(rejectedErrors),
            ret = {};
          errors.forEach((err: ValidationResponse) => {
            let k: string = err.key.split('.').shift();
            if (!ret[k]) {
              ret[k] = [];
            }
            if (ret[k].indexOf(err.reason) === -1) {
              ret[k].push(err.reason);
            }
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
