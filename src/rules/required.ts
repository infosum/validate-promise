import { ValidationPromise } from '../';

/**
 * Check if a value exists
 */
const required: ValidationPromise = (value, row, msg) => {
  return new Promise((resolve, reject) => {
    if (value !== '' && value !== undefined) {
      return resolve();
    }
    return reject(msg(value, row));
  });
};

export default required;
