import { Injectable } from '@nestjs/common';

import { OrganizationContract } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationContractSubscriber extends BaseReclamationSubscriber<OrganizationContract> {
  protected readonly entityCtor = OrganizationContract;
  protected readonly entityName = OrganizationContract.name;
}
