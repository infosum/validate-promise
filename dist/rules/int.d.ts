import { ValidationPromise } from '../';
declare type IntBoundsType = {
    min?: number;
    max?: number;
};
declare const int: ValidationPromise<any, IntBoundsType>;
export default int;
