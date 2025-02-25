import { TransformFnParams } from 'class-transformer';

export const NumberTransformer = ({ value }: TransformFnParams) => {
  return Number(value || 0);
};
