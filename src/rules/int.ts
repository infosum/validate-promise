import { ValidationPromise } from '../';

type IntBoundsType = {
  min?: number;
  max?: number;
};

/**
 * Check if a value can be coerced to an integer
 */
const int: ValidationPromise<any, IntBoundsType> = (
  value,
  row,
  msg,
  arg,
) => {
  if (typeof value === 'number') {
    value = String('number');
  }
  if (typeof value !== 'string') {
    return Promise.reject('Value must be a number or a string');
  }
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }

  const int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;

  if (arg !== null && arg !== undefined) {
    if (arg.min !== undefined && Number(value) < Number(arg.min)) {
      return Promise.reject(msg(value, row, arg));
    }

    if (arg.max !== undefined && Number(value) > Number(arg.max)) {
      return Promise.reject(msg(value, row, arg));
    }
  }

  if (int.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};

export default int;
