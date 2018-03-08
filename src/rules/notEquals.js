type ArgFunc = (value: string, row: Object) => any;

/**
 * Check if a value can be coerced to an integer
 * @param {String} value To validate
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {*} arg Validation arguement
 * @return {Promise} .
 */
export default (value: string, row: Object, msg: Function, arg: any|ArgFunc) : Promise<?string> => {
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }

  if (value != arg) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
