export function ValidationPromise(
  value: string,
  row: Object,
  arg: any[]
): Promise<?string>;

export type Validation = {
  promises: Array<(value: string, row: Object, arg: any) => string>;
  key: string;
  msg: (value: string, row: Object, arg: any) => string
};

export type ValidationResponse = {
  state: string,
  key: string,
  value: string
}