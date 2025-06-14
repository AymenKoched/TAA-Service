import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import {
  ConvertResponse,
  OrganizationExtrasResponse,
  OrganizationGeneralResponse,
  OrganizationHumanResourcesResponse,
  OrganizationOpportunitiesResponse,
  OrganizationOthersResponse,
  OrganizationProductsResponse,
  OrganizationRequest,
  OrganizationResponse,
  OrganizationRevenuesResponse,
  RoleAccess,
  UpdateOrganizationExtrasRequest,
  UpdateOrganizationGeneralRequest,
  UpdateOrganizationHumanResourcesRequest,
  UpdateOrganizationOpportunitiesRequest,
  UpdateOrganizationOthersRequest,
  UpdateOrganizationProductsRequest,
  UpdateOrganizationRevenuesRequest,
} from '../common';
import { HasOrganizationAccess, HasRoleAccess } from '../guards';
import { OrganizationsService } from '../services';

@Controller({ path: 'organizations' })
export class OrganizationsController {
  constructor(private readonly orgs: OrganizationsService) {}

  @Get(':organizationId/general')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationGeneralResponse)
  public async getOrganizationGeneral(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationGeneralResponse> {
    return this.orgs.getOrganizationGeneralById(organizationId);
  }

  @Get(':organizationId/products')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationProductsResponse)
  public async getOrganizationProducts(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationProductsResponse> {
    return this.orgs.getOrganizationProductsById(organizationId);
  }

  @Get(':organizationId/human-resources')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationHumanResourcesResponse)
  public async getOrganizationHumanResources(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationHumanResourcesResponse> {
    return this.orgs.getOrganizationHumanResourcesById(organizationId);
  }

  @Get(':organizationId/revenues')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationRevenuesResponse)
  public async getOrganizationRevenues(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationRevenuesResponse> {
    return this.orgs.getOrganizationRevenuesById(organizationId);
  }

  @Get(':organizationId/extras')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationExtrasResponse)
  public async getOrganizationExtras(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationExtrasResponse> {
    return this.orgs.getOrganizationExtrasById(organizationId);
  }

  @Get(':organizationId/others')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationOthersResponse)
  public async getOrganizationOthers(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationOthersResponse> {
    return this.orgs.getOrganizationOthersById(organizationId);
  }

  @Get(':organizationId/opportunities')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.ViewOrg })
  @ConvertResponse(OrganizationOpportunitiesResponse)
  public async getOrganizationOpportunities(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationOpportunitiesResponse> {
    return this.orgs.getOrganizationOpportunitiesById(organizationId);
  }

  @Post()
  @ConvertResponse(OrganizationResponse)
  public async createOrganization(
    @Body() payload: OrganizationRequest,
  ): Promise<OrganizationResponse> {
    return this.orgs.createOrganization(payload);
  }

  @Put(':organizationId/general')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationGeneralResponse)
  public async updateOrganizationGeneral(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationGeneralRequest,
  ): Promise<OrganizationGeneralResponse> {
    return this.orgs.updateOrganizationGeneral(organizationId, payload);
  }

  @Put(':organizationId/products')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationProductsResponse)
  public async updateOrganizationProducts(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationProductsRequest,
  ): Promise<OrganizationProductsResponse> {
    return this.orgs.updateOrganizationProducts(organizationId, payload);
  }

  @Put(':organizationId/human-resources')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationHumanResourcesResponse)
  public async updateOrganizationHumanResources(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationHumanResourcesRequest,
  ): Promise<OrganizationHumanResourcesResponse> {
    return this.orgs.updateOrganizationHumanResources(organizationId, payload);
  }

  @Put(':organizationId/revenues')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationRevenuesResponse)
  public async updateOrganizationRevenues(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationRevenuesRequest,
  ): Promise<OrganizationRevenuesResponse> {
    return this.orgs.updateOrganizationRevenues(organizationId, payload);
  }

  @Put(':organizationId/extras')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationExtrasResponse)
  public async updateOrganizationExtras(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationExtrasRequest,
  ): Promise<OrganizationExtrasResponse> {
    return this.orgs.updateOrganizationExtras(organizationId, payload);
  }

  @Put(':organizationId/others')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationOthersResponse)
  public async updateOrganizationOthers(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationOthersRequest,
  ): Promise<OrganizationOthersResponse> {
    return this.orgs.updateOrganizationOthers(organizationId, payload);
  }

  @Put(':organizationId/opportunities')
  @HasOrganizationAccess()
  @HasRoleAccess({ accesses: RoleAccess.UpdateOrg })
  @ConvertResponse(OrganizationOpportunitiesResponse)
  public async updateOrganizationOpportunities(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationOpportunitiesRequest,
  ): Promise<OrganizationOpportunitiesResponse> {
    return this.orgs.updateOrganizationOpportunities(organizationId, payload);
  }
}
