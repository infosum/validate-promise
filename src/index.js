// @flow

import required from './rules/required';
import greaterthan from './rules/greaterthan';
import lessthan from './rules/lessthan';

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

  checkValidataion = (validation: Object) : boolean => {
    if (!validation.promises) {
      throw new TypeError('Validation must contain a promises property');
    }
    if (!Array.isArray(validation.promises)) {
      throw new TypeError('Validation proerty promises must be an array of promises');
    }
    if (!validation.msg) {
      throw new TypeError('Validation must contain a msg property');
    }
    if (typeof validation.msg !== 'function') {
      throw new TypeError('Validation proerty msg must be a function');
    }
    return true;
  },

  /**
   * Validate data againsts fields
   * @param {Array} contract Validation rules
   * @param {Object} data Form data
   * @return {Object|Boolean} true if passed, error object if failed,
   * array error messages keyed on field.name
   */
  validate = (contract: Array<Object>, data: Object): boolean|Object => {
    let promises : Object = {};
    contract.forEach(validation => {
      checkValidataion(validation);
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
  greaterthan,
  lessthan,
  required
};
