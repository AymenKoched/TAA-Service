import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty } from '../decorators';
import { NameTransformer } from '../transformers';

export class UserTokenRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(NameTransformer)
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  userId!: string;
}
