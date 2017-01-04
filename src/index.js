// @flow

import after from './rules/after';
import before from './rules/before';
import blacklist from './rules/blacklist';
import equals from './rules/equals';
import greaterthan from './rules/greaterthan';
import int from './rules/int';
import lessthan from './rules/lessthan';
import required from './rules/required';
import whitelist from './rules/whitelist';
import type {ValidationPromise, Validation, ValidationResponse} from './flow-declarations';

/**
 * Iterates over an array of promises, unline Promise.all it will not
 * stop when one promise is rejected. Instead all promises are run and an
 * array of objects describing the promise resolution is returned
 */
const hashSettled = (promises: Object): Promise<Object[]> => {
    let keys: string[] = Object.keys(promises);
    return Promise.all(keys.map(k => Promise.resolve(promises[k])
    .then(value => {
      let r: ValidationResponse = {
        state: 'fulfilled',
        key: k,
        value
      }
      return r;
    }, reason => {
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
  validate = (contract: Array<Validation>, data: Object): boolean|Object => {
    let promises: Object = {};
    contract.forEach((validation: Validation, cx: number) => {
      let name = validation.key,
        value = data[name];
      validation.promises.forEach((p: ValidationPromise, i: number) => {
        let key = name + '.' + cx + '.' + i,
          thisArg = p.arg === undefined ? null : p.arg;

        promises[key] = p.rule(value, data, validation.msg, thisArg);
      });
    });

    return new Promise((resolve, reject) => {
      hashSettled(promises)
        .then((res: Array<Object>) => {
          let errors = res.filter((r: ValidationResponse) => r.state === 'rejected'),
            ret = {};
          errors.forEach((err: ValidationResponse) => {
            let k: string = err.key.split('.').shift();
            if (!ret[k]) {
              ret[k] = [];
            }
            ret[k].push(err.reason);
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
  equals,
  greaterthan,
  int,
  lessthan,
  required,
  whitelist
};
