import { Injectable } from '@nestjs/common';

import { OrganizationAttribute } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationAttributeSubscriber extends BaseReclamationSubscriber<OrganizationAttribute> {
  protected readonly entityCtor = OrganizationAttribute;
  protected readonly entityName = OrganizationAttribute.name;
}
