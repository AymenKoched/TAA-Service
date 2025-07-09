import { Injectable } from '@nestjs/common';

import { OrganizationRevenueKpi } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationRevenueKpiSubscriber extends BaseReclamationSubscriber<OrganizationRevenueKpi> {
  protected readonly entityCtor = OrganizationRevenueKpi;
  protected readonly entityName = OrganizationRevenueKpi.name;
}
