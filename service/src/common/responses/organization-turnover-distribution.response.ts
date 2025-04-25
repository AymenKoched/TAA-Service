import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class OrganizationTurnoverDistributionResponse extends BaseResponseModel {
  @ApiProperty()
  type!: string;

  @ApiProperty()
  count!: number;
}
