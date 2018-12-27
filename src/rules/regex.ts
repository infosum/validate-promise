type ArgFunc<T extends object = object> = (value: string, row: T) => string;
type MsgFunc<T extends object = object> = (value: string, row: T, arg: string | ArgFunc<T>) => string;

/**
 * Check if a value matches a given regex
 * @param {String} value Regex to match
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {*} arg Validation arguement
 * @return {Promise} .
 */
export default <T extends object = object>(
    value: string,
    row: T,
    msg: MsgFunc<T>,
    arg: string | ArgFunc<T>,
  ): Promise<string | void> => {
  const test = typeof arg === 'function' ? arg(value, row) : arg;
  const regex = new RegExp(test, 'g');

  if (regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
