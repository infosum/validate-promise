import { ValidationPromise } from '../';

type CompareSet = {
  value: string;
  compare: string;
};

/**
 * Check if a value is less than thr given value
 */
const lessthan: ValidationPromise<object, CompareSet> = (
  value,
  row,
  msg,
  arg
) => {
  let compare: typeof arg | string = arg;
  if (typeof value !== 'string') {
    return Promise.reject('Value must be a string');
  }
  if (typeof arg === 'function') {
    compare = arg(value, row);
  }
  if (typeof compare === 'object') {
    value = compare.value;
    compare = compare.compare;
  }

  if (Number(value) < Number(compare)) {
    return Promise.resolve();
  }

  return Promise.reject(msg(value, row, arg));
};

export default lessthan;
