import { ValidateIf, ValidationOptions } from 'class-validator';

export function IsOptional(
  strict = true,
  validationOptions?: ValidationOptions,
) {
  return ValidateIf((obj, value) => {
    return strict
      ? value !== null && value !== undefined && value !== ''
      : value !== undefined;
  }, validationOptions);
}
