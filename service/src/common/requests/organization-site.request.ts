import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty } from '../decorators';
import { NumberTransformer, StringTransformer } from '../transformers';

export class OrganizationSiteRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(200, { message: 'errors:field.max_length.200' })
  @Transform(StringTransformer)
  name!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  capacity!: number;
}
