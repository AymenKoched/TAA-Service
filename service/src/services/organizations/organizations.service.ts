import { BadRequestException, Injectable } from '@nestjs/common';
import { difference, filter, find, map, omit, sumBy } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  ADHERENT_ROLE_NAME,
  AuthErrors,
  CountryParticipationRequest,
  CrudService,
  EmployeesKpiType,
  OrganizationActivityType,
  OrganizationAgeKpiRequest,
  OrganizationClientRequest,
  OrganizationContractRequest,
  OrganizationEmployeeKpiRequest,
  OrganizationFormationRequest,
  OrganizationGeneralResponse,
  OrganizationHumanResourcesResponse,
  OrganizationProductsResponse,
  OrganizationRequest,
  OrganizationResponse,
  OrganizationRevenueKpiRequest,
  OrganizationRevenuesResponse,
  OrganizationSiteRequest,
  OrganizationSiteType,
  OrganizationTagType,
  OrganizationTurnoverDistributionRequest,
  OrganizationTurnoverRequest,
  TagRequest,
  UpdateOrganizationGeneralRequest,
  UpdateOrganizationHumanResourcesRequest,
  UpdateOrganizationProductsRequest,
  UpdateOrganizationRevenuesRequest,
  UserType,
} from '../../common';
import { Organization } from '../../entities';
import { OrganizationsRepository } from '../../repositories';
import { RolesService, UserRolesService } from '../roles';
import { UsersService } from '../users';
import { CountriesParticipationService } from './countries-participation.service';
import { OrganizationActivitiesService } from './organization-activities.service';
import { OrganizationAgesKpisService } from './organization-ages-kpis.service';
import { OrganizationClientsService } from './organization-clients.service';
import { OrganizationContractsService } from './organization-contracts.service';
import { OrganizationEmployeesKpisService } from './organization-employees-kpis.service';
import { OrganizationFormationsService } from './organization-formations.service';
import { OrganizationRevenuesKpisService } from './organization-revenues-kpis.service';
import { OrganizationSitesService } from './organization-sites.service';
import { OrganizationTagsService } from './organization-tags.service';
import { OrganizationTurnoverDistributionsService } from './organization-turnover-distributions.service';
import { OrganizationTurnoversService } from './organization-turnovers.service';
import { ProductsService } from './products.service';

@Injectable()
export class OrganizationsService extends CrudService<Organization> {
  protected notFoundErrorKey = AuthErrors.OrganizationNotFound;
  protected notFoundErrorMessage = 'The searched organization is not found';

  private readonly expandsGeneral: string[] = [
    'tags',
    'adherent.userRoles.role',
  ];
  private readonly expandsProducts: string[] = [
    'sites',
    'organizationActivities.activity',
    'products',
  ];
  private readonly expandsHumanResources: string[] = [
    'employeesKpis',
    'contracts',
    'revenueKpis',
    'ageKpis',
    'formationKpi',
  ];
  private readonly expandsRevenues: string[] = [
    'turnoverDistribution',
    'clientsTypes',
    'turnover',
    'countriesParticipation',
  ];

  constructor(
    private readonly orgs: OrganizationsRepository,
    private readonly products: ProductsService,
    private readonly tags: OrganizationTagsService,
    private readonly organizationActivities: OrganizationActivitiesService,
    private readonly organizationSites: OrganizationSitesService,
    private readonly users: UsersService,
    private readonly roles: RolesService,
    private readonly userRoles: UserRolesService,
    private readonly employeesKpi: OrganizationEmployeesKpisService,
    private readonly contracts: OrganizationContractsService,
    private readonly revenues: OrganizationRevenuesKpisService,
    private readonly agesKpis: OrganizationAgesKpisService,
    private readonly formations: OrganizationFormationsService,
    private readonly turnoverDistribution: OrganizationTurnoverDistributionsService,
    private readonly clients: OrganizationClientsService,
    private readonly turnovers: OrganizationTurnoversService,
    private readonly countries: CountriesParticipationService,
  ) {
    super(orgs);
  }

  async getOrganization(organizationId: string, expands?: string[]) {
    return this.getById(organizationId, {
      search: { expands: expands || [] },
    });
  }

  async getOrganizationGeneralById(organizationId: string) {
    const organization = await this.getOrganization(
      organizationId,
      this.expandsGeneral,
    );
    return new OrganizationGeneralResponse(organization);
  }

  async getOrganizationProductsById(organizationId: string) {
    const organization = await this.getOrganization(
      organizationId,
      this.expandsProducts,
    );
    return new OrganizationProductsResponse(organization);
  }

  async getOrganizationHumanResourcesById(organizationId: string) {
    const organization = await this.getOrganization(
      organizationId,
      this.expandsHumanResources,
    );
    return new OrganizationHumanResourcesResponse(organization);
  }

  async getOrganizationRevenuesById(organizationId: string) {
    const organization = await this.getOrganization(
      organizationId,
      this.expandsRevenues,
    );
    return new OrganizationRevenuesResponse(organization);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async createOrganization(payload: OrganizationRequest) {
    await this.checkEmail(payload.email);
    await this.checkPhone(payload.phone);

    const org = await this.create(omit(payload, 'rAndDSites'));

    const createTags = async (
      tags: TagRequest[],
      type: OrganizationTagType,
    ) => {
      await this.tags.create(
        map(tags, (tag) => ({
          name: tag.name,
          type,
          organizationId: org.id,
        })),
      );
    };

    if (payload?.rAndDSites?.length) {
      await createTags(payload.rAndDSites, OrganizationTagType.RAndD);
    }

    const adherent = await this.users.createUser({
      name: org.email.split('@')[0],
      email: org.email,
      type: UserType.Adherent,
      organizationId: org.id,
    });

    const adherentRole = await this.roles.findOne(
      { name: ADHERENT_ROLE_NAME },
      { silent: true },
    );

    await this.userRoles.create({
      userId: adherent.id,
      roleId: adherentRole.id,
    });

    await this.updateById(org.id, { adherentId: adherent.id });

    return new OrganizationResponse(org);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateOrganizationGeneral(
    organizationId: string,
    payload: UpdateOrganizationGeneralRequest,
  ) {
    await this.checkPhone(payload.phone, organizationId);

    const organization = await this.getById(organizationId, {
      search: {
        expands: this.expandsGeneral,
      },
    });

    await this.updateById(
      organizationId,
      omit(payload, ['rAndDSites', 'otherLocations']),
    );

    const updateTags = async (
      newTags: TagRequest[],
      type: OrganizationTagType,
    ) => {
      const currentTagsIds = map(
        filter(
          organization.tags,
          (organizationTag) => organizationTag.type === type,
        ),
        'id',
      );
      await this.tags.deleteByIds(currentTagsIds);
      await this.tags.create(
        map(newTags, (newTag) => ({
          name: newTag.name,
          type,
          organizationId,
        })),
      );
    };

    if (payload?.rAndDSites) {
      await updateTags(payload.rAndDSites, OrganizationTagType.RAndD);
    }

    if (payload?.otherLocations) {
      await updateTags(
        payload.otherLocations,
        OrganizationTagType.OtherLocations,
      );
    }

    return this.getOrganizationGeneralById(organizationId);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateOrganizationProducts(
    organizationId: string,
    payload: UpdateOrganizationProductsRequest,
  ) {
    const organization = await this.getById(organizationId, {
      search: {
        expands: this.expandsProducts,
      },
    });

    await this.updateById(
      organizationId,
      omit(payload, [
        'products',
        'primaryActivities',
        'secondaryActivities',
        'localSites',
        'foreignImplantationSites',
        'foreignExportationSites',
      ]),
    );

    if (payload?.products) {
      const existingProducts = organization.products;

      await Promise.all(
        map(payload.products, async (productPayload) => {
          const existingProduct = find(existingProducts, {
            name: productPayload.name,
          });
          if (existingProduct) {
            return this.products.update(existingProduct.id, {
              ...productPayload,
            });
          } else {
            await this.products.create({
              ...productPayload,
              organizationId,
            });
          }
        }),
      );

      const deletedProductsIds = map(
        filter(
          existingProducts,
          (existingProduct) =>
            !find(payload.products, { name: existingProduct.name }),
        ),
        'id',
      );
      await this.products.deleteByIds(deletedProductsIds);
    }

    const updateActivities = async (
      newActivitiesIds: string[],
      activityType: OrganizationActivityType,
    ) => {
      const currentActivitiesIds = map(
        filter(
          organization.organizationActivities,
          (organizationActivity) => organizationActivity.type === activityType,
        ),
        'activityId',
      );

      const { removed: activitiesToRemove, added: activitiesToAdd } =
        this.getDifferences(newActivitiesIds, currentActivitiesIds);

      await Promise.all(
        map(activitiesToRemove, (activityId: string) =>
          this.organizationActivities.deleteByCriteria({
            activityId,
            organizationId,
          }),
        ),
      );

      await this.organizationActivities.create(
        map(activitiesToAdd, (activityId) => ({
          activityId,
          organizationId,
          type: activityType,
        })),
      );
    };

    if (payload?.primaryActivities) {
      await updateActivities(
        payload.primaryActivities,
        OrganizationActivityType.Primary,
      );
    }

    if (payload?.secondaryActivities) {
      await updateActivities(
        payload.secondaryActivities,
        OrganizationActivityType.Secondary,
      );
    }

    const updateSites = async (
      newSites: OrganizationSiteRequest[],
      type: OrganizationSiteType,
    ) => {
      const existingSites = filter(
        organization.sites,
        (site) => site.type === type,
      );

      await Promise.all(
        map(newSites, async (newSite) => {
          const existingSite = find(existingSites, {
            name: newSite.name,
          });
          if (existingSite) {
            return this.organizationSites.update(existingSite.id, {
              ...newSite,
            });
          } else {
            await this.organizationSites.create({
              ...newSite,
              organizationId,
              type,
            });
          }
        }),
      );

      const deletedSitesIds = map(
        filter(
          existingSites,
          (existingSite) => !find(newSites, { name: existingSite.name }),
        ),
        'id',
      );
      await this.organizationSites.deleteByIds(deletedSitesIds);
    };

    if (payload?.localSites) {
      await updateSites(payload.localSites, OrganizationSiteType.LocalSite);
    }

    if (payload?.foreignImplantationSites) {
      await updateSites(
        payload.foreignImplantationSites,
        OrganizationSiteType.ForeignImplantationSite,
      );
    }

    if (payload?.foreignExportationSites) {
      await updateSites(
        payload.foreignExportationSites,
        OrganizationSiteType.ForeignExportationSite,
      );
    }

    return this.getOrganizationProductsById(organizationId);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateOrganizationHumanResources(
    organizationId: string,
    payload: UpdateOrganizationHumanResourcesRequest,
  ) {
    const organization = await this.getById(organizationId, {
      search: {
        expands: this.expandsHumanResources,
      },
    });

    await this.updateById(
      organizationId,
      omit(payload, [
        'directEmployees',
        'indirectEmployees',
        'contracts',
        'revenues',
        'ageKpis',
        'formationKpi',
      ]),
    );

    const updateEmployees = async (
      newEmployeeKpi: OrganizationEmployeeKpiRequest,
      employeesKpiType: EmployeesKpiType,
    ) => {
      const existingEmployeeKpi = find(organization.employeesKpis, {
        type: employeesKpiType,
      });
      if (!!existingEmployeeKpi) {
        await this.employeesKpi.update(existingEmployeeKpi.id, {
          men: newEmployeeKpi.men,
          women: newEmployeeKpi.women,
        });
      } else {
        await this.employeesKpi.create({
          men: newEmployeeKpi.men,
          women: newEmployeeKpi.women,
          organizationId,
          type: employeesKpiType,
        });
      }
    };

    if (payload?.directEmployees) {
      await updateEmployees(payload.directEmployees, EmployeesKpiType.Direct);
    }

    if (payload?.indirectEmployees) {
      await updateEmployees(
        payload.indirectEmployees,
        EmployeesKpiType.Indirect,
      );
    }

    const updateContracts = async (
      newContracts: OrganizationContractRequest[],
    ) => {
      const existingContracts = organization.contracts;

      await Promise.all(
        map(newContracts, async (newContract) => {
          const existingContract = find(existingContracts, {
            type: newContract.type,
          });
          if (existingContract) {
            return this.contracts.update(existingContract.id, {
              ...newContract,
            });
          } else {
            await this.contracts.create({
              ...newContract,
              organizationId,
            });
          }
        }),
      );

      const deletedContractsIds = map(
        filter(
          existingContracts,
          (existingContract) =>
            !find(newContracts, { type: existingContract.type }),
        ),
        'id',
      );
      await this.contracts.deleteByIds(deletedContractsIds);
    };

    if (payload?.contracts) {
      await updateContracts(payload.contracts);
    }

    const updateRevenues = async (
      newRevenues: OrganizationRevenueKpiRequest[],
    ) => {
      const existingRevenues = organization.revenueKpis;

      await Promise.all(
        map(newRevenues, async (newRevenue) => {
          const existingRevenue = find(existingRevenues, {
            type: newRevenue.type,
          });
          if (existingRevenue) {
            return this.revenues.update(existingRevenue.id, {
              ...newRevenue,
            });
          } else {
            await this.revenues.create({
              ...newRevenue,
              organizationId,
            });
          }
        }),
      );

      const deletedRevenuesIds = map(
        filter(
          existingRevenues,
          (existingRevenue) =>
            !find(newRevenues, { type: existingRevenue.type }),
        ),
        'id',
      );
      await this.revenues.deleteByIds(deletedRevenuesIds);
    };

    if (payload?.revenues) {
      await updateRevenues(payload.revenues);
    }

    const updateAgesKpi = async (newAgeKpi: OrganizationAgeKpiRequest) => {
      const existingAgesKpi = organization.ageKpis;
      if (existingAgesKpi) {
        await this.agesKpis.updateById(existingAgesKpi.id, newAgeKpi);
      } else {
        await this.agesKpis.create({
          ...newAgeKpi,
          organizationId,
        });
      }
    };

    await updateAgesKpi(payload.ageKpis);

    const updateFormationKpi = async (
      newFormationKpi: OrganizationFormationRequest,
    ) => {
      const existingFormationKpi = organization.formationKpi;
      if (existingFormationKpi) {
        await this.formations.updateById(
          existingFormationKpi.id,
          newFormationKpi,
        );
      } else {
        await this.formations.create({
          ...newFormationKpi,
          organizationId,
        });
      }
    };

    await updateFormationKpi(payload.formationKpi);

    return this.getOrganizationHumanResourcesById(organizationId);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateOrganizationRevenues(
    organizationId: string,
    payload: UpdateOrganizationRevenuesRequest,
  ) {
    const organization = await this.getById(organizationId, {
      search: {
        expands: this.expandsRevenues,
      },
    });

    await this.updateById(
      organizationId,
      omit(payload, [
        'turnoverDistribution',
        'clientsTypes',
        'turnover',
        'countriesParticipation',
      ]),
    );

    const updateTurnoverDistribution = async (
      newDistributions: OrganizationTurnoverDistributionRequest[],
    ) => {
      this.checkSum(newDistributions);

      const existingDistributions = organization.turnoverDistribution;

      await Promise.all(
        map(newDistributions, async (newDistribution) => {
          const existingDistribution = find(existingDistributions, {
            type: newDistribution.type,
          });
          if (existingDistribution) {
            return this.turnoverDistribution.update(existingDistribution.id, {
              ...newDistribution,
            });
          } else {
            await this.turnoverDistribution.create({
              ...newDistribution,
              organizationId,
            });
          }
        }),
      );

      const deletedDistributionsIds = map(
        filter(
          existingDistributions,
          (existingDistribution) =>
            !find(newDistributions, { type: existingDistribution.type }),
        ),
        'id',
      );
      await this.turnoverDistribution.deleteByIds(deletedDistributionsIds);
    };

    if (payload.turnoverDistribution) {
      await updateTurnoverDistribution(payload.turnoverDistribution);
    }

    const updateClients = async (newClients: OrganizationClientRequest[]) => {
      this.checkSum(newClients);

      const existingClients = organization.clientsTypes;

      await Promise.all(
        map(newClients, async (newClient) => {
          const existingClient = find(existingClients, {
            type: newClient.type,
          });
          if (existingClient) {
            return this.clients.update(existingClient.id, {
              ...newClient,
            });
          } else {
            await this.clients.create({
              ...newClient,
              organizationId,
            });
          }
        }),
      );

      const deletedClientsIds = map(
        filter(
          existingClients,
          (existingClient) => !find(newClients, { type: existingClient.type }),
        ),
        'id',
      );
      await this.clients.deleteByIds(deletedClientsIds);
    };

    if (payload.clientsTypes) {
      await updateClients(payload.clientsTypes);
    }

    const updateTurnover = async (newTurnover: OrganizationTurnoverRequest) => {
      const existingTurnover = organization.turnover;
      if (existingTurnover) {
        await this.turnovers.updateById(existingTurnover.id, newTurnover);
      } else {
        await this.turnovers.create({
          ...newTurnover,
          organizationId,
        });
      }
    };

    await updateTurnover(payload.turnover);

    const updateCountries = async (
      newCounties: CountryParticipationRequest[],
    ) => {
      this.checkSum(newCounties);

      const existingCounties = organization.countriesParticipation;

      await Promise.all(
        map(newCounties, async (newCountry) => {
          const existingCountry = find(existingCounties, {
            country: newCountry.country,
          });
          if (existingCountry) {
            return this.countries.update(existingCountry.id, {
              ...newCountry,
            });
          } else {
            await this.countries.create({
              ...newCountry,
              organizationId,
            });
          }
        }),
      );

      const deletedCountriesIds = map(
        filter(
          existingCounties,
          (existingCountry) =>
            !find(newCounties, { country: existingCountry.country }),
        ),
        'id',
      );
      await this.countries.deleteByIds(deletedCountriesIds);
    };

    if (payload.countriesParticipation) {
      await updateCountries(payload.countriesParticipation);
    }

    return this.getOrganizationRevenuesById(organizationId);
  }

  private async checkEmail(email?: string, id?: string) {
    if (email) {
      const response = await this.orgs.findOne({ email });
      if (!!response && response.id != id) {
        throw new BadRequestException(
          AuthErrors.EmailAlreadyExists,
          'The email you attempt to use is already taken',
        );
      }
    }
  }

  private async checkPhone(phone?: string, id?: string) {
    if (phone) {
      const res = await this.orgs.findOne({ phone });
      if (!!res && res.id != id) {
        throw new BadRequestException(
          AuthErrors.PhoneAlreadyExists,
          'The phone number you attempt to use is already taken',
        );
      }
    }
  }

  private getDifferences(payload: string[], values: string[]) {
    const removed: string[] = difference(values, payload);

    const added: string[] = difference(payload, values);

    return { added, removed };
  }

  private checkSum(payload: { count: number }[]) {
    const total = sumBy(payload, (item) => Number(item.count));
    if (Math.abs(total - 100) >= 0.0001) {
      throw new BadRequestException(
        AuthErrors.InvalidPercentageSum,
        'The total count must equal 100',
      );
    }
  }
}
