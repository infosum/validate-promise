import { ValidationPromise } from '../';
declare type FloatBoundsType = {
    min?: number;
    max?: number;
};
declare const float: ValidationPromise<object, FloatBoundsType>;
export default float;
