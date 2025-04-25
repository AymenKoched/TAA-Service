import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

import { BaseModel } from '../base';
import { ApiPropertyOptional, IsOptional } from '../decorators';
import { NumberTransformer } from '../transformers';

export class OrganizationTurnoverRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(NumberTransformer)
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  revenue2024?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'errors:field.invalid' })
  hasGrowthComparedTo2023?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(NumberTransformer)
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  growthRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(NumberTransformer)
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  rAndDInvestment2023?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(NumberTransformer)
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  grantsReceived?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(NumberTransformer)
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  productionVolume?: number;
}
