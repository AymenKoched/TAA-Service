import { Activity } from './activity.entity';
import { CountryParticipation } from './country-participation.entity';
import { Organization } from './organization.entity';
import { OrganizationActivity } from './organization-activity.entity';
import { OrganizationAgeKpi } from './organization-age-kpi.entity';
import { OrganizationClient } from './organization-client.entity';
import { OrganizationContract } from './organization-contract.entity';
import { OrganizationEmployeeKpi } from './organization-employee-kpi.entity';
import { OrganizationRevenueKpi } from './organization-revenue-kpi.entity';
import { OrganizationSite } from './organization-site.entity';
import { OrganizationTag } from './organization-tag.entity';
import { OrganizationTurnover } from './organization-turnover.entity';
import { OrganizationTurnoverDistribution } from './organization-turnover-distribution.entity';
import { Product } from './product.entity';
import { Role } from './role.entity';
import { Adherent, Admin, Client, User } from './user.entity';
import { UserRole } from './user-role.entity';
import { UserToken } from './user-token.entity';

export * from './activity.entity';
export * from './country-participation.entity';
export * from './organization.entity';
export * from './organization-activity.entity';
export * from './organization-age-kpi.entity';
export * from './organization-client.entity';
export * from './organization-contract.entity';
export * from './organization-employee-kpi.entity';
export * from './organization-revenue-kpi.entity';
export * from './organization-site.entity';
export * from './organization-tag.entity';
export * from './organization-turnover.entity';
export * from './organization-turnover-distribution.entity';
export * from './product.entity';
export * from './role.entity';
export * from './user.entity';
export * from './user-role.entity';
export * from './user-token.entity';

export const entities = [
  User,
  Admin,
  Client,
  Adherent,
  Role,
  UserRole,
  UserToken,
  Organization,
  OrganizationTag,
  Product,
  OrganizationSite,
  Activity,
  OrganizationActivity,
  OrganizationEmployeeKpi,
  OrganizationContract,
  OrganizationRevenueKpi,
  OrganizationAgeKpi,
  OrganizationTurnoverDistribution,
  OrganizationClient,
  OrganizationTurnover,
  CountryParticipation,
];
