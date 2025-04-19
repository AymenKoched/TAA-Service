import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationEmployeeKpi } from '../../entities';

@Injectable()
export class OrganizationEmployeeKpiRepository extends BaseRepository<OrganizationEmployeeKpi> {
  entityType = OrganizationEmployeeKpi;
}
