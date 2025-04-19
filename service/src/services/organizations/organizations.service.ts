import { BadRequestException, Injectable } from '@nestjs/common';
import { difference, filter, find, isUndefined, map, omit } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  ADHERENT_ROLE_NAME,
  AuthErrors,
  CrudService,
  EmployeesKpiType,
  OrganizationActivityType,
  OrganizationContractRequest,
  OrganizationEmployeeKpiRequest,
  OrganizationRequest,
  OrganizationResponse,
  OrganizationSiteRequest,
  OrganizationSiteType,
  OrganizationTagType,
  TagRequest,
  UpdateOrganizationRequest,
  UserType,
} from '../../common';
import { Organization } from '../../entities';
import { OrganizationsRepository } from '../../repositories';
import { RolesService, UserRolesService } from '../roles';
import { UsersService } from '../users';
import { OrganizationActivitiesService } from './organization-activities.service';
import { OrganizationContractsService } from './organization-contracts.service';
import { OrganizationEmployeesKpisService } from './organization-employees-kpis.service';
import { OrganizationSitesService } from './organization-sites.service';
import { OrganizationTagsService } from './organization-tags.service';
import { ProductsService } from './products.service';

@Injectable()
export class OrganizationsService extends CrudService<Organization> {
  protected notFoundErrorKey = AuthErrors.OrganizationNotFound;
  protected notFoundErrorMessage = 'The searched organization is not found';

  private readonly payloadOmit = [
    'rAndDSites',
    'otherLocations',
    'products',
    'primaryActivities',
    'secondaryActivities',
    'localSites',
    'foreignImplantationSites',
    'foreignExportationSites',
    'directEmployees',
    'indirectEmployees',
    'contracts',
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
  ) {
    super(orgs);
  }

  async getOrganization(organizationId: string, expands?: string[]) {
    const organization = await this.getById(organizationId, {
      search: {
        expands: isUndefined(expands) ? [] : expands,
      },
    });

    return new OrganizationResponse(organization);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async createOrganization(payload: OrganizationRequest) {
    await this.checkEmail(payload.email);
    await this.checkPhone(payload.phone);

    const org = await this.create(payload);

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
    payload: UpdateOrganizationRequest,
  ) {
    await this.checkPhone(payload.phone, organizationId);

    const organization = await this.getById(organizationId, {
      search: {
        expands: ['tags'],
      },
    });

    await this.updateById(organizationId, omit(payload, this.payloadOmit));

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

    return this.getOrganization(organizationId, [
      'tags',
      'adherent.userRoles.role',
    ]);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateOrganizationProducts(
    organizationId: string,
    payload: UpdateOrganizationRequest,
  ) {
    await this.checkPhone(payload.phone, organizationId);

    const organization = await this.getById(organizationId, {
      search: {
        expands: ['products', 'organizationActivities', 'sites'],
      },
    });

    await this.updateById(organizationId, omit(payload, this.payloadOmit));

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

    return this.getOrganization(organizationId, [
      'sites',
      'organizationActivities.activity',
      'products',
    ]);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateOrganizationHumanResources(
    organizationId: string,
    payload: UpdateOrganizationRequest,
  ) {
    await this.checkPhone(payload.phone, organizationId);

    const organization = await this.getById(organizationId, {
      search: {
        expands: ['employeesKpis', 'contracts'],
      },
    });

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

    await this.updateById(organizationId, omit(payload, this.payloadOmit));

    return this.getOrganization(organizationId, ['employeesKpis', 'contracts']);
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
}
