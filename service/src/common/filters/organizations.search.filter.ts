import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { SearchQuery } from '../base';
import { ApiPropertyOptional, IsOptional, IsYear } from '../decorators';
import { OrganizationActivityType } from '../enums';
import { StringArray } from '../models';
import { NumberTransformer, StringArrayTransformer } from '../transformers';

export class OrganizationsSearchFilter extends SearchQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => StringArray)
  @Transform(StringArrayTransformer)
  'organizationActivities.activityId'?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  'organizationActivities.type'?: OrganizationActivityType;

  @ApiPropertyOptional()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsYear(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  foundingYear?: number;

  @ApiPropertyOptional()
  @IsOptional()
  'turnover.productionVolume'?: number;

  @ApiPropertyOptional()
  @IsOptional()
  'turnover.revenue2024'?: number;
}
