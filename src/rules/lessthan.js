// @flow

type ArgFunc = (value: string, row: Object) => number;

/**
 * Check if a value is less than foo
 * @param {String} value To validate
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {*} arg Validation arguement
 * @return {Promise} .
 */
export default (value: string, row: Object, msg: Function, arg: number|ArgFunc) : Promise<?string> => {
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }
  if (parseInt(value, 10) < arg) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
