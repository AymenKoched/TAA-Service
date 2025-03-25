import { Transform, Type } from 'class-transformer';

import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import { ModelTransformer } from '../transformers';
import { UserResponse } from './user.response';

export class UserTokenResponse extends BaseResponseModel {
  @ApiProperty()
  token!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  expirationDate?: Date;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ type: () => UserResponse })
  @Transform(ModelTransformer(() => UserResponse))
  @Type(() => UserResponse)
  user!: UserResponse;
}
