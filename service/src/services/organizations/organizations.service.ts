import { BadRequestException, Injectable } from '@nestjs/common';
import {
  difference,
  filter,
  find,
  includes,
  isEmpty,
  map,
  omit,
  sumBy,
} from 'lodash';
import { FindOptionsWhere } from 'typeorm';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  ADHERENT_ROLE_NAME,
  AttributeRequest,
  AuthErrors,
  CountryParticipationRequest,
  CrudService,
  EmployeesKpiType,
  OrganizationActivityType,
  OrganizationAgeKpiRequest,
  OrganizationAttributeType,
  OrganizationClientRequest,
  OrganizationContractRequest,
  OrganizationEmployeeKpiRequest,
  OrganizationEnvironmentRequest,
  OrganizationExtrasResponse,
  OrganizationFormationRequest,
  OrganizationGeneralResponse,
  OrganizationHumanResourcesResponse,
  OrganizationInitiativeRequest,
  OrganizationOpportunitiesResponse,
  OrganizationOpportunityRequest,
  OrganizationOthersResponse,
  OrganizationProductsResponse,
  OrganizationQuestionRequest,
  OrganizationRdProjectRequest,
  OrganizationRequest,
  OrganizationResearchDevelopmentRequest,
  OrganizationResponse,
  OrganizationRevenueKpiRequest,
  OrganizationRevenuesResponse,
  OrganizationSiteRequest,
  OrganizationSiteType,
  OrganizationsSearchFilter,
  OrganizationTagType,
  OrganizationTurnoverDistributionRequest,
  OrganizationTurnoverRequest,
  OrganizationViewType,
  OrganizationWasteDistributionRequest,
  ProductType,
  SearchQuery,
  TagRequest,
  UpdateOrganizationExtrasRequest,
  UpdateOrganizationGeneralRequest,
  UpdateOrganizationHumanResourcesRequest,
  UpdateOrganizationOpportunitiesRequest,
  UpdateOrganizationOthersRequest,
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
import { OrganizationAttributesService } from './organization-attributes.service';
import { OrganizationClientsService } from './organization-clients.service';
import { OrganizationContractsService } from './organization-contracts.service';
import { OrganizationEmployeesKpisService } from './organization-employees-kpis.service';
import { OrganizationEnvironmentsService } from './organization-environments.service';
import { OrganizationFormationsService } from './organization-formations.service';
import { OrganizationInitiativesService } from './organization-initiatives.service';
import { OrganizationOpportunitiesService } from './organization-opportunities.service';
import { OrganizationQuestionsService } from './organization-questions.service';
import { OrganizationRdProjectsService } from './organization-rd-projects.service';
import { OrganizationResearchDevelopmentsService } from './organization-research-developments.service';
import { OrganizationRevenuesKpisService } from './organization-revenues-kpis.service';
import { OrganizationSitesService } from './organization-sites.service';
import { OrganizationTagsService } from './organization-tags.service';
import { OrganizationTurnoverDistributionsService } from './organization-turnover-distributions.service';
import { OrganizationTurnoversService } from './organization-turnovers.service';
import { OrganizationViewsService } from './organization-views.service';
import { OrganizationWasteDistributionsService } from './organization-waste-distributions.service';
import { ProductsService } from './products.service';

@Injectable()
export class OrganizationsService extends CrudService<Organization> {
  protected notFoundErrorKey = AuthErrors.OrganizationNotFound;
  protected notFoundErrorMessage = 'The searched organization is not found';

  private readonly expandsGeneral: string[] = [
    'tags',
    'adherent.userRoles.role',
    'views',
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
  private readonly expandsExtras: string[] = [
    'products',
    'attributes',
    'researchDevelopment',
    'tags',
    'rAndDProjects',
    'initiatives',
  ];
  private readonly expandsOthers: string[] = [
    'environment',
    'wasteDistribution',
    'questions',
  ];
  private readonly expandsOpportunities: string[] = ['opportunities'];

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
    private readonly attributes: OrganizationAttributesService,
    private readonly research: OrganizationResearchDevelopmentsService,
    private readonly rdProjects: OrganizationRdProjectsService,
    private readonly initiatives: OrganizationInitiativesService,
    private readonly environments: OrganizationEnvironmentsService,
    private readonly wasteDistributions: OrganizationWasteDistributionsService,
    private readonly questions: OrganizationQuestionsService,
    private readonly opportunities: OrganizationOpportunitiesService,
    private readonly views: OrganizationViewsService,
  ) {
    super(orgs);
  }

  async search(filters: OrganizationsSearchFilter) {
    const conditions = [
      new OrganizationsSearchFilter({
        ...omit(filters, 'query'),
        ...(SearchQuery.getQuery(filters) && {
          name: SearchQuery.getQuery(filters),
        }),
      }),
    ];

    const criteria: FindOptionsWhere<Organization> = {};

    return this.orgs.search(conditions, criteria);
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
    return new OrganizationGeneralResponse({
      ...organization,
      externalViews: map(
        filter(organization.views, {
          type: OrganizationViewType.External,
        }),
        (view) => view.viewUrl,
      ),
      internalViews: map(
        filter(organization.views, {
          type: OrganizationViewType.Internal,
        }),
        (view) => view.viewUrl,
      ),
    });
  }

  async getOrganizationProductsById(organizationId: string) {
    const organization = await this.getOrganization(
      organizationId,
      this.expandsProducts,
    );
    return new OrganizationProductsResponse({
      ...organization,
      products: filter(organization.products, { type: ProductType.Old }),
    });
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

  async getOrganizationExtrasById(organizationId: string) {
    const organization = await this.getOrganization(
      organizationId,
      this.expandsExtras,
    );
    return new OrganizationExtrasResponse({
      ...organization,
      products: filter(organization.products, { type: ProductType.New }),
      certifications: filter(organization.tags, {
        type: OrganizationTagType.Certification,
      }),
    });
  }

  async getOrganizationOthersById(organizationId: string) {
    const organization = await this.getOrganization(
      organizationId,
      this.expandsOthers,
    );
    return new OrganizationOthersResponse(organization);
  }

  async getOrganizationOpportunitiesById(organizationId: string) {
    const organization = await this.getOrganization(
      organizationId,
      this.expandsOpportunities,
    );
    return new OrganizationOpportunitiesResponse(organization);
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
      omit(payload, [
        'rAndDSites',
        'otherLocations',
        'externalViews',
        'internalViews',
      ]),
    );

    if (payload?.rAndDSites) {
      await this.updateTags(
        organization,
        payload.rAndDSites,
        OrganizationTagType.RAndD,
      );
    }

    if (payload?.otherLocations) {
      await this.updateTags(
        organization,
        payload.otherLocations,
        OrganizationTagType.OtherLocations,
      );
    }

    const updateViews = async (
      newViews: string[],
      type: OrganizationViewType,
    ) => {
      const existingViews = filter(
        organization.views,
        (view) => view.type === type,
      );
      console.log({ existingViews });

      await Promise.all(
        map(newViews, async (newView) => {
          const existingView = find(existingViews, {
            viewUrl: newView,
          });
          if (!existingView) {
            await this.views.create({
              viewUrl: newView,
              organizationId,
              type,
            });
          }
        }),
      );

      console.log({
        delete: filter(
          existingViews,
          (existingView) => !find(newViews, { viewUrl: existingView.viewUrl }),
        ),
      });
      const deletedViewsIds = map(
        filter(
          existingViews,
          (existingView) => !includes(newViews, existingView.viewUrl),
        ),
        'id',
      );
      await this.views.deleteByIds(deletedViewsIds);
    };

    if (payload?.externalViews) {
      await updateViews(payload.externalViews, OrganizationViewType.External);
    }

    if (payload?.internalViews) {
      await updateViews(payload.internalViews, OrganizationViewType.Internal);
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
      const existingProducts = filter(organization.products, {
        type: ProductType.Old,
      });

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
              type: ProductType.Old,
            });
          }
        }),
      );

      const deletedProductsIds = map(
        filter(
          existingProducts,
          (existingProduct) =>
            !find(payload.products, {
              name: existingProduct.name,
            }),
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

    if (payload?.ageKpis) {
      await updateAgesKpi(payload.ageKpis);
    }

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

    if (payload?.turnover) {
      await updateTurnover(payload.turnover);
    }

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

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateOrganizationExtras(
    organizationId: string,
    payload: UpdateOrganizationExtrasRequest,
  ) {
    const organization = await this.getById(organizationId, {
      search: {
        expands: this.expandsExtras,
      },
    });

    await this.updateById(
      organizationId,
      omit(payload, [
        'products',
        'investments',
        'esgs',
        'partnerships',
        'technologies',
        'researchDevelopment',
        'certifications',
        'rAndDProjects',
        'initiatives',
      ]),
    );

    if (payload?.products) {
      const existingProducts = filter(organization.products, {
        type: ProductType.New,
      });

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
              type: ProductType.New,
            });
          }
        }),
      );

      const deletedProductsIds = map(
        filter(
          existingProducts,
          (existingProduct) =>
            !find(payload.products, {
              name: existingProduct.name,
            }),
        ),
        'id',
      );
      await this.products.deleteByIds(deletedProductsIds);
    }

    const updateAttributes = async (
      newAttributes: AttributeRequest[],
      type: OrganizationAttributeType,
    ) => {
      const existingAttributes = filter(organization.attributes, { type });

      await Promise.all(
        map(newAttributes, async (newAttribute) => {
          const existingAttribute = find(existingAttributes, {
            name: newAttribute.name,
          });
          if (existingAttribute) {
            return this.attributes.update(existingAttribute.id, {
              ...newAttribute,
            });
          } else {
            await this.attributes.create({
              ...newAttribute,
              organizationId,
              type,
            });
          }
        }),
      );

      const deletedAttributesIds = map(
        filter(
          existingAttributes,
          (existingAttribute) =>
            !find(newAttributes, { name: existingAttribute.name }),
        ),
        'id',
      );
      await this.attributes.deleteByIds(deletedAttributesIds);
    };

    if (payload?.investments) {
      await updateAttributes(
        payload.investments,
        OrganizationAttributeType.Investment,
      );
    }

    if (payload?.esgs) {
      await updateAttributes(payload.esgs, OrganizationAttributeType.ESG);
    }

    if (payload?.partnerships) {
      await updateAttributes(
        payload.partnerships,
        OrganizationAttributeType.Partnerships,
      );
    }

    if (payload?.technologies) {
      await updateAttributes(
        payload.technologies,
        OrganizationAttributeType.Technologies,
      );
    }

    const updateResearch = async (
      newResearch: OrganizationResearchDevelopmentRequest,
    ) => {
      const existingResearch = organization.researchDevelopment;

      if (existingResearch) {
        await this.research.updateById(existingResearch.id, newResearch);
      } else {
        await this.research.create({
          ...newResearch,
          organizationId,
        });
      }
    };

    if (payload?.researchDevelopment) {
      await updateResearch(payload.researchDevelopment);
    }

    if (payload?.certifications) {
      await this.updateTags(
        organization,
        payload.certifications,
        OrganizationTagType.Certification,
      );
    }

    const updateRDProjects = async (
      newRDProjects: OrganizationRdProjectRequest[],
    ) => {
      const existingProjects = organization.rAndDProjects;

      await Promise.all(
        map(newRDProjects, async (newRDProject) => {
          const existingProject = find(existingProjects, {
            name: newRDProject.name,
          });
          if (existingProject) {
            return this.rdProjects.update(existingProject.id, newRDProject);
          } else {
            await this.rdProjects.create({
              ...newRDProject,
              organizationId,
            });
          }
        }),
      );

      const deletedProjectIds = map(
        filter(
          existingProjects,
          (existingProject) =>
            !find(newRDProjects, { name: existingProject.name }),
        ),
        'id',
      );
      await this.rdProjects.deleteByIds(deletedProjectIds);
    };

    if (payload?.rAndDProjects) {
      await updateRDProjects(payload.rAndDProjects);
    }

    const updateInitiatives = async (
      newInitiatives: OrganizationInitiativeRequest[],
    ) => {
      const existingInitiatives = organization.initiatives;

      await Promise.all(
        map(newInitiatives, async (newInitiative) => {
          const existingInitiative = find(existingInitiatives, {
            name: newInitiative.name,
          });
          if (existingInitiative) {
            return this.initiatives.update(
              existingInitiative.id,
              newInitiative,
            );
          } else {
            await this.initiatives.create({
              ...newInitiative,
              organizationId,
            });
          }
        }),
      );

      const deletedInitiativesIds = map(
        filter(
          existingInitiatives,
          (existingInitiative) =>
            !find(newInitiatives, { name: existingInitiative.name }),
        ),
        'id',
      );
      await this.initiatives.deleteByIds(deletedInitiativesIds);
    };

    if (payload?.initiatives) {
      await updateInitiatives(payload.initiatives);
    }

    return this.getOrganizationExtrasById(organizationId);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateOrganizationOthers(
    organizationId: string,
    payload: UpdateOrganizationOthersRequest,
  ) {
    const organization = await this.getById(organizationId, {
      search: {
        expands: this.expandsOthers,
      },
    });

    await this.updateById(
      organizationId,
      omit(payload, ['environment', 'wasteDistribution', 'questions']),
    );

    const updateEnvironment = async (
      newEnvironment: OrganizationEnvironmentRequest,
    ) => {
      const existingEnvironment = organization.environment;

      if (existingEnvironment) {
        await this.environments.updateById(
          existingEnvironment.id,
          newEnvironment,
        );
      } else {
        await this.environments.create({
          ...newEnvironment,
          organizationId,
        });
      }
    };

    if (payload?.environment) {
      await updateEnvironment(payload.environment);
    }

    const updateWasteDistribution = async (
      newWasteDistribution: OrganizationWasteDistributionRequest,
    ) => {
      const existingWasteDistribution = organization.wasteDistribution;

      if (existingWasteDistribution) {
        await this.wasteDistributions.updateById(
          existingWasteDistribution.id,
          newWasteDistribution,
        );
      } else {
        await this.wasteDistributions.create({
          ...newWasteDistribution,
          organizationId,
        });
      }
    };

    if (payload?.wasteDistribution) {
      await updateWasteDistribution(payload.wasteDistribution);
    }

    const updateQuestions = async (
      newQuestions: OrganizationQuestionRequest[],
    ) => {
      const existingQuestions = organization.questions;

      await Promise.all(
        map(newQuestions, async (newQuestion) => {
          const existingQuestion = find(existingQuestions, {
            question: newQuestion.question,
          });
          if (existingQuestion) {
            return this.questions.update(existingQuestion.id, newQuestion);
          } else {
            await this.questions.create({
              ...newQuestion,
              organizationId,
            });
          }
        }),
      );

      const deletedQuestionsIds = map(
        filter(
          existingQuestions,
          (existingQuestion) =>
            !find(newQuestions, { question: existingQuestion.question }),
        ),
        'id',
      );
      await this.questions.deleteByIds(deletedQuestionsIds);
    };

    if (payload?.questions) {
      await updateQuestions(payload.questions);
    }

    return this.getOrganizationOthersById(organizationId);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateOrganizationOpportunities(
    organizationId: string,
    payload: UpdateOrganizationOpportunitiesRequest,
  ) {
    const organization = await this.getById(organizationId, {
      search: {
        expands: this.expandsOpportunities,
      },
    });

    await this.updateById(organizationId, omit(payload, ['opportunities']));

    const updateOpportunities = async (
      newOpportunities: OrganizationOpportunityRequest[],
    ) => {
      const existingOpportunities = organization.opportunities;

      await Promise.all(
        map(newOpportunities, async (newOpportunity) => {
          const existingOpportunity = find(existingOpportunities, {
            id: newOpportunity?.id || '',
          });
          if (existingOpportunity) {
            return this.opportunities.update(
              existingOpportunity.id,
              newOpportunity,
            );
          } else {
            await this.opportunities.create({
              ...newOpportunity,
              organizationId,
            });
          }
        }),
      );

      const deletedOpportunitiesIds = map(
        filter(
          existingOpportunities,
          (existingOpportunity) =>
            !find(newOpportunities, { id: existingOpportunity.id }),
        ),
        'id',
      );

      await this.opportunities.deleteByIds(deletedOpportunitiesIds);
    };

    if (payload?.opportunities) {
      await updateOpportunities(payload.opportunities);
    }

    return this.getOrganizationOpportunitiesById(organizationId);
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

  private async updateTags(
    organization: Organization,
    newTags: TagRequest[],
    type: OrganizationTagType,
  ) {
    const currentTags = filter(
      organization.tags,
      (organizationTag) => organizationTag.type === type,
    );

    const currentNames = map(currentTags, 'name');
    const newNames = map(newTags, 'name');

    const { removed: tagsToRemove, added: tagsToAdd } = this.getDifferences(
      newNames,
      currentNames,
    );

    const tagsToDelete = filter(currentTags, (tag) =>
      includes(tagsToRemove, tag.name),
    );
    const tagsToCreate = filter(newTags, (tag) =>
      includes(tagsToAdd, tag.name),
    );

    if (!isEmpty(tagsToDelete)) {
      await this.tags.deleteByIds(map(tagsToDelete, 'id'));
    }

    if (!isEmpty(tagsToCreate)) {
      await this.tags.create(
        map(tagsToCreate, (tag) => ({
          name: tag.name,
          type,
          organizationId: organization.id,
        })),
      );
    }
  }
}
