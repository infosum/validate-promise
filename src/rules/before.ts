import {
  ArgFunc,
  MsgFunc,
} from '../';

/**
 * Check if a value is before a given date
 */
export default <T extends object = object>(
  value: string,
  row: T,
  msg: MsgFunc<T, string>,
  arg: string | ArgFunc<T, string>,
) : Promise<string | void> => {
  const test = Date.parse(value);
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }
  const compare = Date.parse(arg);

  if (test < compare) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
