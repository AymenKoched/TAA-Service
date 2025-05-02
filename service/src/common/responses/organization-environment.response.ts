import { BaseResponseModel } from '../base';
import { ApiPropertyOptional } from '../decorators';

export class OrganizationEnvironmentResponse extends BaseResponseModel {
  @ApiPropertyOptional()
  electricity?: string;

  @ApiPropertyOptional()
  electricityConsumption?: string;

  @ApiPropertyOptional()
  hasWaterPlant?: boolean;

  @ApiPropertyOptional()
  waterConsumption?: string;

  @ApiPropertyOptional()
  recyclablePercentage?: string;

  @ApiPropertyOptional()
  ecoDesigned?: boolean;

  @ApiPropertyOptional()
  internalRevaluation?: boolean;

  @ApiPropertyOptional()
  localRecoveryRate?: string;

  @ApiPropertyOptional()
  exportRate?: string;

  @ApiPropertyOptional()
  productionIntegrationRate?: string;

  @ApiPropertyOptional()
  hasDevelopProducts?: boolean;

  @ApiPropertyOptional()
  hasDevelopProcesses?: boolean;

  @ApiPropertyOptional()
  hasDevelopMarkets?: boolean;

  @ApiPropertyOptional()
  hasOpenInnovation?: boolean;

  @ApiPropertyOptional()
  technicalKnowHow?: string;
}
