import {
  applyDecorators,
  Inject,
  Injectable,
  Scope,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { AdherentResponse } from '../common';
import { AdherentsService, OrganizationsService } from '../services';
import { JwtAuthGuard } from './auth.guard';
import {
  AccessContext,
  BaseAccessGuard,
  BaseAccessOptions,
} from './base-access.guard';

export type OrganizationAccessOptions = BaseAccessOptions & {
  update?: boolean;
};

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
    private readonly adherents: AdherentsService,
  ) {
    super(moduleRef, reflector, ORG_ACCESS_CONFIG_METADATA);
  }

  async hasAccess({
    selectorValue,
    user,
    organization,
    options,
  }: AccessContext<OrganizationAccessOptions>): Promise<boolean> {
    if (!organization) return false;

    const selectedOrg = await this.orgs.getById(selectorValue, {
      silent: true,
    });
    if (!selectedOrg) return false;

    if (options?.update) {
      if (
        selectedOrg.id !== organization.id ||
        selectedOrg.adherentId !== user.id
      ) {
        return false;
      }

      const adh = await this.adherents.findOne(
        { organizationId: selectedOrg.id },
        { silent: true },
      );
      if (!adh) return false;

      const adherent = new AdherentResponse(adh);
      return adherent.isWithinModificationWindow;
    }

    return (
      selectedOrg.id === organization.id || selectedOrg.adherentId === user.id
    );
  }
}
