import { ValidationPromise } from '../';

type CompareSet = {
  value: string;
  compare: string;
};

/**
 * Check if a value is greater than the given argument
 */
const greaterthan: ValidationPromise<object, CompareSet> = (
  value,
  row,
  msg,
  arg,
): Promise<string | void> => {
  if (typeof value === 'number') {
    value = String(value);
  }
  if (typeof value !== 'string') {
    return Promise.reject('Value must be a string or number');
  }
  let compare: typeof arg | string = arg;
  if (typeof arg === 'function') {
    compare = arg(value, row);
  }
  if (typeof compare === 'object') {
    value = compare.value;
    compare = compare.compare;
  }
  if (Number(value) > Number(compare)) {
    return Promise.resolve();
  }

  return Promise.reject(msg(value, row, arg));
};

export default greaterthan;