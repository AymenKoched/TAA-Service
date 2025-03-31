import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { BaseModel } from '../base';
import {
  ApiProperty,
  ApiPropertyOptional,
  IsOptional,
  IsYear,
} from '../decorators';
import { StringArray } from '../models';
import {
  EmailTransformer,
  ModelTransformer,
  NumberTransformer,
  PhoneTransformer,
  StringArrayTransformer,
  StringTransformer,
} from '../transformers';
import { OrganizationSiteRequest } from './organization-site.request';
import { ProductRequest } from './product.request';
import { TagRequest } from './tag.request';

export class OrganizationRequest extends BaseModel {
  @IsNotEmpty({ message: 'errors:field.required' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @ApiProperty()
  @Transform(StringTransformer)
  name!: string;

  @IsNotEmpty({ message: 'errors:field.required' })
  @IsEmail({}, { message: 'errors:field.invalid' })
  @MaxLength(200, { message: 'errors:field.max_length.200' })
  @ApiProperty()
  @Transform(EmailTransformer)
  email!: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(150, { message: 'errors:field.max_length.150' })
  @IsOptional()
  @Transform(StringTransformer)
  fullName?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  headOffice?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  taxNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(undefined, { message: 'errors:url.invalid' })
  @Transform(StringTransformer)
  websiteUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(PhoneTransformer)
  @IsPhoneNumber(undefined, { message: 'errors:field.invalid' })
  phone?: string;

  @ApiPropertyOptional()
  @Type(() => TagRequest)
  @Transform(ModelTransformer(() => TagRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  rAndDSites?: TagRequest[];

  @ApiPropertyOptional()
  @Type(() => TagRequest)
  @Transform(ModelTransformer(() => TagRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  otherLocations?: TagRequest[];

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  address?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  postalCode?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  city?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsYear(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  foundingYear?: number;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @IsOptional()
  @Transform(StringTransformer)
  description?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  legalStatus?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(150, { message: 'errors:field.max_length.150' })
  @IsOptional()
  @Transform(StringTransformer)
  groupAffiliation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(undefined, { message: 'errors:url.invalid' })
  @Transform(StringTransformer)
  linkedin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(undefined, { message: 'errors:url.invalid' })
  @Transform(StringTransformer)
  facebook?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(undefined, { message: 'errors:url.invalid' })
  @Transform(StringTransformer)
  twitter?: string;

  @ApiPropertyOptional()
  @Type(() => ProductRequest)
  @Transform(ModelTransformer(() => ProductRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  products?: ProductRequest[];

  @ApiPropertyOptional()
  @Type(() => StringArray)
  @Transform(StringArrayTransformer)
  @IsOptional()
  primaryActivities?: string[];

  @ApiPropertyOptional()
  @Type(() => StringArray)
  @Transform(StringArrayTransformer)
  @IsOptional()
  secondaryActivities?: string[];

  @ApiPropertyOptional()
  @Type(() => OrganizationSiteRequest)
  @Transform(ModelTransformer(() => OrganizationSiteRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  localSites?: OrganizationSiteRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationSiteRequest)
  @Transform(ModelTransformer(() => OrganizationSiteRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  foreignImplantationSites?: OrganizationSiteRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationSiteRequest)
  @Transform(ModelTransformer(() => OrganizationSiteRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  foreignExportationSites?: OrganizationSiteRequest[];
}

export class UpdateOrganizationRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsOptional(false)
  @IsNotEmpty({ message: 'errors:field.required' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @Transform(StringTransformer)
  name?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(150, { message: 'errors:field.max_length.150' })
  @IsOptional()
  @Transform(StringTransformer)
  fullName?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  headOffice?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  taxNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(undefined, { message: 'errors:url.invalid' })
  @Transform(StringTransformer)
  websiteUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(PhoneTransformer)
  @IsPhoneNumber(undefined, { message: 'errors:field.invalid' })
  phone?: string;

  @ApiPropertyOptional()
  @Type(() => TagRequest)
  @Transform(ModelTransformer(() => TagRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  rAndDSites?: TagRequest[];

  @ApiPropertyOptional()
  @Type(() => TagRequest)
  @Transform(ModelTransformer(() => TagRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  otherLocations?: TagRequest[];

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  address?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  postalCode?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  city?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsYear(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  foundingYear?: number;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @IsOptional()
  @Transform(StringTransformer)
  description?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  legalStatus?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(150, { message: 'errors:field.max_length.150' })
  @IsOptional()
  @Transform(StringTransformer)
  groupAffiliation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(undefined, { message: 'errors:url.invalid' })
  @Transform(StringTransformer)
  linkedin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(undefined, { message: 'errors:url.invalid' })
  @Transform(StringTransformer)
  facebook?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(undefined, { message: 'errors:url.invalid' })
  @Transform(StringTransformer)
  twitter?: string;

  @ApiPropertyOptional()
  @Type(() => ProductRequest)
  @Transform(ModelTransformer(() => ProductRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  products?: ProductRequest[];

  @ApiPropertyOptional()
  @Type(() => StringArray)
  @Transform(StringArrayTransformer)
  @IsOptional()
  primaryActivities?: string[];

  @ApiPropertyOptional()
  @Type(() => StringArray)
  @Transform(StringArrayTransformer)
  @IsOptional()
  secondaryActivities?: string[];

  @ApiPropertyOptional()
  @Type(() => OrganizationSiteRequest)
  @Transform(ModelTransformer(() => OrganizationSiteRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  localSites?: OrganizationSiteRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationSiteRequest)
  @Transform(ModelTransformer(() => OrganizationSiteRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  foreignImplantationSites?: OrganizationSiteRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationSiteRequest)
  @Transform(ModelTransformer(() => OrganizationSiteRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  foreignExportationSites?: OrganizationSiteRequest[];
}
