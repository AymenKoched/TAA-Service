import { BaseResponseModel } from '../base';
import { ApiPropertyOptional } from '../decorators';

export class OrganizationTurnoverResponse extends BaseResponseModel {
  @ApiPropertyOptional()
  revenue2024?: number;

  @ApiPropertyOptional()
  hasGrowthComparedTo2023?: boolean;

  @ApiPropertyOptional()
  growthRate?: number;

  @ApiPropertyOptional()
  rAndDInvestment2023?: number;

  @ApiPropertyOptional()
  grantsReceived?: number;

  @ApiPropertyOptional()
  productionVolume?: number;
}
