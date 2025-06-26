import { Injectable } from '@nestjs/common';

import {
  AuthErrors,
  CrudService,
  UserReclamationStateRequest,
  UserReclamationUpdateRequest,
  UserResponse,
} from '../../common';
import { UserReclamation } from '../../entities';
import { UserReclamationsRepository } from '../../repositories';

@Injectable()
export class UserReclamationsService extends CrudService<UserReclamation> {
  protected notFoundErrorKey = AuthErrors.UserReclamationNotFound;
  protected notFoundErrorMessage = 'The searched user reclamation is not found';

  constructor(private myRepo: UserReclamationsRepository) {
    super(myRepo);
  }

  async updateReclamation(
    user: UserResponse,
    reclamationId: string,
    payload: UserReclamationUpdateRequest,
  ) {
    await this.findOne({
      id: reclamationId,
      adherentId: user.id,
    });

    await this.updateById(reclamationId, payload);

    return this.getById(reclamationId);
  }

  async changeState(
    reclamationId: string,
    payload: UserReclamationStateRequest,
  ) {
    await this.updateById(reclamationId, payload);
    return this.getById(reclamationId);
  }
}
