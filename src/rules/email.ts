import isEmail from 'is-email';

import { ValidationPromise } from '../';

/**
 * Check if a value is an email
 */
const email: ValidationPromise<any> = (
  value,
  row,
  msg,
  arg,
) => {
  if (typeof value !== 'string') {
    return Promise.reject('Value must be a string');
  }
  if (isEmail(value)) {
    return Promise.resolve();
  };
  return Promise.reject(msg(value, row, arg));
};

export default email;
