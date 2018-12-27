import {
  ArgFunc,
  MsgFunc,
} from '../';

type IntBoundsType = {
  min?: number;
  max?: number;
};

/**
 * Check if a value can be coerced to an integer
 */
export default <T extends object = object>(
  value: string,
  row: T,
  msg: MsgFunc<T, IntBoundsType>,
  arg: IntBoundsType | ArgFunc<T, IntBoundsType>,
): Promise<string | void> => {
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }

  const int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;

  if (arg !== null) {
    if (arg.min !== undefined && Number(value) < Number(arg.min)) {
      return Promise.reject(msg(value, row, arg));
    }

    if (arg.max !== undefined && Number(value) > Number(arg.max)) {
      return Promise.reject(msg(value, row, arg));
    }
  }

  if (int.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
