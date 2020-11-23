import { ValidationPromise } from '../';

/**
 * Check if a value exists
 */
const required: ValidationPromise<any> = (value, row, msg) => {
  return new Promise((resolve, reject) => {
    if ((typeof value === 'string' && value.trim() !== '') && value !== undefined) {
      return resolve();
    }
    return reject(msg(String(value), row));
  });
};

export default required;
