import {
  applyDecorators,
  Inject,
  Injectable,
  Scope,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { UsersService } from '../services';
import { JwtAuthGuard } from './auth.guard';
import {
  AccessContext,
  BaseAccessGuard,
  BaseAccessOptions,
} from './base-access.guard';

export type UserAccessOptions = BaseAccessOptions;

export const USER_ACCESS_CONFIG_METADATA = 'user_access_config';

export function HasUserAccess(opts?: UserAccessOptions) {
  return applyDecorators(
    SetMetadata(USER_ACCESS_CONFIG_METADATA, opts),
    UseGuards(JwtAuthGuard, UserAccessGuard),
  );
}

@Injectable({ scope: Scope.REQUEST })
export class UserAccessGuard extends BaseAccessGuard<UserAccessOptions> {
  protected defaultOptions = {
    selector: 'userId',
  };

  constructor(
    moduleRef: ModuleRef,
    @Inject(Reflector) reflector: Reflector,
    private readonly users: UsersService,
  ) {
    super(moduleRef, reflector, USER_ACCESS_CONFIG_METADATA);
  }

  async hasAccess({
    selectorValue,
    user,
    options,
  }: AccessContext<UserAccessOptions>): Promise<boolean> {
    const selectedUser = await this.users.getById(selectorValue);

    if (!selectedUser) {
      return false;
    }

    if (selectedUser.id === user.id) {
      return true;
    }
  }
}
