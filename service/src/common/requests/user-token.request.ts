import { IsEnum, IsNotEmpty } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty } from '../decorators';
import { UserTokenType } from '../enums';

export class UserTokenRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserTokenType)
  type!: UserTokenType;

  @ApiProperty()
  @IsNotEmpty()
  userId!: string;
}
