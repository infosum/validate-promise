// @flow

/**
 * Check if a value is before a given date
 * @param {String} value To validate
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {*} arg Validation arguement
 * @return {Promise} .
 */
export default (value: string, row: Object, msg: Function, arg: string) : Promise<?string> => {
  let test: number = Date.parse(value);
  let compare: number = Date.parse(arg);

  if (test < compare) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
