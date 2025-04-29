import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationAttribute } from '../../entities';
import { OrganizationAttributesRepository } from '../../repositories';

@Injectable()
export class OrganizationAttributesService extends CrudService<OrganizationAttribute> {
  protected notFoundErrorKey = AuthErrors.OrganizationAttributeNotFound;
  protected notFoundErrorMessage =
    'The searched organization attribute is not found';

  constructor(private readonly myRepo: OrganizationAttributesRepository) {
    super(myRepo);
  }
}
