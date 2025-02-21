import { TransformFnParams } from 'class-transformer';

import { StringArray } from '../models';

export const StringArrayTransformer = ({ value }: TransformFnParams) => {
  return value ? new StringArray(value) : undefined;
};
