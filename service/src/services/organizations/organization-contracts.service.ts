import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationContract } from '../../entities';
import { OrganizationContractsRepository } from '../../repositories';

@Injectable()
export class OrganizationContractsService extends CrudService<OrganizationContract> {
  protected notFoundErrorKey = AuthErrors.OrganizationContractNotFound;
  protected notFoundErrorMessage =
    'The searched organization contract is not found';

  constructor(
    private readonly organizationContracts: OrganizationContractsRepository,
  ) {
    super(organizationContracts);
  }
}
