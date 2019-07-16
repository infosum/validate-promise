import { ValidationPromise } from '../';

/**
 * Check if a value is not equal to the given argument using loose type checking
 */
const notEquals: ValidationPromise = (
  value,
  row,
  msg,
  arg,
) => {
  if (typeof value !== 'string') {
    return Promise.reject('Value must be a string');
  }
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }

  if (value != arg) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};

export default notEquals

