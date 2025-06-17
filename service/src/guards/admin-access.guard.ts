import {
  applyDecorators,
  Inject,
  Injectable,
  Scope,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { JwtAuthGuard } from './auth.guard';
import {
  AccessContext,
  BaseAccessGuard,
  BaseAccessOptions,
} from './base-access.guard';

export type AdminAccessOptions = BaseAccessOptions;

export const ADMIN_ACCESS_CONFIG_METADATA = 'admin_access_config';

export function HasAdminAccess(opts?: AdminAccessOptions) {
  return applyDecorators(
    SetMetadata(ADMIN_ACCESS_CONFIG_METADATA, opts),
    UseGuards(JwtAuthGuard, AdminAccessGuard),
  );
}

@Injectable({ scope: Scope.REQUEST })
export class AdminAccessGuard extends BaseAccessGuard<AdminAccessOptions> {
  protected defaultOptions = {};

  constructor(moduleRef: ModuleRef, @Inject(Reflector) reflector: Reflector) {
    super(moduleRef, reflector, ADMIN_ACCESS_CONFIG_METADATA);
  }

  async hasAccess({}: AccessContext<AdminAccessOptions>): Promise<boolean> {
    return false;
  }
}
