import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationSite } from '../../entities';

@Injectable()
export class OrganizationSitesRepository extends BaseRepository<OrganizationSite> {
  entityType = OrganizationSite;
}
