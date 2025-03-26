import { TransformFnParams } from 'class-transformer';
import { isString } from 'lodash';

export const PhoneTransformer = ({ value }: TransformFnParams) => {
  const transform = value && isString(value);
  if (!transform) {
    return value;
  }

  // Remove all non-numeric characters (leaving only digits)
  const numericValue = value.replace(/\D/g, '');

  // Add the '+' sign at the beginning of the numericValue
  return `+${numericValue}`;
};
