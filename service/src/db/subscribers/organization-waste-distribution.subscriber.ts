import { Injectable } from '@nestjs/common';

import { OrganizationWasteDistribution } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationWasteDistributionSubscriber extends BaseReclamationSubscriber<OrganizationWasteDistribution> {
  protected readonly entityCtor = OrganizationWasteDistribution;
  protected readonly entityName = OrganizationWasteDistribution.name;
}
