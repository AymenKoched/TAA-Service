import { Injectable } from '@nestjs/common';

import { OrganizationFormationKpi } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationFormationKpiSubscriber extends BaseReclamationSubscriber<OrganizationFormationKpi> {
  protected readonly entityCtor = OrganizationFormationKpi;
  protected readonly entityName = OrganizationFormationKpi.name;
}
