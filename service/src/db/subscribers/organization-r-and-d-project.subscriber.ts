import { Injectable } from '@nestjs/common';

import { OrganizationRAndDProject } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationRAndDProjectSubscriber extends BaseReclamationSubscriber<OrganizationRAndDProject> {
  protected readonly entityCtor = OrganizationRAndDProject;
  protected readonly entityName = OrganizationRAndDProject.name;
}
