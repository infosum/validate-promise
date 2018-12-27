type ArgFunc<T extends object = object> = (value: string, row: T) => string[];
type MsgFunc<T extends object = object> = (value: string, row: T, arg: string[] | ArgFunc<T>) => string;

/**
 * Check if a value is in a blacklist
 */
export default <T extends object = object>(
  value: string,
  row: T,
  msg: MsgFunc<T>,
  arg: string[] | ArgFunc<T>
): Promise<string | void> => {
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }
  if (arg.indexOf(value) === -1) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
