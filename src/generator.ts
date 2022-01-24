import { Validation } from './index';
import required from './rules/required';

type Fields<T> = { key: keyof T, rule?: any, msg?: string };
export const generateContract = <T extends Object>(fields: Fields<T>[]): Array<Validation<Partial<T>>> => {
  return fields.map(({ key, rule, msg }) => ({
    key: key as string,
    promises: [
      {
        msg: () => msg ?? '* Required',
        rule: rule ?? required,
      },
    ],
  }));
};
