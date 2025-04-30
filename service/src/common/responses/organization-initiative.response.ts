import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class OrganizationInitiativeResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  impact!: string;
}
