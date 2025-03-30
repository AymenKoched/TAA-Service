import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { Activity } from '../../entities';

@Injectable()
export class ActivitiesRepository extends BaseRepository<Activity> {
  entityType = Activity;
}
