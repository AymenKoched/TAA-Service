import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class TagResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;
}
