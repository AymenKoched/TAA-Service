import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { OrganizationTagType } from '../enums';

export class TagResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  type!: OrganizationTagType;
}
