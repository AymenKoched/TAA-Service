import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationOpportunity } from '../../entities';

@Injectable()
export class OrganizationOpportunitiesRepository extends BaseRepository<OrganizationOpportunity> {
  entityType = OrganizationOpportunity;
}
