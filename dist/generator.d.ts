import { Validation } from './index';
declare type Fields<T> = {
    key: keyof T;
    rule?: any;
    msg?: string;
};
export declare const generateContract: <T extends Object>(fields: Fields<T>[]) => Validation<Partial<T>>[];
export {};
