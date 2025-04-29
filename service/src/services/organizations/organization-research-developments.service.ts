import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationResearchDevelopment } from '../../entities';
import { OrganizationResearchDevelopmentsRepository } from '../../repositories';

@Injectable()
export class OrganizationResearchDevelopmentsService extends CrudService<OrganizationResearchDevelopment> {
  protected notFoundErrorKey =
    AuthErrors.OrganizationResearchDevelopmentNotFound;
  protected notFoundErrorMessage =
    'The searched organization research development is not found';

  constructor(
    private readonly myRepo: OrganizationResearchDevelopmentsRepository,
  ) {
    super(myRepo);
  }
}
