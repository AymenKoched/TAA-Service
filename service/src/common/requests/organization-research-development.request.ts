import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

import { BaseModel } from '../base';
import { ApiPropertyOptional, IsOptional } from '../decorators';
import { NumberTransformer } from '../transformers';

export class OrganizationResearchDevelopmentRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(NumberTransformer)
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  budget2024?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(NumberTransformer)
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  patentsCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(NumberTransformer)
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  revenuePercentage?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'errors:field.invalid' })
  universityPartnerships?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(NumberTransformer)
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  projectsInProgress?: number;
}
