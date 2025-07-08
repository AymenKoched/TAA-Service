import { Injectable } from '@nestjs/common';

import { OrganizationSite } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationSiteSubscriber extends BaseReclamationSubscriber<OrganizationSite> {
  protected readonly entityCtor = OrganizationSite;
  protected readonly entityName = OrganizationSite.name;
}
