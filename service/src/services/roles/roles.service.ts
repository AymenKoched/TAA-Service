import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { Role } from '../../entities';
import { RolesRepository } from '../../repositories';

@Injectable()
export class RolesService extends CrudService<Role> {
  protected notFoundErrorKey = AuthErrors.RoleNotFound;
  protected notFoundErrorMessage = 'The searched role is not found';

  constructor(private roles: RolesRepository) {
    super(roles);
  }
}
