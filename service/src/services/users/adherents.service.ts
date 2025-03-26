import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { Adherent } from '../../entities';
import { AdherentsRepository } from '../../repositories';

@Injectable()
export class AdherentsService extends CrudService<Adherent> {
  protected notFoundErrorKey = AuthErrors.UserNotFound;
  protected notFoundErrorMessage = 'The searched user is not found';

  constructor(private adherents: AdherentsRepository) {
    super(adherents);
  }
}
