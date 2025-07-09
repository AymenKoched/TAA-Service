import { Injectable } from '@nestjs/common';

import { OrganizationOpportunity } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationOpportunitySubscriber extends BaseReclamationSubscriber<OrganizationOpportunity> {
  protected readonly entityCtor = OrganizationOpportunity;
  protected readonly entityName = OrganizationOpportunity.name;
}
