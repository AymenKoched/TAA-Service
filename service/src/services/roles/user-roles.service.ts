import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { UserRole } from '../../entities';
import { UserRolesRepository } from '../../repositories';

@Injectable()
export class UserRolesService extends CrudService<UserRole> {
  protected notFoundErrorKey = AuthErrors.UserRoleNotFound;
  protected notFoundErrorMessage = 'The searched user role is not found';

  constructor(private userRoles: UserRolesRepository) {
    super(userRoles);
  }
}
