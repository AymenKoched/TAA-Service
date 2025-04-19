import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'EmployeesTotalEquals100', async: false })
export class EmployeesTotalEquals100 implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const { men, women } = args.object as any;
    return (
      typeof men === 'number' &&
      typeof women === 'number' &&
      men + women === 100
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'The sum of men and women must be 100';
  }
}

@ValidatorConstraint({ name: 'EmployeesTotalInferior100', async: false })
export class EmployeesTotalInferior100 implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const { men, women } = args.object as any;
    return (
      typeof men === 'number' && typeof women === 'number' && men + women < 100
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'The sum of men and women must be < 100';
  }
}
