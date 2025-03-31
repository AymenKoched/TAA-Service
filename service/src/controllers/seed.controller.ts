import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SeedService } from '../services';

@Controller({ path: 'seed' })
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('super-admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async seedSuperAdmin(): Promise<void> {
    return this.seedService.seedSuperAdmin();
  }

  @Post('roles')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async seedRoles(): Promise<void> {
    return this.seedService.seedRoles();
  }

  @Post('activities')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async seedActivities(): Promise<void> {
    return this.seedService.seedActivities();
  }
}
