import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  Validate,
} from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, EmployeesTotalInferior100 } from '../decorators';
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
  @Min(0, { message: 'errors:field.invalid' })
  men!: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  @Min(0, { message: 'errors:field.invalid' })
  women?: number;

  @Validate(EmployeesTotalInferior100)
  get _validateTotal() {
    return true;
  }
}
