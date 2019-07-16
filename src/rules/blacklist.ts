import { ValidationPromise } from '../';

/**
 * Check if a value is in a blacklist
 */
const blacklist: ValidationPromise<any> = (
  value,
  row,
  msg,
  arg,
): Promise<string | void> => {
  if (typeof value !== 'string') {
    return Promise.reject('Value must be a string');
  }
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }
  if (arg.indexOf(value) === -1) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};

export default blacklist;
