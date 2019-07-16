import { ValidationPromise } from '../';
declare type IntBoundsType = {
    min?: number;
    max?: number;
};
declare const int: ValidationPromise<object, IntBoundsType>;
export default int;
