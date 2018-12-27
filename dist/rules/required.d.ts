declare type MsgFunc<T extends object = object> = (value: string, row: T) => string;
declare const _default: <T extends object = object>(value: string, row: T, msg: MsgFunc<T>) => Promise<string | void>;
export default _default;
