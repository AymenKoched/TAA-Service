import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationFormationKpi } from '../../entities';
import { OrganizationFormationsRepository } from '../../repositories';

@Injectable()
export class OrganizationFormationsService extends CrudService<OrganizationFormationKpi> {
  protected notFoundErrorKey = AuthErrors.OrganizationFormationNotFound;
  protected notFoundErrorMessage =
    'The searched organization formation is not found';

  constructor(private readonly myRepo: OrganizationFormationsRepository) {
    super(myRepo);
  }
}
