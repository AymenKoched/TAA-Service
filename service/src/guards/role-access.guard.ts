import {
  applyDecorators,
  Inject,
  Injectable,
  Scope,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { every, includes, isArray, some } from 'lodash';

import { RoleAccess, UserRoleResponse } from '../common';
import { UserRolesRepository } from '../repositories';
import { JwtAuthGuard } from './auth.guard';
import { AccessContext, BaseAccessGuard } from './base-access.guard';

export type RoleAccessOptions = {
  accesses?: RoleAccess | RoleAccess[];
};

export const ROLE_ACCESS_CONFIG_METADATA = 'role_access_config';

export function HasRoleAccess(opts?: RoleAccessOptions) {
  return applyDecorators(
    SetMetadata(ROLE_ACCESS_CONFIG_METADATA, opts),
    UseGuards(JwtAuthGuard, RoleAccessGuard),
  );
}

@Injectable({ scope: Scope.REQUEST })
export class RoleAccessGuard extends BaseAccessGuard<RoleAccessOptions> {
  constructor(moduleRef: ModuleRef, @Inject(Reflector) reflector: Reflector) {
    super(moduleRef, reflector, ROLE_ACCESS_CONFIG_METADATA);
  }

  async hasAccess({
    user,
    options,
  }: AccessContext<RoleAccessOptions>): Promise<boolean> {
    if (!options) {
      return true;
    }

    if (!options.accesses) {
      return true;
    }

    const accesses = isArray(options.accesses)
      ? options.accesses
      : [options.accesses];

    const userRoles = (await this.moduleRef
      .get(UserRolesRepository, { strict: false })
      .search(
        { expands: ['role'] },
        { userId: user?.id },
      )) as UserRoleResponse[];

    return hasRequiredAccesses(accesses, userRoles);
  }
}

function hasRequiredAccesses(
  requiredAccesses: RoleAccess[],
  userRoles: UserRoleResponse[],
): boolean {
  return every(requiredAccesses, (access) =>
    some(
      userRoles,
      (userRole) => userRole.role && includes(userRole.role.accesses, access),
    ),
  );
}
