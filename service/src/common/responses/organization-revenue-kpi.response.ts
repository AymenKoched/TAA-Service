import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class OrganizationRevenueKpiResponse extends BaseResponseModel {
  @ApiProperty()
  men!: number;

  @ApiProperty()
  women!: number;

  @ApiProperty()
  type!: string;
}
