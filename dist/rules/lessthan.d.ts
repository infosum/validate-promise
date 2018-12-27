declare type ArgFunc<T extends object = object> = (value: string, row: T) => number;
declare type CompareSet = {
    value: string;
    compare: string;
};
declare type MsgFunc<T extends object = object> = (value: string, row: T, arg: number | ArgFunc<T> | CompareSet) => string;
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T>, arg: number | CompareSet | ArgFunc<T>) => Promise<string | void>;
export default _default;
