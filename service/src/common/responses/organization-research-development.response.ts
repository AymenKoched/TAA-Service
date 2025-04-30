import { BaseResponseModel } from '../base';
import { ApiPropertyOptional } from '../decorators';

export class OrganizationResearchDevelopmentResponse extends BaseResponseModel {
  @ApiPropertyOptional()
  budget2024?: number;

  @ApiPropertyOptional()
  patentsCount?: number;

  @ApiPropertyOptional()
  revenuePercentage?: number;

  @ApiPropertyOptional()
  universityPartnerships?: boolean;

  @ApiPropertyOptional()
  projectsInProgress?: number;
}
