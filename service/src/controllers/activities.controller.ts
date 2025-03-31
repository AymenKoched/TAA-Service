import { Controller, Get } from '@nestjs/common';

import { ActivityResponse, ConvertResponse, RoleAccess } from '../common';
import { HasRoleAccess } from '../guards';
import { ActivitiesService } from '../services';

@Controller({ path: 'activities' })
export class ActivitiesController {
  constructor(private readonly activities: ActivitiesService) {}

  @Get()
  @HasRoleAccess({ accesses: RoleAccess.ViewActivity })
  @ConvertResponse(ActivityResponse)
  public async getUserDetails() {
    return this.activities.search({});
  }
}
