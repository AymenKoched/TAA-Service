import { Injectable } from '@nestjs/common';

import { OrganizationAgeKpi } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationAgeKpiSubscriber extends BaseReclamationSubscriber<OrganizationAgeKpi> {
  protected readonly entityCtor = OrganizationAgeKpi;
  protected readonly entityName = OrganizationAgeKpi.name;
}
