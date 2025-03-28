import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import {
  ConvertResponse,
  OrganizationRequest,
  OrganizationResponse,
  RoleAccess,
} from '../common';
import { HasRoleAccess } from '../guards';
import { OrganizationsService } from '../services';

@Controller({ path: 'organizations' })
export class OrganizationsController {
  constructor(private readonly orgs: OrganizationsService) {}

  @Get(':organizationId')
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationResponse)
  public async getOrganization(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationResponse> {
    return this.orgs.getOrganization(organizationId);
  }

  @Post()
  @ConvertResponse(OrganizationResponse)
  public async createOrganization(
    @Body() payload: OrganizationRequest,
  ): Promise<OrganizationResponse> {
    return this.orgs.createOrganization(payload);
  }
}
