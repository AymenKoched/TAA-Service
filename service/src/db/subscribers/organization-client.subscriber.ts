import { Injectable } from '@nestjs/common';

import { OrganizationClient } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationClientSubscriber extends BaseReclamationSubscriber<OrganizationClient> {
  protected readonly entityCtor = OrganizationClient;
  protected readonly entityName = OrganizationClient.name;
}
