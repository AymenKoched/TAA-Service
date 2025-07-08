import { Injectable } from '@nestjs/common';

import { OrganizationActivity } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationActivitySubscriber extends BaseReclamationSubscriber<OrganizationActivity> {
  protected readonly entityCtor = OrganizationActivity;
  protected readonly entityName = OrganizationActivity.name;
}
