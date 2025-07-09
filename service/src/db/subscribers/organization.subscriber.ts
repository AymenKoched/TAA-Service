import { Injectable } from '@nestjs/common';

import { Organization } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationSubscriber extends BaseReclamationSubscriber<Organization> {
  protected readonly entityCtor = Organization;
  protected readonly entityName = Organization.name;

  protected readonly doAfterInsert = false;
}
