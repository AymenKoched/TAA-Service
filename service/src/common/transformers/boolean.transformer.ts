import { TransformFnParams } from 'class-transformer';

export const BooleanTransformer = ({ value }: TransformFnParams) => {
  return value === 'true' || value === true;
};
