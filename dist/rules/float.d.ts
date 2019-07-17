import { ValidationPromise } from '../';
declare type FloatBoundsType = {
    min?: number;
    max?: number;
};
declare const float: ValidationPromise<any, FloatBoundsType>;
export default float;
