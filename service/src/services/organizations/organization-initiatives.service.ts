import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationInitiative } from '../../entities';
import { OrganizationInitiativesRepository } from '../../repositories';

@Injectable()
export class OrganizationInitiativesService extends CrudService<OrganizationInitiative> {
  protected notFoundErrorKey = AuthErrors.OrganizationInitiativeNotFound;
  protected notFoundErrorMessage =
    'The searched organization initiative is not found';

  constructor(private readonly myRepo: OrganizationInitiativesRepository) {
    super(myRepo);
  }
}
