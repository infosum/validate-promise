import { ArgFunc, MsgFunc } from '../';
declare type FloatBoundsType = {
    min?: number;
    max?: number;
};
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T, FloatBoundsType>, arg: FloatBoundsType | ArgFunc<T, FloatBoundsType>) => Promise<string | void>;
export default _default;
