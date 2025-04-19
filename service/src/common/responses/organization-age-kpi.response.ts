import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { AgeRange } from '../enums';

export class OrganizationAgeKpiResponse extends BaseResponseModel {
  @ApiProperty()
  ageRange!: AgeRange;

  @ApiProperty()
  count!: number;
}
