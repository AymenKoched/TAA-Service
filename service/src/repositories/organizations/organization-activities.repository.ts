import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationActivity } from '../../entities';

@Injectable()
export class OrganizationActivitiesRepository extends BaseRepository<OrganizationActivity> {
  entityType = OrganizationActivity;
}
