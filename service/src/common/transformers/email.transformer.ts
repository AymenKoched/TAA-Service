import { TransformFnParams } from 'class-transformer';
import { isArray, isString, map } from 'lodash';

import { StringArray } from '../models';

function transform(value: any) {
  const transform = value && isString(value);
  if (!transform) {
    return value;
  }
  return value.trim().toLocaleLowerCase();
}

export const EmailTransformer = ({ value }: TransformFnParams) => {
  let isEmailArray = isArray(value);
  if (isString(value) && value.indexOf(',') > -1) {
    isEmailArray = true;
  }
  return isEmailArray
    ? map(new StringArray(value), transform)
    : transform(value);
};
