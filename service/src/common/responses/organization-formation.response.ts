import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class OrganizationFormationResponse extends BaseResponseModel {
  @ApiProperty()
  menHours?: number;

  @ApiProperty()
  womenHours?: number;

  @ApiProperty()
  mainFormation?: string;

  @ApiProperty()
  location?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  employeesTrained?: string;

  @ApiProperty()
  revenueInvestment?: string;
}
