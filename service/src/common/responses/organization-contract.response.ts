import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { OrganizationContractType } from '../enums';

export class OrganizationContractResponse extends BaseResponseModel {
  @ApiProperty()
  men!: number;

  @ApiProperty()
  women!: number;

  @ApiProperty()
  type!: OrganizationContractType;
}
