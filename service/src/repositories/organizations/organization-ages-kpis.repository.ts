import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationAgeKpi } from '../../entities';

@Injectable()
export class OrganizationAgesKpisRepository extends BaseRepository<OrganizationAgeKpi> {
  entityType = OrganizationAgeKpi;
}
