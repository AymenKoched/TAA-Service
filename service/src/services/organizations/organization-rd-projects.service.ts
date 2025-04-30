import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationRAndDProject } from '../../entities';
import { OrganizationRdProjectsRepository } from '../../repositories';

@Injectable()
export class OrganizationRdProjectsService extends CrudService<OrganizationRAndDProject> {
  protected notFoundErrorKey = AuthErrors.OrganizationRDProjectNotFound;
  protected notFoundErrorMessage =
    'The searched organization rd project is not found';

  constructor(private readonly myRepo: OrganizationRdProjectsRepository) {
    super(myRepo);
  }
}
