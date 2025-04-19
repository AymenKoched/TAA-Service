import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import {
  ConvertResponse,
  OrganizationRequest,
  OrganizationResponse,
  RoleAccess,
  UpdateOrganizationRequest,
} from '../common';
import { HasRoleAccess } from '../guards';
import { OrganizationsService } from '../services';

@Controller({ path: 'organizations' })
export class OrganizationsController {
  constructor(private readonly orgs: OrganizationsService) {}

  @Get(':organizationId/general')
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationResponse)
  public async getOrganizationGeneral(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationResponse> {
    return await this.orgs.getOrganization(organizationId, [
      'tags',
      'adherent.userRoles.role',
    ]);
  }

  @Get(':organizationId/products')
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationResponse)
  public async getOrganizationProducts(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationResponse> {
    return await this.orgs.getOrganization(organizationId, [
      'sites',
      'organizationActivities.activity',
      'products',
    ]);
  }

  @Post()
  @ConvertResponse(OrganizationResponse)
  public async createOrganization(
    @Body() payload: OrganizationRequest,
  ): Promise<OrganizationResponse> {
    return this.orgs.createOrganization(payload);
  }

  @Put(':organizationId/general')
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationResponse)
  public async updateOrganizationGeneral(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationRequest,
  ): Promise<OrganizationResponse> {
    return this.orgs.updateOrganizationGeneral(organizationId, payload);
  }

  @Put(':organizationId/products')
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationResponse)
  public async updateOrganizationProducts(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationRequest,
  ): Promise<OrganizationResponse> {
    return this.orgs.updateOrganizationProducts(organizationId, payload);
  }

  @Put(':organizationId/human-resources')
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationResponse)
  public async updateOrganizationHumanResources(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationRequest,
  ): Promise<OrganizationResponse> {
    return this.orgs.updateOrganizationHumanResources(organizationId, payload);
  }
}
