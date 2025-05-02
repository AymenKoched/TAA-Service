import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNumber, sumBy } from 'lodash';

@ValidatorConstraint({ name: 'WasteDistribution100', async: false })
export class WasteDistribution100Validator
  implements ValidatorConstraintInterface
{
  validate(_: any, args: ValidationArguments) {
    const {
      plastic,
      metallic,
      textilesAndLeather,
      oils,
      papersAndCardboard,
      hazardous,
      others,
    } = args.object as any;

    const values = [
      plastic,
      metallic,
      textilesAndLeather,
      oils,
      papersAndCardboard,
      hazardous,
      others,
    ];

    const validNumbers = values.filter((v) => isNumber(v));
    if (validNumbers.length !== values.filter((v) => v !== undefined).length) {
      return false;
    }

    const total = sumBy(validNumbers, (v) => v);
    return total === 100;
  }

  defaultMessage(args: ValidationArguments) {
    return 'the sum must be 100';
  }
}
