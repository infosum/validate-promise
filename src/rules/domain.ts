import { ValidationPromise } from '../';

const domain = (domains: string[]): ValidationPromise<any> => (
  value,
  row,
  msg,
  arg,
) => {
  return new Promise((resolve, reject) => {
    if (typeof value === 'string') {
      value = [value] as string[];
    }
    if (!Array.isArray(value)) {
      return reject(msg(String(value), row, { ...arg, type: 'INVALID_FORMAT' }));
    }
    value = value.map((v) => v.toLowerCase());

    if (domains.some((d) => (value as string[]).includes(d.toLowerCase()))) {
      return reject(msg(String(value), row, { ...arg, type: 'IN_USE' }));
    }

    const regex = new RegExp('^(?!:\/\/)([a-zA-Z0-9-_]+\.)[a-zA-Z]{2,11}?$')

    const valid = value
      .map((domain) => regex.test(domain))
      .every((v) => v);
    if (valid) {
      return resolve();
    }
    reject(msg(String(value), row, { ...arg, type: 'INCORRECT' }))
  });
};

export default domain;

