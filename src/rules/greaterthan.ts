type ArgFunc<T extends object = object> = (value: string, row: T) => number;
type CompareSet = {
  value: string;
  compare: string;
};

type MsgFunc<T extends object = object> = (value: string, row: T, arg: number | ArgFunc<T> | CompareSet) => string;

/**
 * Check if a value is greater than the given argument
 */
export default <T extends object = object>(
    value: string,
    row: T,
    msg: MsgFunc<T>,
    arg: number | ArgFunc<T> | CompareSet
  ): Promise<string | void> => {
  let compare: number | ArgFunc<T> | CompareSet | string = arg;
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
