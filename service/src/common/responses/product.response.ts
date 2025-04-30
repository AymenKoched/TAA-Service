import { Transform, Type } from 'class-transformer';

import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import { ModelTransformer } from '../transformers';
import { OrganizationResponse } from './organization.response';

export class ProductResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  ngp?: string;

  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => OrganizationResponse))
  @Type(() => OrganizationResponse)
  organization?: OrganizationResponse;
}
