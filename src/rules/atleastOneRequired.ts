import { MsgFunc } from '../';

/**
 * Check if at least one value is required
 */
export default <T extends object = object>(
  value: string[],
  row: T,
  msg: MsgFunc<T>,
): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    const found = value.some((v) => v !== '' && v !== undefined);
    if (found) {
      return resolve();
    }

    return reject(msg(value.join(', '), row));
  });
};
