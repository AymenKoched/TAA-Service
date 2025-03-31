import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { Activity } from '../../entities';
import { ActivitiesRepository } from '../../repositories';

@Injectable()
export class ActivitiesService extends CrudService<Activity> {
  protected notFoundErrorKey = AuthErrors.ActivityNotFound;
  protected notFoundErrorMessage = 'The searched activity is not found';

  constructor(private readonly activities: ActivitiesRepository) {
    super(activities);
  }
}
