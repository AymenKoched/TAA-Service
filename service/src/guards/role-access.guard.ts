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

import { RoleAccess, RoleResponse } from '../common';
import { JwtAuthGuard } from './auth.guard';
import {
  AccessContext,
  BaseAccessGuard,
  BaseAccessOptions,
} from './base-access.guard';

export type RoleAccessOptions = BaseAccessOptions & {
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
  protected defaultOptions = {};

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

    return hasRequiredAccesses(accesses, user.roles);
  }
}

function hasRequiredAccesses(
  requiredAccesses: RoleAccess[],
  roles: RoleResponse[],
): boolean {
  return every(requiredAccesses, (access) =>
    some(roles, (role) => includes(role.accesses, access)),
  );
}
