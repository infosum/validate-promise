import isEmail from 'is-email';

import {
  ArgFunc,
  MsgFunc,
} from '../';

/**
 * Check if a value is an email
 * @param {String} value To validate
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {*} arg Validation arguement
 * @return {Promise} .
 */
export default <T extends object = object>(
  value: string,
  row: T,
  msg: MsgFunc<T, string>,
  arg: string | ArgFunc<T, string>,
) : Promise<string | void> => {
  if (isEmail(value)) {
    return Promise.resolve();
  };
  return Promise.reject(msg(value, row, arg));
};
