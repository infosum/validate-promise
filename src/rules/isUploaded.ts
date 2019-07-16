import { ValidationPromise } from '../';

const isUpladed: ValidationPromise<object, number | Record<string, number>> = (
  value,
  row,
  msg,
  arg,
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

export default isUpladed;
