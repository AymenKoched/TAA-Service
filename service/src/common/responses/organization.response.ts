import { Expose, Transform, Type } from 'class-transformer';
import { filter, map } from 'lodash';

import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import {
  OrganizationActivityType,
  OrganizationAttributeType,
  OrganizationSiteType,
  OrganizationTagType,
} from '../enums';
import { ModelTransformer } from '../transformers';
import { ActivityResponse } from './activity.response';
import { AttributeResponse } from './attribute.response';
import { CountryParticipationResponse } from './country-participation.response';
import { OrganizationActivityResponse } from './organization-activity.response';
import { OrganizationAgeKpiResponse } from './organization-age-kpi.response';
import { OrganizationClientResponse } from './organization-client.response';
import { OrganizationContractResponse } from './organization-contract.response';
import { OrganizationEmployeeKpiResponse } from './organization-employee-kpi.response';
import { OrganizationEnvironmentResponse } from './organization-environment.response';
import { OrganizationFormationResponse } from './organization-formation.response';
import { OrganizationInitiativeResponse } from './organization-initiative.response';
import { OrganizationOpportunityResponse } from './organization-opportunity.response';
import { OrganizationQuestionResponse } from './organization-question.response';
import { OrganizationRdProjectResponse } from './organization-rd-project.response';
import { OrganizationResearchDevelopmentResponse } from './organization-research-development.response';
import { OrganizationRevenueKpiResponse } from './organization-revenue-kpi.response';
import { OrganizationSiteResponse } from './organization-site.response';
import { OrganizationTurnoverResponse } from './organization-turnover.response';
import { OrganizationTurnoverDistributionResponse } from './organization-turnover-distribution.response';
import { OrganizationWasteDistributionResponse } from './organization-waste-distribution.response';
import { ProductResponse } from './product.response';
import { TagResponse } from './tag.response';
import { AdherentResponse } from './user.response';

export class OrganizationResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiPropertyOptional()
  adherentId?: string;

  @ApiPropertyOptional()
  @Type(() => AdherentResponse)
  @Transform(ModelTransformer(() => AdherentResponse))
  adherent?: AdherentResponse;

  @ApiPropertyOptional()
  taxNumber?: string;

  @ApiPropertyOptional()
  websiteUrl?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  postalCode?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiPropertyOptional()
  foundingYear?: number;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  legalStatus?: string;

  @ApiPropertyOptional()
  groupAffiliation?: string;

  @ApiPropertyOptional()
  headOffice?: string;

  @ApiPropertyOptional()
  fullName?: string;

  @ApiPropertyOptional()
  linkedin?: string;

  @ApiPropertyOptional()
  facebook?: string;

  @ApiPropertyOptional()
  twitter?: string;
}

export class OrganizationGeneralResponse extends OrganizationResponse {
  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => TagResponse))
  @Type(() => TagResponse)
  tags?: TagResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => TagResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      TagResponse,
      filter(
        map(obj.tags, (tag) =>
          tag.type === OrganizationTagType.RAndD ? tag : null,
        ),
      ) || [],
    ]),
  )
  rAndDSites?: TagResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => TagResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      TagResponse,
      filter(
        map(obj.tags, (tag) =>
          tag.type === OrganizationTagType.OtherLocations ? tag : null,
        ),
      ) || [],
    ]),
  )
  otherLocations?: TagResponse[];
}

export class OrganizationProductsResponse extends OrganizationResponse {
  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => ProductResponse))
  @Type(() => ProductResponse)
  products?: ProductResponse[];

  @ApiPropertyOptional()
  @Type(() => OrganizationActivityResponse)
  @Transform(ModelTransformer(() => OrganizationActivityResponse))
  organizationActivities?: OrganizationActivityResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => ActivityResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      ActivityResponse,
      filter(
        map(obj.organizationActivities, ({ activity, type }) =>
          type === OrganizationActivityType.Primary ? activity : null,
        ),
      ) || [],
    ]),
  )
  primaryActivities?: ActivityResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => ActivityResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      ActivityResponse,
      filter(
        map(obj.organizationActivities, ({ activity, type }) =>
          type === OrganizationActivityType.Secondary ? activity : null,
        ),
      ) || [],
    ]),
  )
  secondaryActivities?: ActivityResponse[];

  @ApiPropertyOptional()
  @Type(() => OrganizationSiteResponse)
  @Transform(ModelTransformer(() => OrganizationSiteResponse))
  sites?: OrganizationSiteResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => OrganizationSiteResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      OrganizationSiteResponse,
      filter(
        map(obj.sites, (site) =>
          site.type === OrganizationSiteType.LocalSite ? site : null,
        ),
      ) || [],
    ]),
  )
  localSites?: OrganizationSiteResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => OrganizationSiteResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      OrganizationSiteResponse,
      filter(
        map(obj.sites, (site) =>
          site.type === OrganizationSiteType.ForeignImplantationSite
            ? site
            : null,
        ),
      ) || [],
    ]),
  )
  foreignImplantationSites?: OrganizationSiteResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => OrganizationSiteResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      OrganizationSiteResponse,
      filter(
        map(obj.sites, (site) =>
          site.type === OrganizationSiteType.ForeignExportationSite
            ? site
            : null,
        ),
      ) || [],
    ]),
  )
  foreignExportationSites?: OrganizationSiteResponse[];
}

export class OrganizationHumanResourcesResponse extends OrganizationResponse {
  @ApiPropertyOptional()
  @Type(() => OrganizationEmployeeKpiResponse)
  @Transform(ModelTransformer(() => OrganizationEmployeeKpiResponse))
  employeesKpis?: OrganizationEmployeeKpiResponse[];

  @ApiPropertyOptional()
  @Type(() => OrganizationContractResponse)
  @Transform(ModelTransformer(() => OrganizationContractResponse))
  contracts?: OrganizationContractResponse[];

  @ApiPropertyOptional()
  @Type(() => OrganizationRevenueKpiResponse)
  @Transform(ModelTransformer(() => OrganizationRevenueKpiResponse))
  revenueKpis?: OrganizationRevenueKpiResponse[];

  @ApiPropertyOptional()
  @Type(() => OrganizationAgeKpiResponse)
  @Transform(ModelTransformer(() => OrganizationAgeKpiResponse))
  ageKpis?: OrganizationAgeKpiResponse;

  @ApiPropertyOptional()
  @Type(() => OrganizationFormationResponse)
  @Transform(ModelTransformer(() => OrganizationFormationResponse))
  formationKpi?: OrganizationFormationResponse;
}

export class OrganizationRevenuesResponse extends OrganizationResponse {
  @ApiPropertyOptional()
  @Type(() => OrganizationTurnoverDistributionResponse)
  @Transform(ModelTransformer(() => OrganizationTurnoverDistributionResponse))
  turnoverDistribution?: OrganizationTurnoverDistributionResponse[];

  @ApiPropertyOptional()
  @Type(() => OrganizationClientResponse)
  @Transform(ModelTransformer(() => OrganizationClientResponse))
  clientsTypes?: OrganizationClientResponse[];

  @ApiPropertyOptional()
  @Type(() => OrganizationTurnoverResponse)
  @Transform(ModelTransformer(() => OrganizationTurnoverResponse))
  turnover?: OrganizationTurnoverResponse;

  @ApiPropertyOptional()
  @Type(() => CountryParticipationResponse)
  @Transform(ModelTransformer(() => CountryParticipationResponse))
  countriesParticipation?: CountryParticipationResponse[];
}

export class OrganizationExtrasResponse extends OrganizationResponse {
  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => ProductResponse))
  @Type(() => ProductResponse)
  products?: ProductResponse[];

  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => AttributeResponse))
  @Type(() => AttributeResponse)
  attributes?: AttributeResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => AttributeResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      AttributeResponse,
      filter(
        map(obj.attributes, (attribute) =>
          attribute.type === OrganizationAttributeType.Investment
            ? attribute
            : null,
        ),
      ) || [],
    ]),
  )
  investments?: AttributeResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => AttributeResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      AttributeResponse,
      filter(
        map(obj.attributes, (attribute) =>
          attribute.type === OrganizationAttributeType.ESG ? attribute : null,
        ),
      ) || [],
    ]),
  )
  esgs?: AttributeResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => AttributeResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      AttributeResponse,
      filter(
        map(obj.attributes, (attribute) =>
          attribute.type === OrganizationAttributeType.Partnerships
            ? attribute
            : null,
        ),
      ) || [],
    ]),
  )
  partnerships?: AttributeResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => AttributeResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      AttributeResponse,
      filter(
        map(obj.attributes, (attribute) =>
          attribute.type === OrganizationAttributeType.Technologies
            ? attribute
            : null,
        ),
      ) || [],
    ]),
  )
  technologies?: AttributeResponse[];

  @ApiPropertyOptional()
  @Type(() => OrganizationResearchDevelopmentResponse)
  @Transform(ModelTransformer(() => OrganizationResearchDevelopmentResponse))
  researchDevelopment?: OrganizationResearchDevelopmentResponse;

  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => TagResponse))
  @Type(() => TagResponse)
  certifications?: TagResponse[];

  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => OrganizationRdProjectResponse))
  @Type(() => OrganizationRdProjectResponse)
  rAndDProjects?: OrganizationRdProjectResponse[];

  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => OrganizationInitiativeResponse))
  @Type(() => OrganizationInitiativeResponse)
  initiatives?: OrganizationInitiativeResponse[];
}

export class OrganizationOthersResponse extends OrganizationResponse {
  @ApiPropertyOptional()
  @Type(() => OrganizationEnvironmentResponse)
  @Transform(ModelTransformer(() => OrganizationEnvironmentResponse))
  environment?: OrganizationEnvironmentResponse;

  @ApiPropertyOptional()
  @Type(() => OrganizationWasteDistributionResponse)
  @Transform(ModelTransformer(() => OrganizationWasteDistributionResponse))
  wasteDistribution?: OrganizationWasteDistributionResponse;

  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => OrganizationQuestionResponse))
  @Type(() => OrganizationQuestionResponse)
  questions?: OrganizationQuestionResponse[];
}

export class OrganizationOpportunitiesResponse extends OrganizationResponse {
  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => OrganizationOpportunityResponse))
  @Type(() => OrganizationOpportunityResponse)
  opportunities?: OrganizationOpportunityResponse[];
}
