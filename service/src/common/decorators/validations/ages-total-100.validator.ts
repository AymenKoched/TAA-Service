import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'EmployeesTotalEquals100', async: false })
export class AgesTotal100Validator implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const { count18_24, count25_30, count31_36, count37Plus } =
      args.object as any;
    return (
      typeof count18_24 === 'number' &&
      typeof count25_30 === 'number' &&
      typeof count31_36 === 'number' &&
      typeof count37Plus === 'number' &&
      count18_24 + count25_30 + count31_36 + count37Plus === 100
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'The sum of ages must be 100';
  }
}
