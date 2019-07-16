import { ValidationPromise } from '../';

/**
 * Check if a value is after a given date.
 */
const after: ValidationPromise<any> = (
  value,
  row,
  msg,
  arg,
) => {
  if (typeof value !== 'string') {
    return Promise.reject('Value must be a string');
  }
  const test: number = Date.parse(value);
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }
  const compare: number = Date.parse(arg);

  if (test > compare) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};

export default after;