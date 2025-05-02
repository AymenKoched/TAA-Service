import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationWasteDistribution } from '../../entities';

@Injectable()
export class OrganizationWasteDistributionsRepository extends BaseRepository<OrganizationWasteDistribution> {
  entityType = OrganizationWasteDistribution;
}
