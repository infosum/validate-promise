import { ValidationPromise } from '../';

/**
 * Check if a value is before a given date
 */
const before: ValidationPromise = (
  value,
  row,
  msg,
  arg,
) => {
  if (typeof value !== 'string') {
    return Promise.reject('Value must be a string');
  }
  const test = Date.parse(value);
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }
  const compare = Date.parse(arg);

  if (test < compare) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};

export default before;