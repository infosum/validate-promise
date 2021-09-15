import { ValidationPromise } from '../';

/**
 * Check if a the value doesn't contain (excludes) a supplied set of args
 */
const excludes: ValidationPromise<any> = (
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
  if (arg.some((a) => value.includes(a))) {
    return Promise.reject(msg(value, row, arg));
  }

  return Promise.resolve();
};

export default excludes;
