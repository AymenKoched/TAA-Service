import { Controller, Get, UseGuards } from '@nestjs/common';

import { ActivityResponse, ConvertResponse, RoleAccess } from '../common';
import { HasRoleAccess, JwtAuthGuard } from '../guards';
import { ActivitiesService } from '../services';

@Controller({ path: 'activities' })
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
  constructor(private readonly activities: ActivitiesService) {}

  @Get()
  @HasRoleAccess({ accesses: RoleAccess.ViewActivity })
  @ConvertResponse(ActivityResponse)
  public async getActivities() {
    return this.activities.search({});
  }
}
