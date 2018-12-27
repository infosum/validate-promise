import { ArgFunc, MsgFunc } from '../';
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T, string[]>, arg: string[] | ArgFunc<T, string[]>) => Promise<string | void>;
export default _default;
