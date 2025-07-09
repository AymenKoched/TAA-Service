import { Injectable } from '@nestjs/common';

import {
  AuthErrors,
  CrudService,
  UserReclamationState,
  UserReclamationStateRequest,
  UserReclamationUpdateRequest,
  UserResponse,
} from '../../common';
import { UserReclamation } from '../../entities';
import { UserReclamationsRepository } from '../../repositories';
import { AdherentsService } from './adherents.service';

@Injectable()
export class UserReclamationsService extends CrudService<UserReclamation> {
  protected notFoundErrorKey = AuthErrors.UserReclamationNotFound;
  protected notFoundErrorMessage = 'The searched user reclamation is not found';

  constructor(
    private myRepo: UserReclamationsRepository,
    private readonly adherents: AdherentsService,
  ) {
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

    const updatedReclamation = await this.getById(reclamationId);

    if (payload.state === UserReclamationState.Accepted) {
      const startDate = new Date(updatedReclamation.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + updatedReclamation.windowDays);

      await this.adherents.updateById(updatedReclamation.adherentId, {
        modificationStartDate: startDate,
        modificationEndDate: endDate,
        lastReclamationId: reclamationId,
      });
    }

    return updatedReclamation;
  }
}
