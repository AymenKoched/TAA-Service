import { Activity } from './activity.entity';
import { CountryParticipation } from './country-participation.entity';
import { Organization } from './organization.entity';
import { OrganizationActivity } from './organization-activity.entity';
import { OrganizationAgeKpi } from './organization-age-kpi.entity';
import { OrganizationAttribute } from './organization-attribute.entity';
import { OrganizationClient } from './organization-client.entity';
import { OrganizationContract } from './organization-contract.entity';
import { OrganizationEmployeeKpi } from './organization-employee-kpi.entity';
import { OrganizationEnvironment } from './organization-environment.entity';
import { OrganizationFormationKpi } from './organization-formation-kpi.entity';
import { OrganizationInitiative } from './organization-initiative.entity';
import { OrganizationOpportunity } from './organization-opportunity.entity';
import { OrganizationQuestion } from './organization-question.entity';
import { OrganizationRAndDProject } from './organization-rd-project.entity';
import { OrganizationResearchDevelopment } from './organization-research-development.entity';
import { OrganizationRevenueKpi } from './organization-revenue-kpi.entity';
import { OrganizationSite } from './organization-site.entity';
import { OrganizationTag } from './organization-tag.entity';
import { OrganizationTurnover } from './organization-turnover.entity';
import { OrganizationTurnoverDistribution } from './organization-turnover-distribution.entity';
import { OrganizationWasteDistribution } from './organization-waste-distribution.entity';
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
export * from './organization-attribute.entity';
export * from './organization-client.entity';
export * from './organization-contract.entity';
export * from './organization-employee-kpi.entity';
export * from './organization-environment.entity';
export * from './organization-formation-kpi.entity';
export * from './organization-initiative.entity';
export * from './organization-opportunity.entity';
export * from './organization-question.entity';
export * from './organization-rd-project.entity';
export * from './organization-research-development.entity';
export * from './organization-revenue-kpi.entity';
export * from './organization-site.entity';
export * from './organization-tag.entity';
export * from './organization-turnover.entity';
export * from './organization-turnover-distribution.entity';
export * from './organization-waste-distribution.entity';
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
  OrganizationFormationKpi,
  OrganizationTurnoverDistribution,
  OrganizationClient,
  OrganizationTurnover,
  CountryParticipation,
  OrganizationAttribute,
  OrganizationResearchDevelopment,
  OrganizationRAndDProject,
  OrganizationInitiative,
  OrganizationEnvironment,
  OrganizationWasteDistribution,
  OrganizationQuestion,
  OrganizationOpportunity,
];
