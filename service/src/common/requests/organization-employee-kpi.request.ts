import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, EmployeesTotalEquals100 } from '../decorators';
import { NumberTransformer } from '../transformers';

export class OrganizationEmployeeKpiRequest extends BaseModel {
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
