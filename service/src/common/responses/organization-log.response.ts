import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class OrganizationLogResponse extends BaseResponseModel {
  @ApiProperty()
  entity!: string;

  @ApiProperty()
  entityId!: string;

  @ApiProperty()
  before!: Record<string, any>;

  @ApiProperty()
  after!: Record<string, any>;
}
