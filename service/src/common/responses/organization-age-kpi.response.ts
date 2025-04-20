import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class OrganizationAgeKpiResponse extends BaseResponseModel {
  @ApiProperty()
  count18_24!: number;

  @ApiProperty()
  count25_30!: number;

  @ApiProperty()
  count31_36!: number;

  @ApiProperty()
  count37Plus!: number;
}
