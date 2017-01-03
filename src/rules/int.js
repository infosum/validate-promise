// @flow

type IntBounds = {
  min?: number;
  max?: number
}
/**
 * Check if a value can be coerced to an integer
 * @param {String} value To validate
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {*} arg Validation arguement
 * @return {Promise} .
 */
export default (value: string, row: Object, msg: Function, arg: IntBounds) : Promise<?string> => {
  const int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;

  if ((arg.min !== undefined && parseInt(value, 10) < parseInt(arg.min, 10))) {
    return Promise.reject(msg(value, row, arg));
  }

  if ((arg.max && parseInt(value, 10) > parseInt(arg.max, 10))) {
    return Promise.reject(msg(value, row, arg));
  }

  if (int.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
