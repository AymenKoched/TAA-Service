import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';

import { BaseModel } from '../base';
import { AgesTotal100Validator, ApiProperty } from '../decorators';
import { NumberTransformer } from '../transformers';

export class OrganizationAgeKpiRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  count18_24!: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  count25_30!: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  count31_36!: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  count37Plus!: number;

  @Validate(AgesTotal100Validator)
  get _validateTotal() {
    return true;
  }
}
