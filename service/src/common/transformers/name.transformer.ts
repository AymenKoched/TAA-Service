import { TransformFnParams } from 'class-transformer';
import { capitalize, isString } from 'lodash';

export const NameTransformer = ({ value }: TransformFnParams) => {
  if (value === null) {
    return null;
  }
  if (value.trim() === '') {
    return null;
  }
  const transform = value && isString(value);
  if (!transform) {
    return value;
  }
  return value
    .split(' ')
    .map((part) => part.trim().split('-').map(capitalize).join('-'))
    .join(' ')
    .trim();
};
