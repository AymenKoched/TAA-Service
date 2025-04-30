import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, Min, Validate } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, EmployeesTotalEquals100 } from '../decorators';
import { OrganizationContractType } from '../enums';
import { NumberTransformer } from '../transformers';

export class OrganizationContractRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsEnum(OrganizationContractType, { message: 'errors:field.invalid' })
  type!: OrganizationContractType;

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

  @Validate(EmployeesTotalEquals100)
  get _validateTotal() {
    return true;
  }
}
