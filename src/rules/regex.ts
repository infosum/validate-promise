import { ValidationPromise } from '../';

/**
 * Check if a value matches a given regex
 * @param {String} value Regex to match
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {*} arg Validation arguement
 * @return {Promise} .
 */
const regex: ValidationPromise<any> = (
  value,
  row,
  msg,
  arg,
) => {
  if (typeof value !== 'string') {
    return Promise.reject('Value must be a string');
  }
  const test = typeof arg === 'function' ? arg(value, row) : arg;
  const regex = new RegExp(test, 'g');

  if (regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};

export default regex;
