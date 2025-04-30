import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { OrganizationAttributeType } from '../enums';

export class AttributeResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  value!: string;

  @ApiProperty()
  type!: OrganizationAttributeType;
}
