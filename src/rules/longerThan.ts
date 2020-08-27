import { ValidationPromise } from '../';

/**
 * Check if a value's string length is longer than a given value
 */
export const longerThan: ValidationPromise<any> = (
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
  if (value.length > arg) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
