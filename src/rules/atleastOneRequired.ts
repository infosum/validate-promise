import { ValidationPromise } from '../';

/**
 * Check if at least one value is required
 */
const atleastOneRequried: ValidationPromise<any> = (
  value,
  row,
  msg,
): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(value)) {
      return reject('Value must be an array');
    }
    const found = value.some((v) => v !== '' && v !== undefined);
    if (found) {
      return resolve();
    }

    return reject(msg(value.join(', '), row));
  });
};

export default atleastOneRequried;
