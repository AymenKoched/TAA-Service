import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import {
  ConvertResponse,
  OrganizationGeneralResponse,
  OrganizationHumanResourcesResponse,
  OrganizationProductsResponse,
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
  @ConvertResponse(OrganizationGeneralResponse)
  public async getOrganizationGeneral(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationGeneralResponse> {
    return this.orgs.getOrganizationGeneralById(organizationId);
  }

  @Get(':organizationId/products')
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationProductsResponse)
  public async getOrganizationProducts(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationProductsResponse> {
    return this.orgs.getOrganizationProductsById(organizationId);
  }

  @Get(':organizationId/human-resources')
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationHumanResourcesResponse)
  public async getOrganizationHumanResources(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationHumanResourcesResponse> {
    return this.orgs.getOrganizationHumanResourcesById(organizationId);
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
  @ConvertResponse(OrganizationGeneralResponse)
  public async updateOrganizationGeneral(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationRequest,
  ): Promise<OrganizationGeneralResponse> {
    return this.orgs.updateOrganizationGeneral(organizationId, payload);
  }

  @Put(':organizationId/products')
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationProductsResponse)
  public async updateOrganizationProducts(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationRequest,
  ): Promise<OrganizationProductsResponse> {
    return this.orgs.updateOrganizationProducts(organizationId, payload);
  }

  @Put(':organizationId/human-resources')
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationHumanResourcesResponse)
  public async updateOrganizationHumanResources(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationRequest,
  ): Promise<OrganizationHumanResourcesResponse> {
    return this.orgs.updateOrganizationHumanResources(organizationId, payload);
  }
}
