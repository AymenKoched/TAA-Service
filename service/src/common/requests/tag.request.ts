import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty } from '../decorators';
import { StringTransformer } from '../transformers';

export class TagRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(200, { message: 'errors:field.max_length.200' })
  @Transform(StringTransformer)
  name!: string;
}
