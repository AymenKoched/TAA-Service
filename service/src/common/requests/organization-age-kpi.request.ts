import { Transform } from 'class-transformer';
import { IsNotEmpty, Min, Validate } from 'class-validator';

import { BaseModel } from '../base';
import { AgesTotal100Validator, ApiProperty } from '../decorators';
import { NumberTransformer } from '../transformers';

export class OrganizationAgeKpiRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  @Min(0, { message: 'errors:field.invalid' })
  count18_24!: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  @Min(0, { message: 'errors:field.invalid' })
  count25_30!: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  @Min(0, { message: 'errors:field.invalid' })
  count31_36!: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  @Min(0, { message: 'errors:field.invalid' })
  count37Plus!: number;

  @Validate(AgesTotal100Validator)
  get _validateTotal() {
    return true;
  }
}
