import { Injectable } from '@nestjs/common';
import { Row, Workbook } from 'exceljs';
import { filter, find, groupBy, map, omit } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AttributeRequest,
  CountryParticipationRequest,
  OrganizationAgeKpiRequest,
  OrganizationAttributeType,
  OrganizationClientRequest,
  OrganizationContractRequest,
  OrganizationContractType,
  OrganizationEmployeeKpiRequest,
  OrganizationEnvironmentRequest,
  OrganizationFormationRequest,
  OrganizationInitiativeRequest,
  OrganizationOpportunityCategory,
  OrganizationOpportunityPriority,
  OrganizationOpportunityRequest,
  OrganizationQuestionRequest,
  OrganizationRdProjectRequest,
  OrganizationRequest,
  OrganizationResearchDevelopmentRequest,
  OrganizationRevenueKpiRequest,
  OrganizationSiteRequest,
  OrganizationSiteType,
  OrganizationTurnoverDistributionRequest,
  OrganizationTurnoverRequest,
  OrganizationWasteDistributionRequest,
  ProductRequest,
  ProductType,
  TagRequest,
  UpdateOrganizationExtrasRequest,
  UpdateOrganizationGeneralRequest,
  UpdateOrganizationHumanResourcesRequest,
  UpdateOrganizationOpportunitiesRequest,
  UpdateOrganizationOthersRequest,
  UpdateOrganizationProductsRequest,
  UpdateOrganizationRevenuesRequest,
} from '../../common';
import { OrganizationsService } from './organizations.service';

@Injectable()
export class OrganizationImportService {
  constructor(private readonly orgs: OrganizationsService) {}

  @Transactional({ propagation: Propagation.REQUIRED })
  async importOrganizations(workbook: Workbook): Promise<void> {
    const basicItems = this.getBasicItems(workbook);
    const generalItems = this.getGeneralItems(workbook);
    const productsItems = this.getProductsItems(workbook, basicItems.length);
    const hrItems = this.getHumanResourcesItems(workbook, basicItems.length);
    const revenuesItems = this.getRevenuesItems(workbook, basicItems.length);
    const extrasItems = this.getExtrasItems(workbook, basicItems.length);
    const othersItems = this.getOthersItems(workbook, basicItems.length);
    const opportunitiesItems = this.getOpportunitiesItems(
      workbook,
      basicItems.length,
    );

    await Promise.all(
      map(basicItems, async (basic) => {
        const org = await this.orgs.createOrganization(
          omit(basic, 'orgIid') as OrganizationRequest,
        );
        const orgId = org.id;

        const generalMatch = find(generalItems, { orgIid: basic.orgIid });
        if (generalMatch) {
          const payload = omit(generalMatch, 'orgIid');
          await this.orgs.updateOrganizationGeneral(
            orgId,
            payload as UpdateOrganizationGeneralRequest,
          );
        }

        const productsMatch = find(productsItems, { orgIid: basic.orgIid });
        if (productsMatch) {
          const payload = omit(productsMatch, 'orgIid');
          await this.orgs.updateOrganizationProducts(
            orgId,
            payload as UpdateOrganizationProductsRequest,
          );
        }

        const hrMatch = find(hrItems, { orgIid: basic.orgIid });
        if (hrMatch) {
          const payload = omit(hrMatch, 'orgIid');
          await this.orgs.updateOrganizationHumanResources(
            orgId,
            payload as UpdateOrganizationHumanResourcesRequest,
          );
        }

        const revMatch = find(revenuesItems, { orgIid: basic.orgIid });
        if (revMatch) {
          const payload = omit(revMatch, 'orgIid');
          await this.orgs.updateOrganizationRevenues(
            orgId,
            payload as UpdateOrganizationRevenuesRequest,
          );
        }

        const extrasMatch = find(extrasItems, { orgIid: basic.orgIid });
        if (extrasMatch) {
          const payload = omit(extrasMatch, 'orgIid');
          await this.orgs.updateOrganizationExtras(
            orgId,
            payload as UpdateOrganizationExtrasRequest,
          );
        }

        const othersMatch = find(othersItems, { orgIid: basic.orgIid });
        if (othersMatch) {
          const payload = omit(othersMatch, 'orgIid');
          await this.orgs.updateOrganizationOthers(
            orgId,
            payload as UpdateOrganizationOthersRequest,
          );
        }

        const oppMatch = find(opportunitiesItems, { orgIid: basic.orgIid });
        if (oppMatch) {
          const payload = omit(oppMatch, 'orgIid');
          await this.orgs.updateOrganizationOpportunities(
            orgId,
            payload as UpdateOrganizationOpportunitiesRequest,
          );
        }
      }),
    );
  }

  private getBasicItems(
    workbook: Workbook,
  ): (OrganizationRequest & { orgIid: number })[] {
    return this.parseSheet<OrganizationRequest & { orgIid: number }>(
      workbook,
      0,
      (row: Row) => ({
        orgIid: Number(this.getCellValue(row, 1)),
        name: this.getCellValue(row, 2),
        email: this.getCellValue(row, 3),
        taxNumber: this.getCellValue(row, 4),
        address: this.getCellValue(row, 5),
        description: this.getCellValue(row, 6),
      }),
    );
  }

  private getGeneralItems(
    workbook: Workbook,
  ): (UpdateOrganizationGeneralRequest & { orgIid: number })[] {
    return this.parseSheet<
      UpdateOrganizationGeneralRequest & { orgIid: number }
    >(workbook, 1, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      fullName: this.getCellValue(row, 2),
      legalStatus: this.getCellValue(row, 3),
      foundingYear: Number(this.getCellValue(row, 4)) || undefined,
      groupAffiliation: this.getCellValue(row, 5),
      headOffice: this.getCellValue(row, 6),
      postalCode: this.getCellValue(row, 7),
      city: this.getCellValue(row, 8),
      country: this.getCellValue(row, 9),
      linkedin: this.getCellValue(row, 10),
      facebook: this.getCellValue(row, 11),
      twitter: this.getCellValue(row, 12),
      websiteUrl: this.getCellValue(row, 13),
      phone: this.getCellValue(row, 14)
        ? `+${this.getCellValue(row, 14)}`
        : undefined,
      rAndDSites: this.parseTags(this.getCellValue(row, 15)),
      otherLocations: this.parseTags(this.getCellValue(row, 16)),
    }));
  }

  private getProductsItems(
    workbook: Workbook,
    nbOrgs: number,
  ): (UpdateOrganizationProductsRequest & { orgIid: number })[] {
    const productsItems = this.parseSheet<
      UpdateOrganizationProductsRequest & { orgIid: number }
    >(workbook, 2, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      primaryActivities: this.parseStringArray(this.getCellValue(row, 2)),
      secondaryActivities: this.parseStringArray(this.getCellValue(row, 3)),
    }));

    const products = this.parseSheet<
      ProductRequest & { orgIid: number; type: ProductType }
    >(workbook, 8, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      name: this.getCellValue(row, 2),
      description: this.getCellValue(row, 3),
      ngp: this.getCellValue(row, 4),
      type: this.mapToEnum(this.getCellValue(row, 5), ProductType),
    }));

    const sites = this.parseSheet<
      OrganizationSiteRequest & { orgIid: number; type: OrganizationSiteType }
    >(workbook, 9, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      name: this.getCellValue(row, 2),
      capacity: Number(this.getCellValue(row, 3)) || undefined,
      type: this.mapToEnum(this.getCellValue(row, 4), OrganizationSiteType),
    }));

    const productsItemsByOrg = groupBy(productsItems, 'orgIid');
    const productsByOrg = groupBy(products, 'orgIid');
    const sitesByOrg = groupBy(sites, 'orgIid');

    return Array.from({ length: nbOrgs }, (_, i) => {
      const orgId = i + 1;
      const item = productsItemsByOrg[orgId]?.[0];

      return {
        orgIid: orgId,
        primaryActivities: item?.primaryActivities,
        secondaryActivities: item?.secondaryActivities,
        products: map(
          filter(productsByOrg[orgId] || [], (p) => p.type === ProductType.Old),
          (p) =>
            new ProductRequest({
              name: p.name,
              description: p.description,
              ngp: p.ngp,
            }),
        ),
        localSites: map(
          filter(
            sitesByOrg[orgId] || [],
            (s) => s.type === OrganizationSiteType.LocalSite,
          ),
          (s) =>
            new OrganizationSiteRequest({ name: s.name, capacity: s.capacity }),
        ),
        foreignImplantationSites: map(
          filter(
            sitesByOrg[orgId] || [],
            (s) => s.type === OrganizationSiteType.ForeignImplantationSite,
          ),
          (s) =>
            new OrganizationSiteRequest({ name: s.name, capacity: s.capacity }),
        ),
        foreignExportationSites: map(
          filter(
            sitesByOrg[orgId] || [],
            (s) => s.type === OrganizationSiteType.ForeignExportationSite,
          ),
          (s) =>
            new OrganizationSiteRequest({ name: s.name, capacity: s.capacity }),
        ),
      };
    });
  }

  private getHumanResourcesItems(
    workbook: Workbook,
    nbOrgs: number,
  ): (UpdateOrganizationHumanResourcesRequest & { orgIid: number })[] {
    const hrItems = this.parseSheet<
      UpdateOrganizationHumanResourcesRequest & { orgIid: number }
    >(workbook, 3, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      directEmployees: new OrganizationEmployeeKpiRequest({
        men: Number(this.getCellValue(row, 2)) || undefined,
        women: Number(this.getCellValue(row, 3)) || undefined,
      }),
      indirectEmployees: new OrganizationEmployeeKpiRequest({
        men: Number(this.getCellValue(row, 4)) || undefined,
        women: Number(this.getCellValue(row, 5)) || undefined,
      }),
      ageKpis: new OrganizationAgeKpiRequest({
        count18_24: Number(this.getCellValue(row, 6)) || undefined,
        count25_30: Number(this.getCellValue(row, 7)) || undefined,
        count31_36: Number(this.getCellValue(row, 8)) || undefined,
        count37Plus: Number(this.getCellValue(row, 9)) || undefined,
      }),
      formationKpi: new OrganizationFormationRequest({
        menHours: Number(this.getCellValue(row, 10)) || undefined,
        womenHours: Number(this.getCellValue(row, 11)) || undefined,
        mainFormation: this.getCellValue(row, 12),
        location: this.getCellValue(row, 13),
        type: this.getCellValue(row, 14),
        employeesTrained: this.getCellValue(row, 15),
        revenueInvestment: this.getCellValue(row, 16),
      }),
    }));

    const contracts = this.parseSheet<
      OrganizationContractRequest & { orgIid: number }
    >(workbook, 10, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      type: this.mapToEnum(this.getCellValue(row, 2), OrganizationContractType),
      men: Number(this.getCellValue(row, 3)) || undefined,
      women: Number(this.getCellValue(row, 4)) || undefined,
      get _validateTotal(): boolean {
        return true;
      },
    }));

    const revenues = this.parseSheet<
      OrganizationRevenueKpiRequest & { orgIid: number }
    >(workbook, 11, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      type: this.getCellValue(row, 2),
      men: Number(this.getCellValue(row, 3)) || undefined,
      women: Number(this.getCellValue(row, 4)) || undefined,
      get _validateTotal(): boolean {
        return true;
      },
    }));

    const hrItemsByOrg = groupBy(hrItems, 'orgIid');
    const contractsByOrg = groupBy(contracts, 'orgIid');
    const revenuesByOrg = groupBy(revenues, 'orgIid');

    return Array.from({ length: nbOrgs }, (_, i) => {
      const orgId = i + 1;
      const item = hrItemsByOrg[orgId]?.[0];

      return {
        orgIid: orgId,
        directEmployees: item?.directEmployees,
        indirectEmployees: item?.indirectEmployees,
        ageKpis: item?.ageKpis,
        formationKpi: item?.formationKpi,
        contracts: map(
          contractsByOrg[orgId] || [],
          (c) =>
            new OrganizationContractRequest({
              type: c.type,
              men: c.men,
              women: c.women,
            }),
        ),
        revenues: map(
          revenuesByOrg[orgId] || [],
          (r) =>
            new OrganizationRevenueKpiRequest({
              type: r.type,
              men: r.men,
              women: r.women,
            }),
        ),
      };
    });
  }

  private getRevenuesItems(
    workbook: Workbook,
    nbOrgs: number,
  ): (UpdateOrganizationRevenuesRequest & { orgIid: number })[] {
    const revenuesItems = this.parseSheet<
      UpdateOrganizationRevenuesRequest & { orgIid: number }
    >(workbook, 4, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      turnover: new OrganizationTurnoverRequest({
        revenue2024: Number(this.getCellValue(row, 2)) || undefined,
        hasGrowthComparedTo2023: ['true', 'yes', '1'].includes(
          this.getCellValue(row, 3).toLowerCase(),
        ),
        growthRate: Number(this.getCellValue(row, 4)) || undefined,
        rAndDInvestment2023: Number(this.getCellValue(row, 5)) || undefined,
        grantsReceived: Number(this.getCellValue(row, 6)) || undefined,
        productionVolume: Number(this.getCellValue(row, 7)) || undefined,
      }),
    }));

    const turnoverDistribution = this.parseSheet<
      OrganizationTurnoverDistributionRequest & { orgIid: number }
    >(workbook, 12, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      type: this.getCellValue(row, 2),
      count: Number(this.getCellValue(row, 3)),
    }));

    const clientsDistribution = this.parseSheet<
      OrganizationClientRequest & { orgIid: number }
    >(workbook, 13, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      type: this.getCellValue(row, 2),
      example: this.getCellValue(row, 3),
      country: this.getCellValue(row, 4),
      count: Number(this.getCellValue(row, 5)),
    }));

    const countryParticipation = this.parseSheet<
      CountryParticipationRequest & { orgIid: number }
    >(workbook, 14, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      country: this.getCellValue(row, 2),
      count: Number(this.getCellValue(row, 3)),
    }));

    const revenuesItemsByOrg = groupBy(revenuesItems, 'orgIid');
    const turnoverDistributionByOrg = groupBy(turnoverDistribution, 'orgIid');
    const clientsDistributionByOrg = groupBy(clientsDistribution, 'orgIid');
    const countryParticipationByOrg = groupBy(countryParticipation, 'orgIid');

    return Array.from({ length: nbOrgs }, (_, i) => {
      const orgId = i + 1;
      const item = revenuesItemsByOrg[orgId]?.[0];

      return {
        orgIid: orgId,
        turnoverDistribution: map(
          turnoverDistributionByOrg[orgId] || [],
          (t) =>
            new OrganizationTurnoverDistributionRequest({
              type: t.type,
              count: t.count,
            }),
        ),
        clientsTypes: map(
          clientsDistributionByOrg[orgId] || [],
          (c) =>
            new OrganizationClientRequest({
              type: c.type,
              count: c.count,
              example: c.example,
              country: c.country,
            }),
        ),
        turnover: item?.turnover,
        countriesParticipation: map(
          countryParticipationByOrg[orgId] || [],
          (c) =>
            new CountryParticipationRequest({
              country: c.country,
              count: c.count,
            }),
        ),
      };
    });
  }

  private getExtrasItems(
    workbook: Workbook,
    nbOrgs: number,
  ): (UpdateOrganizationExtrasRequest & { orgIid: number })[] {
    const extrasItems = this.parseSheet<
      UpdateOrganizationExtrasRequest & { orgIid: number }
    >(workbook, 5, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      researchDevelopment: new OrganizationResearchDevelopmentRequest({
        budget2024: Number(this.getCellValue(row, 2)) || undefined,
        patentsCount: Number(this.getCellValue(row, 3)) || undefined,
        revenuePercentage: Number(this.getCellValue(row, 4)) || undefined,
        universityPartnerships: ['true', 'yes', '1'].includes(
          this.getCellValue(row, 5).toLowerCase(),
        ),
        projectsInProgress: Number(this.getCellValue(row, 6)) || undefined,
      }),
      certifications: this.parseTags(this.getCellValue(row, 7)),
    }));

    const products = this.parseSheet<
      ProductRequest & { orgIid: number; type: ProductType }
    >(workbook, 8, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      name: this.getCellValue(row, 2),
      description: this.getCellValue(row, 3),
      ngp: this.getCellValue(row, 4),
      type: this.mapToEnum(this.getCellValue(row, 5), ProductType),
    }));

    const extrasInformation = this.parseSheet<
      AttributeRequest & { orgIid: number; type: OrganizationAttributeType }
    >(workbook, 15, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      name: this.getCellValue(row, 2),
      value: this.getCellValue(row, 3),
      type: this.mapToEnum(
        this.getCellValue(row, 4),
        OrganizationAttributeType,
      ),
    }));

    const rdProjects = this.parseSheet<
      OrganizationRdProjectRequest & { orgIid: number }
    >(workbook, 16, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      name: this.getCellValue(row, 2),
      description: this.getCellValue(row, 3),
      objectif: this.getCellValue(row, 4),
    }));

    const initiatives = this.parseSheet<
      OrganizationInitiativeRequest & { orgIid: number }
    >(workbook, 17, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      name: this.getCellValue(row, 2),
      impact: this.getCellValue(row, 3),
    }));

    const extrasItemsByOrg = groupBy(extrasItems, 'orgIid');
    const productsByOrg = groupBy(products, 'orgIid');
    const extrasInformationByOrg = groupBy(extrasInformation, 'orgIid');
    const rdProjectsByOrg = groupBy(rdProjects, 'orgIid');
    const initiativesByOrg = groupBy(initiatives, 'orgIid');

    return Array.from({ length: nbOrgs }, (_, i) => {
      const orgId = i + 1;
      const item = extrasItemsByOrg[orgId]?.[0];

      return {
        orgIid: orgId,
        products: map(
          filter(productsByOrg[orgId] || [], (p) => p.type === ProductType.New),
          (p) =>
            new ProductRequest({
              name: p.name,
              description: p.description,
              ngp: p.ngp,
            }),
        ),
        investments: map(
          filter(
            extrasInformationByOrg[orgId] || [],
            (a) => a.type === OrganizationAttributeType.Investment,
          ),
          (a) =>
            new AttributeRequest({
              name: a.name,
              value: a.value,
            }),
        ),
        esgs: map(
          filter(
            extrasInformationByOrg[orgId] || [],
            (a) => a.type === OrganizationAttributeType.ESG,
          ),
          (a) =>
            new AttributeRequest({
              name: a.name,
              value: a.value,
            }),
        ),
        partnerships: map(
          filter(
            extrasInformationByOrg[orgId] || [],
            (a) => a.type === OrganizationAttributeType.Partnerships,
          ),
          (a) =>
            new AttributeRequest({
              name: a.name,
              value: a.value,
            }),
        ),
        technologies: map(
          filter(
            extrasInformationByOrg[orgId] || [],
            (a) => a.type === OrganizationAttributeType.Technologies,
          ),
          (a) =>
            new AttributeRequest({
              name: a.name,
              value: a.value,
            }),
        ),
        researchDevelopment: item?.researchDevelopment,
        certifications: item?.certifications,
        rAndDProjects: map(
          rdProjectsByOrg[orgId] || [],
          (r) =>
            new OrganizationRdProjectRequest({
              name: r.name,
              description: r.description,
              objectif: r.objectif,
            }),
        ),
        initiatives: map(
          initiativesByOrg[orgId] || [],
          (ini) =>
            new OrganizationInitiativeRequest({
              name: ini.name,
              impact: ini.impact,
            }),
        ),
      };
    });
  }

  private getOthersItems(
    workbook: Workbook,
    nbOrgs: number,
  ): (UpdateOrganizationOthersRequest & { orgIid: number })[] {
    const othersItems = this.parseSheet<
      UpdateOrganizationOthersRequest & { orgIid: number }
    >(workbook, 6, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      environment: new OrganizationEnvironmentRequest({
        electricity: this.getCellValue(row, 2),
        electricityConsumption: this.getCellValue(row, 3),
        hasWaterPlant: ['true', 'yes', '1'].includes(
          this.getCellValue(row, 4).toLowerCase(),
        ),
        waterConsumption: this.getCellValue(row, 5),
        recyclablePercentage: this.getCellValue(row, 6),
        ecoDesigned: ['true', 'yes', '1'].includes(
          this.getCellValue(row, 7).toLowerCase(),
        ),
        internalRevaluation: ['true', 'yes', '1'].includes(
          this.getCellValue(row, 8).toLowerCase(),
        ),
        localRecoveryRate: this.getCellValue(row, 9),
        exportRate: this.getCellValue(row, 10),
        productionIntegrationRate: this.getCellValue(row, 11),
        hasDevelopProducts: ['true', 'yes', '1'].includes(
          this.getCellValue(row, 12).toLowerCase(),
        ),
        hasDevelopProcesses: ['true', 'yes', '1'].includes(
          this.getCellValue(row, 13).toLowerCase(),
        ),
        hasDevelopMarkets: ['true', 'yes', '1'].includes(
          this.getCellValue(row, 14).toLowerCase(),
        ),
        hasOpenInnovation: ['true', 'yes', '1'].includes(
          this.getCellValue(row, 15).toLowerCase(),
        ),
        technicalKnowHow: this.getCellValue(row, 16),
      }),
      wasteDistribution: new OrganizationWasteDistributionRequest({
        plastic: Number(this.getCellValue(row, 17)) || undefined,
        metallic: Number(this.getCellValue(row, 18)) || undefined,
        textilesAndLeather: Number(this.getCellValue(row, 19)) || undefined,
        oils: Number(this.getCellValue(row, 20)) || undefined,
        papersAndCardboard: Number(this.getCellValue(row, 21)) || undefined,
        hazardous: Number(this.getCellValue(row, 22)) || undefined,
        others: Number(this.getCellValue(row, 23)) || undefined,
      }),
    }));

    const questions = this.parseSheet<
      OrganizationQuestionRequest & { orgIid: number }
    >(workbook, 18, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      question: this.getCellValue(row, 2),
      response: this.getCellValue(row, 3),
      details: this.getCellValue(row, 4),
    }));

    const othersItemsByOrg = groupBy(othersItems, 'orgIid');
    const questionsByOrg = groupBy(questions, 'orgIid');

    return Array.from({ length: nbOrgs }, (_, i) => {
      const orgId = i + 1;
      const item = othersItemsByOrg[orgId]?.[0];

      return {
        orgIid: orgId,
        environment: item?.environment,
        wasteDistribution: item?.wasteDistribution,
        questions: map(
          questionsByOrg[orgId] || [],
          (q) =>
            new OrganizationQuestionRequest({
              question: q.question,
              response: q.response,
              details: q.details,
            }),
        ),
      };
    });
  }

  private getOpportunitiesItems(
    workbook: Workbook,
    nbOrgs: number,
  ): (UpdateOrganizationOpportunitiesRequest & { orgIid: number })[] {
    const opportunities = this.parseSheet<
      OrganizationOpportunityRequest & { orgIid: number }
    >(workbook, 7, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      category: this.mapToEnum(
        this.getCellValue(row, 2),
        OrganizationOpportunityCategory,
      ),
      description: this.getCellValue(row, 3),
      priority: this.mapToEnum(
        this.getCellValue(row, 4),
        OrganizationOpportunityPriority,
      ),
    }));

    const opportunitiesByOrg = groupBy(opportunities, 'orgIid');

    return Array.from({ length: nbOrgs }, (_, i) => {
      const orgId = i + 1;

      return {
        orgIid: orgId,
        opportunities: map(
          opportunitiesByOrg[orgId] || [],
          (opp) =>
            new OrganizationOpportunityRequest({
              category: opp.category,
              description: opp.description,
              priority: opp.priority,
            }),
        ),
      };
    });
  }

  private getCellValue(row: Row, col: number): string {
    const cell = row.getCell(col);
    const value = cell.value;

    if (value == null) return '';

    if (typeof value === 'object') {
      if ('text' in value) return value.text?.toString().trim() ?? '';
      return JSON.stringify(value);
    }

    return value.toString().trim();
  }

  private parseSheet<T>(
    workbook: Workbook,
    sheetIndex: number,
    parser: (row: Row) => T,
    startRow = 2,
  ): T[] {
    const sheet = workbook.worksheets[sheetIndex];
    if (!sheet) return [];

    const total = sheet.rowCount - (startRow - 1);
    const rows = sheet.getRows(startRow, total) ?? [];
    return map(rows, parser);
  }

  private parseTags(raw: string): TagRequest[] {
    return raw
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => new TagRequest({ name }));
  }

  private parseStringArray(raw: string): string[] {
    return (
      raw
        .split(',')
        .map((name) => name.trim())
        .filter(Boolean) || []
    );
  }

  private mapToEnum<T>(value: string, enumType: Record<string, T>): T {
    const key = Object.keys(enumType).find(
      (k) => enumType[k as keyof typeof enumType] === value || k === value,
    );
    if (!key) throw new Error(`Invalid enum value: ${value}`);
    return enumType[key as keyof typeof enumType];
  }
}
