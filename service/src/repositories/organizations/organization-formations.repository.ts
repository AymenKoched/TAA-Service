import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationFormationKpi } from '../../entities/organization-formation-kpi.entity';

@Injectable()
export class OrganizationFormationsRepository extends BaseRepository<OrganizationFormationKpi> {
  entityType = OrganizationFormationKpi;
}
