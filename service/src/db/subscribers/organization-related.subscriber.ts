import { Injectable } from '@nestjs/common';

import {
  CountryParticipation,
  OrganizationActivity,
  OrganizationAgeKpi,
  OrganizationAttribute,
  OrganizationClient,
  OrganizationContract,
  OrganizationEmployeeKpi,
  OrganizationEnvironment,
  OrganizationFormationKpi,
  OrganizationInitiative,
  OrganizationOpportunity,
  OrganizationQuestion,
  OrganizationRAndDProject,
  OrganizationResearchDevelopment,
  OrganizationRevenueKpi,
  OrganizationTurnover,
  OrganizationTurnoverDistribution,
  OrganizationView,
  OrganizationWasteDistribution,
} from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationActivitySubscriber extends BaseReclamationSubscriber<OrganizationActivity> {
  protected readonly entityCtor = OrganizationActivity;
  protected readonly entityName = OrganizationActivity.name;
}

@Injectable()
export class OrganizationEmployeeKpiSubscriber extends BaseReclamationSubscriber<OrganizationEmployeeKpi> {
  protected readonly entityCtor = OrganizationEmployeeKpi;
  protected readonly entityName = OrganizationEmployeeKpi.name;
}

@Injectable()
export class OrganizationContractSubscriber extends BaseReclamationSubscriber<OrganizationContract> {
  protected readonly entityCtor = OrganizationContract;
  protected readonly entityName = OrganizationContract.name;
}

@Injectable()
export class OrganizationRevenueKpiSubscriber extends BaseReclamationSubscriber<OrganizationRevenueKpi> {
  protected readonly entityCtor = OrganizationRevenueKpi;
  protected readonly entityName = OrganizationRevenueKpi.name;
}

@Injectable()
export class OrganizationAgeKpiSubscriber extends BaseReclamationSubscriber<OrganizationAgeKpi> {
  protected readonly entityCtor = OrganizationAgeKpi;
  protected readonly entityName = OrganizationAgeKpi.name;
}

@Injectable()
export class OrganizationFormationKpiSubscriber extends BaseReclamationSubscriber<OrganizationFormationKpi> {
  protected readonly entityCtor = OrganizationFormationKpi;
  protected readonly entityName = OrganizationFormationKpi.name;
}

@Injectable()
export class OrganizationTurnoverDistributionSubscriber extends BaseReclamationSubscriber<OrganizationTurnoverDistribution> {
  protected readonly entityCtor = OrganizationTurnoverDistribution;
  protected readonly entityName = OrganizationTurnoverDistribution.name;
}

@Injectable()
export class OrganizationClientSubscriber extends BaseReclamationSubscriber<OrganizationClient> {
  protected readonly entityCtor = OrganizationClient;
  protected readonly entityName = OrganizationClient.name;
}

@Injectable()
export class OrganizationTurnoverSubscriber extends BaseReclamationSubscriber<OrganizationTurnover> {
  protected readonly entityCtor = OrganizationTurnover;
  protected readonly entityName = OrganizationTurnover.name;
}

@Injectable()
export class CountryParticipationSubscriber extends BaseReclamationSubscriber<CountryParticipation> {
  protected readonly entityCtor = CountryParticipation;
  protected readonly entityName = CountryParticipation.name;
}

@Injectable()
export class OrganizationAttributeSubscriber extends BaseReclamationSubscriber<OrganizationAttribute> {
  protected readonly entityCtor = OrganizationAttribute;
  protected readonly entityName = OrganizationAttribute.name;
}

@Injectable()
export class OrganizationResearchDevelopmentSubscriber extends BaseReclamationSubscriber<OrganizationResearchDevelopment> {
  protected readonly entityCtor = OrganizationResearchDevelopment;
  protected readonly entityName = OrganizationResearchDevelopment.name;
}

@Injectable()
export class OrganizationRAndDProjectSubscriber extends BaseReclamationSubscriber<OrganizationRAndDProject> {
  protected readonly entityCtor = OrganizationRAndDProject;
  protected readonly entityName = OrganizationRAndDProject.name;
}

@Injectable()
export class OrganizationInitiativeSubscriber extends BaseReclamationSubscriber<OrganizationInitiative> {
  protected readonly entityCtor = OrganizationInitiative;
  protected readonly entityName = OrganizationInitiative.name;
}

@Injectable()
export class OrganizationEnvironmentSubscriber extends BaseReclamationSubscriber<OrganizationEnvironment> {
  protected readonly entityCtor = OrganizationEnvironment;
  protected readonly entityName = OrganizationEnvironment.name;
}

@Injectable()
export class OrganizationWasteDistributionSubscriber extends BaseReclamationSubscriber<OrganizationWasteDistribution> {
  protected readonly entityCtor = OrganizationWasteDistribution;
  protected readonly entityName = OrganizationWasteDistribution.name;
}

@Injectable()
export class OrganizationQuestionSubscriber extends BaseReclamationSubscriber<OrganizationQuestion> {
  protected readonly entityCtor = OrganizationQuestion;
  protected readonly entityName = OrganizationQuestion.name;
}

@Injectable()
export class OrganizationOpportunitySubscriber extends BaseReclamationSubscriber<OrganizationOpportunity> {
  protected readonly entityCtor = OrganizationOpportunity;
  protected readonly entityName = OrganizationOpportunity.name;
}

@Injectable()
export class OrganizationViewSubscriber extends BaseReclamationSubscriber<OrganizationView> {
  protected readonly entityCtor = OrganizationView;
  protected readonly entityName = OrganizationView.name;
}
