import {
  ArgFunc,
  MsgFunc,
} from '../';

export default <T extends object = object>(
  value: Record<string, number>,
  row: T,
  msg: MsgFunc<T>,
  arg: ArgFunc<T, number | Record<string, number>>,
): Promise<any> => {
  if (value === undefined) {
    return Promise.reject(msg(value, row, arg));
  }
  const lowest = Object.keys(value).reduce((prev, next) => {
    return value[next] < prev ? value[next] : prev;
  }, 100);
  if (lowest < 100) {
    return Promise.reject(msg(String(lowest), row, arg));
  }
  return Promise.resolve();
}