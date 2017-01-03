// @flow

import after from './rules/after';
import before from './rules/before';
import greaterthan from './rules/greaterthan';
import int from './rules/int';
import lessthan from './rules/lessthan';
import required from './rules/required';

type Validation = {
  promises: Array<(value: string, row: Object, arg: any) => string>;
  key: string;
  msg: (value: string, row: Object, arg: any) => string
};

const hashSettled = (promises: Object): Promise<Object[]> => {
    let keys: string[] = Object.keys(promises);
    return Promise.all(keys.map(k => Promise.resolve(promises[k])
    .then(value => {
      return {
        state: 'fulfilled',
        key: k,
        value
      };
    }, reason => {
      return {
        state: 'rejected',
        key: k,
        reason
      };
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
    let promises : Object = {};
    contract.forEach(validation => {
      let name = validation.key,
        value = data[name],
        arg = validation.arg || null;
      validation.promises.forEach((p, i) => {
        let key = name + '.' + i;
        promises[key] = p(value, data, validation.msg, arg);
      });
    });

    return new Promise((resolve, reject) => {
      hashSettled(promises)
        .then((res: Array<Object>) => {
          let errors = res.filter(r => r.state === 'rejected'),
            ret = {};
          errors.forEach(err => {
            let k = err.key.split('.').shift();
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
  greaterthan,
  int,
  lessthan,
  required
};
