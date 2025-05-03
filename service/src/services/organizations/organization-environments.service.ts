import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationEnvironment } from '../../entities';
import { OrganizationEnvironmentsRepository } from '../../repositories';

@Injectable()
export class OrganizationEnvironmentsService extends CrudService<OrganizationEnvironment> {
  protected notFoundErrorKey = AuthErrors.OrganizationEnvironmentNotFound;
  protected notFoundErrorMessage =
    'The searched organization environment is not found';

  constructor(private readonly myRepo: OrganizationEnvironmentsRepository) {
    super(myRepo);
  }
}
