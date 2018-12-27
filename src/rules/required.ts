type MsgFunc<T extends object = object> = (value: string, row: T) => string;

/**
 * Check if a value exists
 */
export default <T extends object = object>(value: string, row: T, msg: MsgFunc<T>) : Promise<string | void> => {
  return new Promise((resolve, reject) => {
    if (value !== '' && value !== undefined) {
      return resolve();
    }
    return reject(msg(value, row));
  });
};
