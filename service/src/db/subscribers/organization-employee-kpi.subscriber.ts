import { Injectable } from '@nestjs/common';

import { OrganizationEmployeeKpi } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationEmployeeKpiSubscriber extends BaseReclamationSubscriber<OrganizationEmployeeKpi> {
  protected readonly entityCtor = OrganizationEmployeeKpi;
  protected readonly entityName = OrganizationEmployeeKpi.name;
}
