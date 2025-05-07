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
import { AttributeRequest } from './attribute.request';
import { CountryParticipationRequest } from './country-participation.request';
import { OrganizationAgeKpiRequest } from './organization-age-kpi.request';
import { OrganizationClientRequest } from './organization-client.request';
import { OrganizationContractRequest } from './organization-contract.request';
import { OrganizationEmployeeKpiRequest } from './organization-employee-kpi.request';
import { OrganizationEnvironmentRequest } from './organization-environment.request';
import { OrganizationFormationRequest } from './organization-formation.request';
import { OrganizationInitiativeRequest } from './organization-initiative.request';
import { OrganizationOpportunityRequest } from './organization-opportunity.request';
import { OrganizationQuestionRequest } from './organization-question.request';
import { OrganizationRdProjectRequest } from './organization-rd-project.request';
import { OrganizationResearchDevelopmentRequest } from './organization-research-development.request';
import { OrganizationRevenueKpiRequest } from './organization-revenue-kpi.request';
import { OrganizationSiteRequest } from './organization-site.request';
import { OrganizationTurnoverRequest } from './organization-turnover.request';
import { OrganizationTurnoverDistributionRequest } from './organization-turnover-distribution.request';
import { OrganizationWasteDistributionRequest } from './organization-waste-distribution.request';
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
  @Type(() => TagRequest)
  @Transform(ModelTransformer(() => TagRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  rAndDSites?: TagRequest[];

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
  @IsOptional()
  @Transform(StringTransformer)
  logoUrl?: string;
}

export class UpdateOrganizationRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  taxNumber?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  @Transform(StringTransformer)
  address?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @IsOptional()
  @Transform(StringTransformer)
  description?: string;
}

export class UpdateOrganizationGeneralRequest extends UpdateOrganizationRequest {
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
  legalStatus?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsYear(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  foundingYear?: number;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(150, { message: 'errors:field.max_length.150' })
  @IsOptional()
  @Transform(StringTransformer)
  groupAffiliation?: string;

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
}

export class UpdateOrganizationProductsRequest extends UpdateOrganizationRequest {
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

export class UpdateOrganizationHumanResourcesRequest extends UpdateOrganizationRequest {
  @ApiPropertyOptional()
  @Type(() => OrganizationEmployeeKpiRequest)
  @Transform(ModelTransformer(() => OrganizationEmployeeKpiRequest))
  @IsObject({ message: 'errors:field.required' })
  @ValidateNested({ message: 'errors:field.required' })
  @IsOptional()
  directEmployees?: OrganizationEmployeeKpiRequest;

  @ApiPropertyOptional()
  @Type(() => OrganizationEmployeeKpiRequest)
  @Transform(ModelTransformer(() => OrganizationEmployeeKpiRequest))
  @IsObject({ message: 'errors:field.required' })
  @ValidateNested({ message: 'errors:field.required' })
  @IsOptional()
  indirectEmployees?: OrganizationEmployeeKpiRequest;

  @ApiPropertyOptional()
  @Type(() => OrganizationContractRequest)
  @Transform(ModelTransformer(() => OrganizationContractRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  contracts?: OrganizationContractRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationRevenueKpiRequest)
  @Transform(ModelTransformer(() => OrganizationRevenueKpiRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  revenues?: OrganizationRevenueKpiRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationAgeKpiRequest)
  @Transform(ModelTransformer(() => OrganizationAgeKpiRequest))
  @IsObject({ message: 'errors:field.required' })
  @ValidateNested({ message: 'errors:field.required' })
  @IsOptional()
  ageKpis?: OrganizationAgeKpiRequest;

  @ApiPropertyOptional()
  @Type(() => OrganizationFormationRequest)
  @Transform(ModelTransformer(() => OrganizationFormationRequest))
  @IsObject({ message: 'errors:field.required' })
  @ValidateNested({ message: 'errors:field.required' })
  @IsOptional()
  formationKpi?: OrganizationFormationRequest;
}

export class UpdateOrganizationRevenuesRequest extends UpdateOrganizationRequest {
  @ApiPropertyOptional()
  @Type(() => OrganizationTurnoverDistributionRequest)
  @Transform(ModelTransformer(() => OrganizationTurnoverDistributionRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  turnoverDistribution?: OrganizationTurnoverDistributionRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationClientRequest)
  @Transform(ModelTransformer(() => OrganizationClientRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  clientsTypes?: OrganizationClientRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationTurnoverRequest)
  @Transform(ModelTransformer(() => OrganizationTurnoverRequest))
  @IsObject({ message: 'errors:field.required' })
  @ValidateNested({ message: 'errors:field.required' })
  @IsOptional()
  turnover?: OrganizationTurnoverRequest;

  @ApiPropertyOptional()
  @Type(() => CountryParticipationRequest)
  @Transform(ModelTransformer(() => CountryParticipationRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  countriesParticipation?: CountryParticipationRequest[];
}

export class UpdateOrganizationExtrasRequest extends UpdateOrganizationRequest {
  @ApiPropertyOptional()
  @Type(() => ProductRequest)
  @Transform(ModelTransformer(() => ProductRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  products?: ProductRequest[];

  @ApiPropertyOptional()
  @Type(() => AttributeRequest)
  @Transform(ModelTransformer(() => AttributeRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  investments?: AttributeRequest[];

  @ApiPropertyOptional()
  @Type(() => AttributeRequest)
  @Transform(ModelTransformer(() => AttributeRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  esgs?: AttributeRequest[];

  @ApiPropertyOptional()
  @Type(() => AttributeRequest)
  @Transform(ModelTransformer(() => AttributeRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  partnerships?: AttributeRequest[];

  @ApiPropertyOptional()
  @Type(() => AttributeRequest)
  @Transform(ModelTransformer(() => AttributeRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  technologies?: AttributeRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationResearchDevelopmentRequest)
  @Transform(ModelTransformer(() => OrganizationResearchDevelopmentRequest))
  @IsObject({ message: 'errors:field.required' })
  @ValidateNested({ message: 'errors:field.required' })
  @IsOptional()
  researchDevelopment?: OrganizationResearchDevelopmentRequest;

  @ApiPropertyOptional()
  @Type(() => TagRequest)
  @Transform(ModelTransformer(() => TagRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  certifications?: TagRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationRdProjectRequest)
  @Transform(ModelTransformer(() => OrganizationRdProjectRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  rAndDProjects?: OrganizationRdProjectRequest[];

  @ApiPropertyOptional()
  @Type(() => OrganizationInitiativeRequest)
  @Transform(ModelTransformer(() => OrganizationInitiativeRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  initiatives?: OrganizationInitiativeRequest[];
}

export class UpdateOrganizationOthersRequest extends UpdateOrganizationRequest {
  @ApiPropertyOptional()
  @Type(() => OrganizationEnvironmentRequest)
  @Transform(ModelTransformer(() => OrganizationEnvironmentRequest))
  @IsObject({ message: 'errors:field.required' })
  @ValidateNested({ message: 'errors:field.required' })
  @IsOptional()
  environment?: OrganizationEnvironmentRequest;

  @ApiPropertyOptional()
  @Type(() => OrganizationWasteDistributionRequest)
  @Transform(ModelTransformer(() => OrganizationWasteDistributionRequest))
  @IsObject({ message: 'errors:field.required' })
  @ValidateNested({ message: 'errors:field.required' })
  @IsOptional()
  wasteDistribution?: OrganizationWasteDistributionRequest;

  @ApiPropertyOptional()
  @Type(() => OrganizationQuestionRequest)
  @Transform(ModelTransformer(() => OrganizationQuestionRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  questions?: OrganizationQuestionRequest[];
}

export class UpdateOrganizationOpportunitiesRequest extends UpdateOrganizationRequest {
  @ApiPropertyOptional()
  @Type(() => OrganizationOpportunityRequest)
  @Transform(ModelTransformer(() => OrganizationOpportunityRequest))
  @IsArray({ message: 'errors:field.invalid' })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsOptional()
  opportunities?: OrganizationOpportunityRequest[];
}
