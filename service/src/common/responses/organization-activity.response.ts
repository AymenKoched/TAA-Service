import { Transform, Type } from 'class-transformer';

import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { OrganizationActivityType } from '../enums';
import { ModelTransformer } from '../transformers';
import { ActivityResponse } from './activity.response';
import { OrganizationResponse } from './organization.response';

export class OrganizationActivityResponse extends BaseResponseModel {
  @ApiProperty()
  organizationId!: string;

  @ApiProperty()
  type!: OrganizationActivityType;

  @ApiProperty()
  @Transform(ModelTransformer(() => OrganizationResponse))
  @Type(() => OrganizationResponse)
  organization?: OrganizationResponse;

  @ApiProperty()
  activityId!: string;

  @ApiProperty()
  @Transform(ModelTransformer(() => ActivityResponse))
  @Type(() => ActivityResponse)
  activity?: ActivityResponse;
}
