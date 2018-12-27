import {
  ArgFunc,
  MsgFunc,
} from '../';

type CompareSet = {
  value: string;
  compare: string;
};


/**
 * Check if a value is less than thr given value
 */
export default <T extends object = object>(
  value: string,
  row: T,
  msg: MsgFunc<T, number | CompareSet>,
  arg: number | CompareSet | ArgFunc<T, number | CompareSet>
): Promise<string | void> => {
  let compare: typeof arg | string = arg;
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
