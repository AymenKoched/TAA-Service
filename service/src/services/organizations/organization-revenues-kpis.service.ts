import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationRevenueKpi } from '../../entities';
import { OrganizationRevenuesKpisRepository } from '../../repositories';

@Injectable()
export class OrganizationRevenuesKpisService extends CrudService<OrganizationRevenueKpi> {
  protected notFoundErrorKey = AuthErrors.OrganizationKpiNotFound;
  protected notFoundErrorMessage = 'The searched organization kpi is not found';

  constructor(
    private readonly organizationRevenuesKpis: OrganizationRevenuesKpisRepository,
  ) {
    super(organizationRevenuesKpis);
  }
}
