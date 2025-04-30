import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, ApiPropertyOptional, IsOptional } from '../decorators';
import { StringTransformer } from '../transformers';

export class OrganizationRdProjectRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  objectif?: string;
}
