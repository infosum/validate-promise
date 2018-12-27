declare type ArgFunc<T extends object = object> = (value: string, row: T) => any;
declare type MsgFunc<T extends object = object> = (value: string, row: T, arg: any | ArgFunc<T>) => string;
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T>, arg: any) => Promise<string | void>;
export default _default;
