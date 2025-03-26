import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { Admin } from '../../entities';
import { AdminsRepository } from '../../repositories';

@Injectable()
export class AdminsService extends CrudService<Admin> {
  protected notFoundErrorKey = AuthErrors.UserNotFound;
  protected notFoundErrorMessage = 'The searched user is not found';

  constructor(private admins: AdminsRepository) {
    super(admins);
  }
}
