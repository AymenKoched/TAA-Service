import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationWasteDistribution } from '../../entities';
import { OrganizationWasteDistributionsRepository } from '../../repositories';

@Injectable()
export class OrganizationWasteDistributionsService extends CrudService<OrganizationWasteDistribution> {
  protected notFoundErrorKey = AuthErrors.OrganizationWasteDistributionNotFound;
  protected notFoundErrorMessage =
    'The searched organization waste distribution is not found';

  constructor(
    private readonly myRepo: OrganizationWasteDistributionsRepository,
  ) {
    super(myRepo);
  }
}
