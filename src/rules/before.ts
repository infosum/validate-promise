type ArgFunc<T extends object = object> = (value: string, row: T) => string;
type MsgFunc<T extends object = object> = (value: string, row: T, arg: string | ArgFunc<T>) => string;

/**
 * Check if a value is before a given date
 */
export default <T extends object = object>(
  value: string,
  row: T,
  msg: MsgFunc<T>,
  arg: string | ArgFunc,
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
