import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, IsOptional } from '../decorators';
import { StringTransformer } from '../transformers';

export class OrganizationQuestionRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  question!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  response!: string;

  @ApiProperty()
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  @IsOptional()
  details!: string;
}
