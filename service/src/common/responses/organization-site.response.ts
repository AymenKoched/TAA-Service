import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { OrganizationSiteType } from '../enums';

export class OrganizationSiteResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  capacity!: number;

  @ApiProperty()
  type!: OrganizationSiteType;
}
