declare type FloatBoundsType = {
    min?: number;
    max?: number;
};
declare type FloatBoundFuncType<T extends object = object> = (value: string, row: T) => FloatBoundsType;
declare type MsgFunc<T extends object = object> = (value: string, row: T, arg: FloatBoundsType | FloatBoundFuncType<T>) => string;
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T>, arg: FloatBoundsType | FloatBoundFuncType<T>) => Promise<string | void>;
export default _default;
