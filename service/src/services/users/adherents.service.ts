import { Injectable } from '@nestjs/common';

import {
  AdherentResponse,
  AuthErrors,
  CrudService,
  UpdateUserAdherenceRequest,
} from '../../common';
import { Adherent } from '../../entities';
import { AdherentsRepository } from '../../repositories';

@Injectable()
export class AdherentsService extends CrudService<Adherent> {
  protected notFoundErrorKey = AuthErrors.UserNotFound;
  protected notFoundErrorMessage = 'The searched user is not found';

  constructor(private adherents: AdherentsRepository) {
    super(adherents);
  }

  async updateAdherence(userId: string, payload: UpdateUserAdherenceRequest) {
    await this.updateById(userId, payload);
    const user = await this.getById(userId);

    return new AdherentResponse(user);
  }
}
