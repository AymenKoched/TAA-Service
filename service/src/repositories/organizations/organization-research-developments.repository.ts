import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationResearchDevelopment } from '../../entities';

@Injectable()
export class OrganizationResearchDevelopmentsRepository extends BaseRepository<OrganizationResearchDevelopment> {
  entityType = OrganizationResearchDevelopment;
}
