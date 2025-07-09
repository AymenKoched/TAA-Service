import { Injectable } from '@nestjs/common';

import { OrganizationView } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationViewSubscriber extends BaseReclamationSubscriber<OrganizationView> {
  protected readonly entityCtor = OrganizationView;
  protected readonly entityName = OrganizationView.name;
}
