import { ValidationPromise } from '../';
declare type CompareSet = {
    value: string;
    compare: string;
};
declare const greaterthan: ValidationPromise<object, CompareSet>;
export default greaterthan;
