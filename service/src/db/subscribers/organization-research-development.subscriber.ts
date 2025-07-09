import { Injectable } from '@nestjs/common';

import { OrganizationResearchDevelopment } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationResearchDevelopmentSubscriber extends BaseReclamationSubscriber<OrganizationResearchDevelopment> {
  protected readonly entityCtor = OrganizationResearchDevelopment;
  protected readonly entityName = OrganizationResearchDevelopment.name;
}
