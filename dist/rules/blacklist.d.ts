declare type ArgFunc<T extends object = object> = (value: string, row: T) => string[];
declare type MsgFunc<T extends object = object> = (value: string, row: T, arg: string[] | ArgFunc<T>) => string;
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T>, arg: string[] | ArgFunc<T>) => Promise<string | void>;
export default _default;
