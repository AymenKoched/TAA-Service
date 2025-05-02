import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import {
  OrganizationOpportunityCategory,
  OrganizationOpportunityPriority,
} from '../enums';

export class OrganizationOpportunityResponse extends BaseResponseModel {
  @ApiProperty()
  category!: OrganizationOpportunityCategory;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  priority!: OrganizationOpportunityPriority;
}
