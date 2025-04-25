import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty } from '../decorators';
import { NumberTransformer, StringTransformer } from '../transformers';

export class OrganizationClientRequest extends BaseModel {
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
  count!: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  example!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  country!: string;
}
