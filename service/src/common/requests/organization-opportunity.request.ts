import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, ApiPropertyOptional, IsOptional } from '../decorators';
import {
  OrganizationOpportunityCategory,
  OrganizationOpportunityPriority,
} from '../enums';
import { StringTransformer } from '../transformers';

export class OrganizationOpportunityRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(50, { message: 'errors:field.max_length.50' })
  @Transform(StringTransformer)
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsEnum(OrganizationOpportunityCategory, { message: 'errors:field.invalid' })
  category!: OrganizationOpportunityCategory;

  @ApiProperty()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(500, { message: 'errors:field.max_length.500' })
  @Transform(StringTransformer)
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsEnum(OrganizationOpportunityPriority, { message: 'errors:field.invalid' })
  priority!: OrganizationOpportunityPriority;
}
