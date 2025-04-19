import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationFormationKpi } from '../../entities/organization-formation-kpi.entity';
import { OrganizationFormationsRepository } from '../../repositories';

@Injectable()
export class OrganizationFormationsService extends CrudService<OrganizationFormationKpi> {
  protected notFoundErrorKey = AuthErrors.OrganizationFormationNotFound;
  protected notFoundErrorMessage =
    'The searched organization formation is not found';

  constructor(
    private readonly organizationFormationsRepository: OrganizationFormationsRepository,
  ) {
    super(organizationFormationsRepository);
  }
}
