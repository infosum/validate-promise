import { ValidationPromise } from '../';
declare type CompareSet = {
    value: string;
    compare: string;
};
declare const greaterthan: ValidationPromise<any, CompareSet>;
export default greaterthan;
