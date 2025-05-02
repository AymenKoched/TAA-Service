import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationFormationKpi } from '../../entities';

@Injectable()
export class OrganizationFormationsRepository extends BaseRepository<OrganizationFormationKpi> {
  entityType = OrganizationFormationKpi;
}
