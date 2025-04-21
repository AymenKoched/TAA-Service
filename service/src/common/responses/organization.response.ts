import { Expose, Transform, Type } from 'class-transformer';
import { filter, map } from 'lodash';

import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import {
  OrganizationActivityType,
  OrganizationSiteType,
  OrganizationTagType,
} from '../enums';
import { ModelTransformer } from '../transformers';
import { ActivityResponse } from './activity.response';
import { OrganizationActivityResponse } from './organization-activity.response';
import { OrganizationAgeKpiResponse } from './organization-age-kpi.response';
import { OrganizationContractResponse } from './organization-contract.response';
import { OrganizationEmployeeKpiResponse } from './organization-employee-kpi.response';
import { OrganizationFormationResponse } from './organization-formation.response';
import { OrganizationRevenueKpiResponse } from './organization-revenue-kpi.response';
import { OrganizationSiteResponse } from './organization-site.response';
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
  linkedin?: string;

  @ApiPropertyOptional()
  facebook?: string;

  @ApiPropertyOptional()
  twitter?: string;

  @ApiPropertyOptional()
  headOffice?: string;
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
