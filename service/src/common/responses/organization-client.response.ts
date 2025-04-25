import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class OrganizationClientResponse extends BaseResponseModel {
  @ApiProperty()
  type!: string;

  @ApiProperty()
  count!: number;

  @ApiProperty()
  example!: string;

  @ApiProperty()
  country!: string;
}
