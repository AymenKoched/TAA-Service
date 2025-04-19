import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, Validate } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, EmployeesTotalEquals100 } from '../decorators';
import { NumberTransformer, StringTransformer } from '../transformers';

export class OrganizationRevenueKpiRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(200, { message: 'errors:field.max_length.200' })
  @Transform(StringTransformer)
  type!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  men!: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  women?: number;

  @Validate(EmployeesTotalEquals100)
  get _validateTotal() {
    return true;
  }
}
