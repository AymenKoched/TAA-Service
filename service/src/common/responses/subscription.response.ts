import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import { OrganizationFieldsAccess } from '../enums';

export class SubscriptionResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  price?: number;

  @ApiProperty()
  organizationHiddenFields!: OrganizationFieldsAccess[];
}
