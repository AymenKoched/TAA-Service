import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationView } from '../../entities';

@Injectable()
export class OrganizationViewsRepository extends BaseRepository<OrganizationView> {
  entityType = OrganizationView;
}
