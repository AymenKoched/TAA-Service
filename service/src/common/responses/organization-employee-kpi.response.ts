import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { EmployeesKpiType } from '../enums';

export class OrganizationEmployeeKpiResponse extends BaseResponseModel {
  @ApiProperty()
  men!: number;

  @ApiProperty()
  women!: number;

  @ApiProperty()
  type!: EmployeesKpiType;
}
