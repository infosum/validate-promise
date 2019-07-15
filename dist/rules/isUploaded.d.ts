import { ArgFunc, MsgFunc } from '../';
declare const _default: <T extends object = object>(value: Record<string, number>, row: T, msg: MsgFunc<T, any>, arg: ArgFunc<T, number | Record<string, number>>) => Promise<any>;
export default _default;
