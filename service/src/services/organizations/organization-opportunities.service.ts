import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationOpportunity } from '../../entities';
import { OrganizationOpportunitiesRepository } from '../../repositories';

@Injectable()
export class OrganizationOpportunitiesService extends CrudService<OrganizationOpportunity> {
  protected notFoundErrorKey = AuthErrors.OrganizationOpportunityNotFound;
  protected notFoundErrorMessage =
    'The searched organization opportunity is not found';

  constructor(private readonly myRepo: OrganizationOpportunitiesRepository) {
    super(myRepo);
  }
}
