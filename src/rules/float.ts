import {
  ArgFunc,
  MsgFunc,
} from '../';

type FloatBoundsType = {
  min?: number,
  max?: number
};

/**
 * Check if a value can be coerced to a float and checks it is between the bounds provided
 */
export default <T extends object = object>(
  value: string,
  row: T,
  msg: MsgFunc<T, FloatBoundsType>,
  arg: FloatBoundsType | ArgFunc<T, FloatBoundsType>,
): Promise<string | void> => {
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }

  const float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;

  if (arg !== null) {
    if ((arg.min !== undefined && Number(value) < Number(arg.min))) {
      return Promise.reject(msg(value, row, arg));
    }

    if ((arg.max && Number(value) > Number(arg.max))) {
      return Promise.reject(msg(value, row, arg));
    }
  }

  if (float.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
