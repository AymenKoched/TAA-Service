import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import {
  ConvertResponse,
  OrganizationGeneralResponse,
  OrganizationHumanResourcesResponse,
  OrganizationProductsResponse,
  OrganizationRequest,
  OrganizationResponse,
  OrganizationRevenuesResponse,
  RoleAccess,
  UpdateOrganizationGeneralRequest,
  UpdateOrganizationHumanResourcesRequest,
  UpdateOrganizationProductsRequest,
  UpdateOrganizationRevenuesRequest,
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

  @Get(':organizationId/revenues')
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationRevenuesResponse)
  public async getOrganizationRevenues(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationRevenuesResponse> {
    return this.orgs.getOrganizationRevenuesById(organizationId);
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
    @Body() payload: UpdateOrganizationGeneralRequest,
  ): Promise<OrganizationGeneralResponse> {
    return this.orgs.updateOrganizationGeneral(organizationId, payload);
  }

  @Put(':organizationId/products')
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationProductsResponse)
  public async updateOrganizationProducts(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationProductsRequest,
  ): Promise<OrganizationProductsResponse> {
    return this.orgs.updateOrganizationProducts(organizationId, payload);
  }

  @Put(':organizationId/human-resources')
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationHumanResourcesResponse)
  public async updateOrganizationHumanResources(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationHumanResourcesRequest,
  ): Promise<OrganizationHumanResourcesResponse> {
    return this.orgs.updateOrganizationHumanResources(organizationId, payload);
  }

  @Put(':organizationId/revenues')
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationRevenuesResponse)
  public async updateOrganizationRevenues(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationRevenuesRequest,
  ): Promise<OrganizationRevenuesResponse> {
    return this.orgs.updateOrganizationRevenues(organizationId, payload);
  }
}
