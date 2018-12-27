import { ArgFunc, MsgFunc } from '../';
declare type IntBoundsType = {
    min?: number;
    max?: number;
};
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T, IntBoundsType>, arg: IntBoundsType | ArgFunc<T, IntBoundsType>) => Promise<string | void>;
export default _default;
