import { Transform, Type } from 'class-transformer';

import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { ModelTransformer } from '../transformers';
import { TokenResponse } from './token.response';

export class SignInResponse extends BaseResponseModel {
  @ApiProperty()
  @Transform(ModelTransformer(() => TokenResponse))
  @Type(() => TokenResponse)
  token!: TokenResponse;
}
