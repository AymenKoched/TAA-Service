import { Injectable } from '@nestjs/common';

import { OrganizationTurnoverDistribution } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationTurnoverDistributionSubscriber extends BaseReclamationSubscriber<OrganizationTurnoverDistribution> {
  protected readonly entityCtor = OrganizationTurnoverDistribution;
  protected readonly entityName = OrganizationTurnoverDistribution.name;
}
