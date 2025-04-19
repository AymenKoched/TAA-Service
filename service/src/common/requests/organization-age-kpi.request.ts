import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty } from '../decorators';
import { AgeRange } from '../enums';
import { NumberTransformer } from '../transformers';

export class OrganizationAgeKpiRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsEnum(AgeRange, { message: 'errors:field.invalid' })
  ageRange!: AgeRange;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  count!: number;
}
