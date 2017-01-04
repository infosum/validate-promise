// @flow

type ArgFunc = (value: string, row: Object) => string[];

/**
 * Check if a value is in a whitelist
 * @param {String} value To validate
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {array} arg Validation arguement
 * @return {Promise} .
 */
export default (value: string, row: Object, msg: Function, arg: string[]|ArgFunc) : Promise<?string> => {
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }
  if (arg.indexOf(value) !== -1) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
