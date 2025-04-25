import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationTurnoverDistribution } from '../../entities';

@Injectable()
export class OrganizationTurnoverDistributionsRepository extends BaseRepository<OrganizationTurnoverDistribution> {
  entityType = OrganizationTurnoverDistribution;
}
