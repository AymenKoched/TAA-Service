import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty } from '../decorators';
import { StringTransformer } from '../transformers';

export class OrganizationInitiativeRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(200, { message: 'errors:field.max_length.200' })
  @Transform(StringTransformer)
  name!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(500, { message: 'errors:field.max_length.500' })
  @Transform(StringTransformer)
  impact!: string;
}
