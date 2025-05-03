import { Transform } from 'class-transformer';
import { IsBoolean, IsString, MaxLength } from 'class-validator';

import { BaseModel } from '../base';
import { ApiPropertyOptional, IsOptional } from '../decorators';
import { StringTransformer } from '../transformers';

export class OrganizationEnvironmentRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(200, { message: 'errors:field.max_length.200' })
  @Transform(StringTransformer)
  electricity?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @Transform(StringTransformer)
  electricityConsumption?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'errors:field.invalid' })
  hasWaterPlant?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @Transform(StringTransformer)
  waterConsumption?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @Transform(StringTransformer)
  recyclablePercentage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'errors:field.invalid' })
  ecoDesigned?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'errors:field.invalid' })
  internalRevaluation?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @Transform(StringTransformer)
  localRecoveryRate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @Transform(StringTransformer)
  exportRate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @Transform(StringTransformer)
  productionIntegrationRate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'errors:field.invalid' })
  hasDevelopProducts?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'errors:field.invalid' })
  hasDevelopProcesses?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'errors:field.invalid' })
  hasDevelopMarkets?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'errors:field.invalid' })
  hasOpenInnovation?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  technicalKnowHow?: string;
}
