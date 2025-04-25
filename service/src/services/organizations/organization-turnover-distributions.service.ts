import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationTurnoverDistribution } from '../../entities';
import { OrganizationTurnoverDistributionsRepository } from '../../repositories';

@Injectable()
export class OrganizationTurnoverDistributionsService extends CrudService<OrganizationTurnoverDistribution> {
  protected notFoundErrorKey = AuthErrors.OrganizationKpiNotFound;
  protected notFoundErrorMessage = 'The searched organization kpi is not found';

  constructor(
    private readonly myRepo: OrganizationTurnoverDistributionsRepository,
  ) {
    super(myRepo);
  }
}
