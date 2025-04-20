import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationEmployeeKpi } from '../../entities';

@Injectable()
export class OrganizationEmployeesKpisRepository extends BaseRepository<OrganizationEmployeeKpi> {
  entityType = OrganizationEmployeeKpi;
}
