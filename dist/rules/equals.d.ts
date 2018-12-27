import { ArgFunc, MsgFunc } from '../';
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T, any>, arg: string | ArgFunc<T, any>) => Promise<string | void>;
export default _default;
