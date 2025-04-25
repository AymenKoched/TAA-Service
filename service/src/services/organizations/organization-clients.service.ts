import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationClient } from '../../entities';
import { OrganizationClientsRepository } from '../../repositories';

@Injectable()
export class OrganizationClientsService extends CrudService<OrganizationClient> {
  protected notFoundErrorKey = AuthErrors.OrganizationKpiNotFound;
  protected notFoundErrorMessage = 'The searched organization kpi is not found';

  constructor(private readonly myRepo: OrganizationClientsRepository) {
    super(myRepo);
  }
}
