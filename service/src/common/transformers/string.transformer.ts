import { TransformFnParams } from 'class-transformer';
import { isString } from 'lodash';

export const StringTransformer = ({ value }: TransformFnParams) => {
  if (value === '') {
    return null;
  }
  const transform = value && isString(value);
  if (!transform) {
    return value;
  }
  return value.trim();
};
