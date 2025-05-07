import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, ApiPropertyOptional, IsOptional } from '../decorators';
import { StringTransformer } from '../transformers';

export class ProductRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(200, { message: 'errors:field.max_length.200' })
  @Transform(StringTransformer)
  name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  ngp?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @IsOptional()
  @Transform(StringTransformer)
  description?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @IsOptional()
  @Transform(StringTransformer)
  photoUrl?: string;
}
