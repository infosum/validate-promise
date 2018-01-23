// @flow

type ArgFunc = (value: string, row: Object) => string;
/**
 * Check if a value matches a given regex
 * @param {String} value Regex to match
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {*} arg Validation arguement
 * @return {Promise} .
 */
export default (
    value: string,
    row: Object,
    msg: Function,
    arg: string | ArgFunc
  ): Promise<?string> => {
  const test = typeof arg === 'function' ? arg(value, row) : arg;
  const regex = new RegExp(test, 'g');

  if (regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
