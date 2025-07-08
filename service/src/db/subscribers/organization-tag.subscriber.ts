import { Injectable } from '@nestjs/common';

import { OrganizationTag } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationTagSubscriber extends BaseReclamationSubscriber<OrganizationTag> {
  protected readonly entityCtor = OrganizationTag;
  protected readonly entityName = OrganizationTag.name;
}
