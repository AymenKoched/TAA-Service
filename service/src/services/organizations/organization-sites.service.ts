import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationSite } from '../../entities';
import { OrganizationSitesRepository } from '../../repositories';

@Injectable()
export class OrganizationSitesService extends CrudService<OrganizationSite> {
  protected notFoundErrorKey = AuthErrors.OrganizationSiteNotFound;
  protected notFoundErrorMessage =
    'The searched organization site is not found';

  constructor(private readonly organizationSites: OrganizationSitesRepository) {
    super(organizationSites);
  }
}
