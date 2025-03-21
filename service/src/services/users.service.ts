import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../common';
import { User } from '../entities';
import { UsersRepository } from '../repositories';

@Injectable()
export class UsersService extends CrudService<User> {
  protected notFoundErrorKey = AuthErrors.UserNotFound;
  protected notFoundErrorMessage = 'The searched user is not found';

  constructor(private users: UsersRepository) {
    super(users);
  }
}
