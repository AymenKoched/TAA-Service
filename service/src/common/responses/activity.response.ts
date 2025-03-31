import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class ActivityResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;
}
