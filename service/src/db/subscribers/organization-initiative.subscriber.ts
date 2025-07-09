import { Injectable } from '@nestjs/common';

import { OrganizationInitiative } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationInitiativeSubscriber extends BaseReclamationSubscriber<OrganizationInitiative> {
  protected readonly entityCtor = OrganizationInitiative;
  protected readonly entityName = OrganizationInitiative.name;
}
