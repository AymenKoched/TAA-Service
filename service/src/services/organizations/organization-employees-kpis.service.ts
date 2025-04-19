import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationEmployeeKpi } from '../../entities';
import { OrganizationEmployeesKpisRepository } from '../../repositories';

@Injectable()
export class OrganizationEmployeesKpisService extends CrudService<OrganizationEmployeeKpi> {
  protected notFoundErrorKey = AuthErrors.OrganizationKpiNotFound;
  protected notFoundErrorMessage = 'The searched organization kpi is not found';

  constructor(
    private readonly organizationEmployeesKpis: OrganizationEmployeesKpisRepository,
  ) {
    super(organizationEmployeesKpis);
  }
}
