import { Controller, Get } from '@nestjs/common';

import {
  ConvertResponse,
  RoleAccess,
  RoleResponse,
  RolesSearchFilter,
} from '../common';
import { HasRoleAccess } from '../guards';
import { RolesService } from '../services';

@Controller({ path: 'roles' })
export class RolesController {
  constructor(private readonly roles: RolesService) {}

  @Get('admin')
  @HasRoleAccess({ accesses: RoleAccess.ViewRole })
  @ConvertResponse(RoleResponse)
  public async getAdminRoles() {
    return this.roles.search(new RolesSearchFilter({ isAdminRole: true }));
  }
}
