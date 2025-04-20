import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationContract } from '../../entities';

@Injectable()
export class OrganizationContractsRepository extends BaseRepository<OrganizationContract> {
  entityType = OrganizationContract;
}
