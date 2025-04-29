import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';

export class OrganizationRdProjectResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  objectif?: string;
}
