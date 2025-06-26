import {
  applyDecorators,
  Inject,
  Injectable,
  Scope,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { includes } from 'lodash';

import { UserType } from '../common';
import { JwtAuthGuard } from './auth.guard';
import {
  AccessContext,
  BaseAccessGuard,
  BaseAccessOptions,
} from './base-access.guard';

export type UserTypeAccessOptions = BaseAccessOptions & {
  types?: UserType[];
};

export const USER_TYPE_ACCESS_METADATA = 'user_type_access';

export function HasUserTypeAccess(opts?: UserTypeAccessOptions) {
  return applyDecorators(
    SetMetadata(USER_TYPE_ACCESS_METADATA, opts),
    UseGuards(JwtAuthGuard, UserTypeAccessGuard),
  );
}

@Injectable({ scope: Scope.REQUEST })
export class UserTypeAccessGuard extends BaseAccessGuard<UserTypeAccessOptions> {
  protected defaultOptions = {};

  constructor(moduleRef: ModuleRef, @Inject(Reflector) reflector: Reflector) {
    super(moduleRef, reflector, USER_TYPE_ACCESS_METADATA);
  }

  async hasAccess({
    user,
    options,
  }: AccessContext<UserTypeAccessOptions>): Promise<boolean> {
    if (!options?.types || options.types.length === 0) {
      return false;
    }

    return includes(options.types, user.userType);
  }
}
