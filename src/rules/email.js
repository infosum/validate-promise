// @flow
import Isemail from 'isemail';

type ArgFunc = (value: string, row: Object) => string;

/**
 * Check if a value is an email
 * @param {String} value To validate
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
  if (Isemail.validate(value)) {
    return Promise.resolve();
  };
  return Promise.reject(msg(value, row, arg));
};
