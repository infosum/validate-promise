import { ValidationPromise } from '../';

/**
 * Check if a value is equal using loose type checking
 */
const equals: ValidationPromise<any> = (
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

  if (value == arg) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};

export default equals;
