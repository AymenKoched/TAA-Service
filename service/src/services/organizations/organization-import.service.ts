import { Injectable } from '@nestjs/common';
import { Row, Workbook } from 'exceljs';
import { map } from 'lodash';
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
    const orgItems = this.parseSheet<OrganizationRequest & { orgIid: number }>(
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

    console.log({ orgItems });

    const generalItems = this.parseSheet<
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

    console.log({ generalItems });

    const productsItems = this.parseSheet<
      UpdateOrganizationProductsRequest & { orgIid: number }
    >(workbook, 2, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      primaryActivities: this.parseStringArray(this.getCellValue(row, 2)),
      secondaryActivities: this.parseStringArray(this.getCellValue(row, 3)),
    }));

    console.log({ productsItems });

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

    console.log({ hrItems });

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

    console.log({ revenuesItems });

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

    console.log({ extrasItems });

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

    console.log({ othersItems });

    const opportunitiesItems = this.parseSheet<
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

    console.log({ opportunitiesItems });

    const products = this.parseSheet<
      ProductRequest & { orgIid: number; type: ProductType }
    >(workbook, 8, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      name: this.getCellValue(row, 2),
      description: this.getCellValue(row, 3),
      ngp: this.getCellValue(row, 4),
      type: this.mapToEnum(this.getCellValue(row, 5), ProductType),
    }));

    console.log({ products });

    const sites = this.parseSheet<
      OrganizationSiteRequest & { orgIid: number; type: OrganizationSiteType }
    >(workbook, 9, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      name: this.getCellValue(row, 2),
      capacity: Number(this.getCellValue(row, 3)) || undefined,
      type: this.mapToEnum(this.getCellValue(row, 4), OrganizationSiteType),
    }));

    console.log({ sites });

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

    console.log({ contracts });

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

    console.log({ revenues });

    const turnoverDistribution = this.parseSheet<
      OrganizationTurnoverDistributionRequest & { orgIid: number }
    >(workbook, 12, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      type: this.getCellValue(row, 2),
      count: Number(this.getCellValue(row, 3)),
    }));

    console.log({ turnoverDistribution });

    const clientsDistribution = this.parseSheet<
      OrganizationClientRequest & { orgIid: number }
    >(workbook, 13, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      type: this.getCellValue(row, 2),
      example: this.getCellValue(row, 3),
      country: this.getCellValue(row, 4),
      count: Number(this.getCellValue(row, 5)),
    }));

    console.log({ clientsDistribution });

    const countryParticipation = this.parseSheet<
      CountryParticipationRequest & { orgIid: number }
    >(workbook, 14, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      country: this.getCellValue(row, 2),
      count: Number(this.getCellValue(row, 3)),
    }));

    console.log({ countryParticipation });

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

    console.log({ extrasInformation });

    const rdProjects = this.parseSheet<
      OrganizationRdProjectRequest & { orgIid: number }
    >(workbook, 16, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      name: this.getCellValue(row, 2),
      description: this.getCellValue(row, 3),
      objectif: this.getCellValue(row, 4),
    }));

    console.log({ rdProjects });

    const initiatives = this.parseSheet<
      OrganizationInitiativeRequest & { orgIid: number }
    >(workbook, 17, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      name: this.getCellValue(row, 2),
      impact: this.getCellValue(row, 3),
    }));

    console.log({ initiatives });

    const questions = this.parseSheet<
      OrganizationQuestionRequest & { orgIid: number }
    >(workbook, 18, (row: Row) => ({
      orgIid: Number(this.getCellValue(row, 1)),
      question: this.getCellValue(row, 2),
      response: this.getCellValue(row, 3),
      details: this.getCellValue(row, 4),
    }));

    console.log({ questions });
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
