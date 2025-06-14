import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationView } from '../../entities';
import { OrganizationViewsRepository } from '../../repositories';

@Injectable()
export class OrganizationViewsService extends CrudService<OrganizationView> {
  protected notFoundErrorKey = AuthErrors.OrganizationViewNotFound;
  protected notFoundErrorMessage =
    'The searched organization view is not found';

  constructor(private readonly myRepo: OrganizationViewsRepository) {
    super(myRepo);
  }
}
