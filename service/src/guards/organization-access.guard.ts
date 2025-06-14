import {
  applyDecorators,
  Inject,
  Injectable,
  Scope,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { OrganizationsService } from '../services';
import { JwtAuthGuard } from './auth.guard';
import {
  AccessContext,
  BaseAccessGuard,
  BaseAccessOptions,
} from './base-access.guard';

export type OrganizationAccessOptions = BaseAccessOptions;

export const ORG_ACCESS_CONFIG_METADATA = 'org_access_config';

export function HasOrganizationAccess(opts?: OrganizationAccessOptions) {
  return applyDecorators(
    SetMetadata(ORG_ACCESS_CONFIG_METADATA, opts),
    UseGuards(JwtAuthGuard, OrganizationAccessGuard),
  );
}

@Injectable({ scope: Scope.REQUEST })
export class OrganizationAccessGuard extends BaseAccessGuard<OrganizationAccessOptions> {
  protected defaultOptions = {
    selector: 'organizationId',
  };

  constructor(
    moduleRef: ModuleRef,
    @Inject(Reflector) reflector: Reflector,
    private readonly orgs: OrganizationsService,
  ) {
    super(moduleRef, reflector, ORG_ACCESS_CONFIG_METADATA);
  }

  async hasAccess({
    selectorValue,
    user,
    organization,
  }: AccessContext<OrganizationAccessOptions>): Promise<boolean> {
    if (!organization) {
      return false;
    }

    const selectedOrg = await this.orgs.getById(selectorValue);

    if (!selectedOrg) {
      return false;
    }

    if (selectedOrg.id === organization.id) {
      return true;
    }

    if (selectedOrg.adherentId === user.id) {
      return true;
    }

    return false;
  }
}
