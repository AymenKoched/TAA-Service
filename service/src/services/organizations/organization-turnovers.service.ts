import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationTurnover } from '../../entities';
import { OrganizationTurnoversRepository } from '../../repositories';

@Injectable()
export class OrganizationTurnoversService extends CrudService<OrganizationTurnover> {
  protected notFoundErrorKey = AuthErrors.OrganizationKpiNotFound;
  protected notFoundErrorMessage = 'The searched organization kpi is not found';

  constructor(private readonly myRepo: OrganizationTurnoversRepository) {
    super(myRepo);
  }
}
