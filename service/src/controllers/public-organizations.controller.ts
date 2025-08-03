import { Controller, Get, Param } from '@nestjs/common';

import {
  ConvertResponse,
  OrganizationExtrasResponse,
  OrganizationGeneralResponse,
  OrganizationHumanResourcesResponse,
  OrganizationOpportunitiesResponse,
  OrganizationOthersResponse,
  OrganizationProductsResponse,
  OrganizationRevenuesResponse,
} from '../common';
import { PublicOrganizationService } from '../services';

@Controller({ path: 'public/organizations' })
export class PublicOrganizationsController {
  constructor(private readonly publicOrgs: PublicOrganizationService) {}

  @Get(':organizationId/general')
  @ConvertResponse(OrganizationGeneralResponse)
  public async getOrganizationGeneral(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationGeneralResponse> {
    return this.publicOrgs.getOrganizationGeneralById(organizationId);
  }

  @Get(':organizationId/products')
  @ConvertResponse(OrganizationProductsResponse)
  public async getOrganizationProducts(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationProductsResponse> {
    return this.publicOrgs.getOrganizationProductsById(organizationId);
  }

  @Get(':organizationId/human-resources')
  @ConvertResponse(OrganizationHumanResourcesResponse)
  public async getOrganizationHumanResources(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationHumanResourcesResponse> {
    return this.publicOrgs.getOrganizationHumanResourcesById(organizationId);
  }

  @Get(':organizationId/revenues')
  @ConvertResponse(OrganizationRevenuesResponse)
  public async getOrganizationRevenues(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationRevenuesResponse> {
    return this.publicOrgs.getOrganizationRevenuesById(organizationId);
  }

  @Get(':organizationId/extras')
  @ConvertResponse(OrganizationExtrasResponse)
  public async getOrganizationExtras(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationExtrasResponse> {
    return this.publicOrgs.getOrganizationExtrasById(organizationId);
  }

  @Get(':organizationId/others')
  @ConvertResponse(OrganizationOthersResponse)
  public async getOrganizationOthers(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationOthersResponse> {
    return this.publicOrgs.getOrganizationOthersById(organizationId);
  }

  @Get(':organizationId/opportunities')
  @ConvertResponse(OrganizationOpportunitiesResponse)
  public async getOrganizationOpportunities(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationOpportunitiesResponse> {
    return this.publicOrgs.getOrganizationOpportunitiesById(organizationId);
  }
}
