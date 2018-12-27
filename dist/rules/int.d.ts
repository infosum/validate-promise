declare type IntBoundsType = {
    min?: number;
    max?: number;
};
declare type IntBoundFuncType<T extends object = object> = (value: string, row: T) => IntBoundsType;
declare type MsgFunc<T extends object = object> = (value: string, row: T, arg: IntBoundsType | IntBoundFuncType<T>) => string;
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T>, arg: IntBoundsType | IntBoundFuncType<T>) => Promise<string | void>;
export default _default;
