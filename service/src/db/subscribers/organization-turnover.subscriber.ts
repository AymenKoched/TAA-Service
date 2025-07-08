import { Injectable } from '@nestjs/common';

import { OrganizationTurnover } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationTurnoverSubscriber extends BaseReclamationSubscriber<OrganizationTurnover> {
  protected readonly entityCtor = OrganizationTurnover;
  protected readonly entityName = OrganizationTurnover.name;
}
