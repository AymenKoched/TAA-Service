import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationEmployeeKpi } from '../../entities';
import { OrganizationEmployeeKpiRepository } from '../../repositories';

@Injectable()
export class OrganizationEmployeeKpiService extends CrudService<OrganizationEmployeeKpi> {
  protected notFoundErrorKey = AuthErrors.OrganizationKpiNotFound;
  protected notFoundErrorMessage = 'The searched organization kpi is not found';

  constructor(
    private readonly organizationEmployeeKpis: OrganizationEmployeeKpiRepository,
  ) {
    super(organizationEmployeeKpis);
  }
}
