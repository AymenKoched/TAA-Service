import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationAgeKpi } from '../../entities';
import { OrganizationAgesKpisRepository } from '../../repositories';

@Injectable()
export class OrganizationAgesKpisService extends CrudService<OrganizationAgeKpi> {
  protected notFoundErrorKey = AuthErrors.OrganizationKpiNotFound;
  protected notFoundErrorMessage = 'The searched organization kpi is not found';

  constructor(
    private readonly organizationAgesKpis: OrganizationAgesKpisRepository,
  ) {
    super(organizationAgesKpis);
  }
}
