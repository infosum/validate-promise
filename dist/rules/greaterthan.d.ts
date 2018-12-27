import { ArgFunc, MsgFunc } from '../';
declare type CompareSet = {
    value: string;
    compare: string;
};
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T, number | CompareSet>, arg: number | CompareSet | ArgFunc<T, number | CompareSet>) => Promise<string | void>;
export default _default;
