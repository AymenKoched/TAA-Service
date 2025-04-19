import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationRevenueKpi } from '../../entities';

@Injectable()
export class OrganizationRevenuesKpisRepository extends BaseRepository<OrganizationRevenueKpi> {
  entityType = OrganizationRevenueKpi;
}
