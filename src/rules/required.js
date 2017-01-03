// @flow

/**
 * Check if a value is greater than foo
 * @param {String} value To validate
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {*} args Field arguements
 * @return {Promise} .
 */
export default (value: string, row: Object, msg: Function) : Promise<?string> => {
  return new Promise((resolve, reject) => {
    if (value !== '' && value !== undefined) {
      return resolve();
    }
    return reject(msg(value, row));
  });
};
