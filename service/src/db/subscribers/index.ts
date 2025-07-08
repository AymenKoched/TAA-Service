import { CountryParticipationSubscriber } from './country-participation.subscriber';
import { OrganizationSubscriber } from './organization.subscriber';
import { OrganizationActivitySubscriber } from './organization-activity.subscriber';
import { OrganizationAgeKpiSubscriber } from './organization-age-kpi.subscriber';
import { OrganizationAttributeSubscriber } from './organization-attribute.subscriber';
import { OrganizationClientSubscriber } from './organization-client.subscriber';
import { OrganizationContractSubscriber } from './organization-contract.subscriber';
import { OrganizationEmployeeKpiSubscriber } from './organization-employee-kpi.subscriber';
import { OrganizationEnvironmentSubscriber } from './organization-environment.subscriber';
import { OrganizationFormationKpiSubscriber } from './organization-formation-kpi.subscriber';
import { OrganizationInitiativeSubscriber } from './organization-initiative.subscriber';
import { OrganizationOpportunitySubscriber } from './organization-opportunity.subscriber';
import { OrganizationQuestionSubscriber } from './organization-question.subscriber';
import { OrganizationRAndDProjectSubscriber } from './organization-r-and-d-project.subscriber';
import { OrganizationResearchDevelopmentSubscriber } from './organization-research-development.subscriber';
import { OrganizationRevenueKpiSubscriber } from './organization-revenue-kpi.subscriber';
import { OrganizationSiteSubscriber } from './organization-site.subscriber';
import { OrganizationTagSubscriber } from './organization-tag.subscriber';
import { OrganizationTurnoverSubscriber } from './organization-turnover.subscriber';
import { OrganizationTurnoverDistributionSubscriber } from './organization-turnover-distribution.subscriber';
import { OrganizationViewSubscriber } from './organization-view.subscriber';
import { OrganizationWasteDistributionSubscriber } from './organization-waste-distribution.subscriber';
import { ProductSubscriber } from './product.subscriber';

export * from './basic.subscriber';
export * from './country-participation.subscriber';
export * from './organization.subscriber';
export * from './organization-activity.subscriber';
export * from './organization-age-kpi.subscriber';
export * from './organization-attribute.subscriber';
export * from './organization-client.subscriber';
export * from './organization-contract.subscriber';
export * from './organization-employee-kpi.subscriber';
export * from './organization-environment.subscriber';
export * from './organization-formation-kpi.subscriber';
export * from './organization-initiative.subscriber';
export * from './organization-opportunity.subscriber';
export * from './organization-question.subscriber';
export * from './organization-r-and-d-project.subscriber';
export * from './organization-research-development.subscriber';
export * from './organization-revenue-kpi.subscriber';
export * from './organization-site.subscriber';
export * from './organization-tag.subscriber';
export * from './organization-turnover.subscriber';
export * from './organization-turnover-distribution.subscriber';
export * from './organization-view.subscriber';
export * from './organization-waste-distribution.subscriber';
export * from './product.subscriber';

export const subscribers = [
  OrganizationSubscriber,
  OrganizationTagSubscriber,
  ProductSubscriber,
  OrganizationSiteSubscriber,
  OrganizationActivitySubscriber,
  OrganizationEmployeeKpiSubscriber,
  OrganizationContractSubscriber,
  OrganizationRevenueKpiSubscriber,
  OrganizationAgeKpiSubscriber,
  OrganizationFormationKpiSubscriber,
  OrganizationTurnoverDistributionSubscriber,
  OrganizationClientSubscriber,
  OrganizationTurnoverSubscriber,
  CountryParticipationSubscriber,
  OrganizationAttributeSubscriber,
  OrganizationResearchDevelopmentSubscriber,
  OrganizationRAndDProjectSubscriber,
  OrganizationInitiativeSubscriber,
  OrganizationEnvironmentSubscriber,
  OrganizationWasteDistributionSubscriber,
  OrganizationQuestionSubscriber,
  OrganizationOpportunitySubscriber,
  OrganizationViewSubscriber,
];
