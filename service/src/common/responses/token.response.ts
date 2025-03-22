import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class TokenResponse extends BaseResponseModel {
  @ApiProperty()
  accessToken!: string;
}
