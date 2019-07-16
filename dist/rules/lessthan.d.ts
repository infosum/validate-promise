import { ValidationPromise } from '../';
declare type CompareSet = {
    value: string;
    compare: string;
};
declare const lessthan: ValidationPromise<object, CompareSet>;
export default lessthan;
