// @flow

/**
 * Check if a value is in a whitelist
 * @param {String} value To validate
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {array} arg Validation arguement
 * @return {Promise} .
 */
export default (value: string, row: Object, msg: Function, arg: string[]) : Promise<?string> => {
  if (arg.indexOf(value) !== -1) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
