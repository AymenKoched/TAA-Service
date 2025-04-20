import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class OrganizationContractResponse extends BaseResponseModel {
  @ApiProperty()
  men!: number;

  @ApiProperty()
  women!: number;

  @ApiProperty()
  type!: string;
}
