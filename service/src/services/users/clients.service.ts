import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { Client } from '../../entities';
import { ClientsRepository } from '../../repositories';

@Injectable()
export class ClientsService extends CrudService<Client> {
  protected notFoundErrorKey = AuthErrors.UserNotFound;
  protected notFoundErrorMessage = 'The searched user is not found';

  constructor(private clients: ClientsRepository) {
    super(clients);
  }
}
