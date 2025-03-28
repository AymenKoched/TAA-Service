import { BadRequestException, Injectable } from '@nestjs/common';
import { map, omit } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AuthErrors,
  CrudService,
  OrganizationRequest,
  OrganizationResponse,
  UpdateOrganizationRequest,
  UserType,
} from '../../common';
import { Organization } from '../../entities';
import { OrganizationsRepository } from '../../repositories';
import { UsersService } from '../users';
import { OtherLocationsTagsService } from './other-locations.tags.service';
import { RDTagsService } from './r&d-tags.service';

@Injectable()
export class OrganizationsService extends CrudService<Organization> {
  protected notFoundErrorKey = AuthErrors.OrganizationNotFound;
  protected notFoundErrorMessage = 'The searched organization is not found';

  constructor(
    private readonly orgs: OrganizationsRepository,
    private readonly rAndDSitesTags: RDTagsService,
    private readonly otherLocationsTags: OtherLocationsTagsService,
    private readonly users: UsersService,
  ) {
    super(orgs);
  }

  async getOrganization(organizationId: string) {
    const organization = await this.getById(organizationId, {
      search: {
        expands: ['rAndDSites', 'otherLocations', 'adherent.userRoles.role'],
      },
    });
    return new OrganizationResponse(organization);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async createOrganization(payload: OrganizationRequest) {
    await this.checkEmail(payload.email);
    await this.checkPhone(payload.phone);

    const org = await this.create(
      omit(payload, ['rAndDSites', 'otherLocations']),
    );

    if (payload.rAndDSites?.length) {
      await Promise.all(
        map(payload.rAndDSites, (rAndDSite) =>
          this.rAndDSitesTags.create({
            organizationId: org.id,
            name: rAndDSite.name,
          }),
        ),
      );
    }

    if (payload.otherLocations?.length) {
      await Promise.all(
        map(payload.otherLocations, (otherLocation) =>
          this.otherLocationsTags.create({
            organizationId: org.id,
            name: otherLocation.name,
          }),
        ),
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
      search: { expands: ['rAndDSites', 'otherLocations'] },
    });

    await this.updateById(
      organizationId,
      omit(payload, ['rAndDSites', 'otherLocations']),
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

    const updatedOrganization = await this.getById(organizationId, {
      search: { expands: ['rAndDSites', 'otherLocations'] },
    });

    return new OrganizationResponse(updatedOrganization);
  }

  async checkEmail(email?: string, id?: string) {
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

  async checkPhone(phone?: string, id?: string) {
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
}
