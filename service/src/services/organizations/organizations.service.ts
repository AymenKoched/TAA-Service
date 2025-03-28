import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AuthErrors,
  CrudService,
  OrganizationRequest,
  OrganizationResponse,
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

  @Transactional({ propagation: Propagation.REQUIRED })
  async createOrganization(payload: OrganizationRequest) {
    const org = await this.create(
      omit(payload, ['rAndDSites', 'otherLocations']),
    );

    if (payload.rAndDSites?.length) {
      await Promise.all(
        payload.rAndDSites.map((rAndDSite) =>
          this.rAndDSitesTags.create({
            organizationId: org.id,
            name: rAndDSite.name,
          }),
        ),
      );
    }

    if (payload.otherLocations?.length) {
      await Promise.all(
        payload.otherLocations.map((otherLocation) =>
          this.otherLocationsTags.create({
            organizationId: org.id,
            name: otherLocation.name,
          }),
        ),
      );
    }

    await this.users.createUser({
      name: org.email.split('@')[0],
      email: org.email,
      type: UserType.Adherent,
      organizationId: org.id,
    });

    return new OrganizationResponse(org);
  }

  async getOrganization(organizationId: string): Promise<OrganizationResponse> {
    return new OrganizationResponse(
      await this.getById(organizationId, {
        search: { expands: ['rAndDSites', 'otherLocations', 'adherent'] },
      }),
    );
  }
}
