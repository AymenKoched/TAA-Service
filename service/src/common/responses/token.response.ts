import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseModel } from '../base';

export class TokenResponse extends BaseResponseModel {
  @ApiProperty()
  accessToken!: string;
}
