import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationActivity } from '../../entities';
import { OrganizationActivitiesRepository } from '../../repositories';

@Injectable()
export class OrganizationActivitiesService extends CrudService<OrganizationActivity> {
  protected notFoundErrorKey = AuthErrors.OrganizationActivityNotFound;
  protected notFoundErrorMessage =
    'The searched organization activity is not found';

  constructor(
    private readonly organizationActivities: OrganizationActivitiesRepository,
  ) {
    super(organizationActivities);
  }
}
