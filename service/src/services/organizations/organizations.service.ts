import { BadRequestException, Injectable } from '@nestjs/common';
import { difference, filter, find, map, omit } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AuthErrors,
  CrudService,
  OrganizationActivityType,
  OrganizationRequest,
  OrganizationResponse,
  OrganizationSiteRequest,
  OrganizationSiteType,
  UpdateOrganizationRequest,
  UserType,
} from '../../common';
import { Organization } from '../../entities';
import { OrganizationsRepository } from '../../repositories';
import { UsersService } from '../users';
import { OrganizationActivitiesService } from './organization-activities.service';
import { OrganizationSitesService } from './organization-sites.service';
import { OtherLocationsTagsService } from './other-locations.tags.service';
import { ProductsService } from './products.service';
import { RDTagsService } from './r&d-tags.service';

@Injectable()
export class OrganizationsService extends CrudService<Organization> {
  protected notFoundErrorKey = AuthErrors.OrganizationNotFound;
  protected notFoundErrorMessage = 'The searched organization is not found';

  constructor(
    private readonly orgs: OrganizationsRepository,
    private readonly rAndDSitesTags: RDTagsService,
    private readonly otherLocationsTags: OtherLocationsTagsService,
    private readonly products: ProductsService,
    private readonly organizationActivities: OrganizationActivitiesService,
    private readonly organizationSites: OrganizationSitesService,
    private readonly users: UsersService,
  ) {
    super(orgs);
  }

  async getOrganization(organizationId: string) {
    const organization = await this.getById(organizationId, {
      search: {
        expands: [
          'rAndDSites',
          'otherLocations',
          'adherent.userRoles.role',
          'products',
          'organizationActivities.activity',
          'sites',
        ],
      },
    });

    return new OrganizationResponse(organization);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async createOrganization(payload: OrganizationRequest) {
    await this.checkEmail(payload.email);
    await this.checkPhone(payload.phone);

    const org = await this.create(
      omit(payload, [
        'rAndDSites',
        'otherLocations',
        'products',
        'primaryActivities',
        'secondaryActivities',
        'localSites',
        'foreignImplantationSites',
        'foreignExportationSites',
      ]),
    );

    if (payload?.rAndDSites?.length) {
      await Promise.all(
        map(payload.rAndDSites, (rAndDSite) =>
          this.rAndDSitesTags.create({
            organizationId: org.id,
            name: rAndDSite.name,
          }),
        ),
      );
    }

    if (payload?.otherLocations?.length) {
      await Promise.all(
        map(payload.otherLocations, (otherLocation) =>
          this.otherLocationsTags.create({
            organizationId: org.id,
            name: otherLocation.name,
          }),
        ),
      );
    }

    if (payload?.products?.length) {
      await this.products.create(
        map(payload.products, (product) => ({
          ...product,
          organizationId: org.id,
        })),
      );
    }

    const createActivities = async (
      activitiesIds: string[],
      type: OrganizationActivityType,
    ) => {
      await this.organizationActivities.create(
        map(activitiesIds, (activityId) => ({
          activityId,
          organizationId: org.id,
          type,
        })),
      );
    };

    if (payload?.primaryActivities?.length) {
      await createActivities(
        payload.primaryActivities,
        OrganizationActivityType.Primary,
      );
    }

    if (payload?.secondaryActivities?.length) {
      await createActivities(
        payload.secondaryActivities,
        OrganizationActivityType.Secondary,
      );
    }

    const createSites = async (
      sites: OrganizationSiteRequest[],
      type: OrganizationSiteType,
    ) => {
      await this.organizationSites.create(
        map(sites, (site) => ({ ...site, organizationId: org.id, type })),
      );
    };

    if (payload?.localSites?.length) {
      await createSites(payload.localSites, OrganizationSiteType.LocalSite);
    }

    if (payload?.foreignImplantationSites?.length) {
      await createSites(
        payload.foreignImplantationSites,
        OrganizationSiteType.ForeignImplantationSite,
      );
    }

    if (payload?.foreignExportationSites?.length) {
      await createSites(
        payload.foreignExportationSites,
        OrganizationSiteType.ForeignExportationSite,
      );
    }

    const adherent = await this.users.createUser({
      name: org.email.split('@')[0],
      email: org.email,
      type: UserType.Adherent,
      organizationId: org.id,
    });

    await this.updateById(org.id, { adherentId: adherent.id });

    return new OrganizationResponse(org);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateOrganization(
    organizationId: string,
    payload: UpdateOrganizationRequest,
  ) {
    await this.checkPhone(payload.phone, organizationId);

    const organization = await this.getById(organizationId, {
      search: {
        expands: [
          'rAndDSites',
          'otherLocations',
          'products',
          'organizationActivities',
          'sites',
        ],
      },
    });

    await this.updateById(
      organizationId,
      omit(payload, [
        'rAndDSites',
        'otherLocations',
        'products',
        'primaryActivities',
        'secondaryActivities',
        'localSites',
        'foreignImplantationSites',
        'foreignExportationSites',
      ]),
    );

    if (payload?.rAndDSites) {
      await Promise.all(
        map(organization?.rAndDSites, (rAndDSite) =>
          this.rAndDSitesTags.delete(rAndDSite.id),
        ),
      );

      await Promise.all([
        map(payload.rAndDSites, (rAndDSite) =>
          this.rAndDSitesTags.create({ name: rAndDSite.name, organizationId }),
        ),
      ]);
    }

    if (payload?.otherLocations) {
      await Promise.all(
        map(organization?.otherLocations, (location) =>
          this.otherLocationsTags.delete(location.id),
        ),
      );

      await Promise.all(
        map(payload.otherLocations, (location) =>
          this.otherLocationsTags.create({
            name: location.name,
            organizationId,
          }),
        ),
      );
    }

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
        map(activitiesToRemove, (activityId) =>
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

    return this.getOrganization(organizationId);
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
