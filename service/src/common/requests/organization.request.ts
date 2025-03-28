import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { BaseModel } from '../base';
import { NAMES_REGEX } from '../constants';
import {
  ApiProperty,
  ApiPropertyOptional,
  IsOptional,
  IsYear,
} from '../decorators';
import {
  EmailTransformer,
  ModelTransformer,
  NameTransformer,
  NumberTransformer,
  PhoneTransformer,
  StringTransformer,
} from '../transformers';
import { TagRequest } from './tag.request';

export class OrganizationRequest extends BaseModel {
  @IsNotEmpty({ message: 'errors:field.required' })
  @Matches(NAMES_REGEX, { message: 'errors:field.alphabetic' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @ApiProperty()
  @Transform(NameTransformer)
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
  @IsArray({ message: 'errors:field.required' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  rAndDSites?: TagRequest[];

  @ApiPropertyOptional()
  @Type(() => TagRequest)
  @Transform(ModelTransformer(() => TagRequest))
  @IsArray({ message: 'errors:field.required' })
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
  @IsNotEmpty()
  @IsOptional()
  @IsYear(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  foundingYear?: number;

  @ApiPropertyOptional()
  @IsNotEmpty({ message: 'errors:field.required' })
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
}

export class UpdateOrganizationRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsOptional(false)
  @IsNotEmpty({ message: 'errors:field.required' })
  @Matches(NAMES_REGEX, { message: 'errors:field.alphabetic' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @Transform(NameTransformer)
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
  @IsArray({ message: 'errors:field.required' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  rAndDSites?: TagRequest[];

  @ApiPropertyOptional()
  @Type(() => TagRequest)
  @Transform(ModelTransformer(() => TagRequest))
  @IsArray({ message: 'errors:field.required' })
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
  @IsNotEmpty()
  @IsOptional()
  @IsYear(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  foundingYear?: number;

  @ApiPropertyOptional()
  @IsNotEmpty({ message: 'errors:field.required' })
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
}
