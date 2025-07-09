import { Injectable } from '@nestjs/common';

import { OrganizationEnvironment } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationEnvironmentSubscriber extends BaseReclamationSubscriber<OrganizationEnvironment> {
  protected readonly entityCtor = OrganizationEnvironment;
  protected readonly entityName = OrganizationEnvironment.name;
}
