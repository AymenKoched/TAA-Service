import { Injectable } from '@nestjs/common';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AcceptSubscriptionRequest,
  AuthErrors,
  CrudService,
  UserResponse,
  UserType,
} from '../../common';
import { ClientRequest } from '../../entities';
import { ClientRequestsRepository } from '../../repositories';
import { SubscriptionsService } from './subscriptions.service';
import { UserSubscriptionsService } from './user-subscriptions.service';
import { UsersService } from './users.service';

@Injectable()
export class ClientRequestsService extends CrudService<ClientRequest> {
  protected notFoundErrorKey = AuthErrors.ClientRequestNotFound;
  protected notFoundErrorMessage = 'The searched client request is not found';

  constructor(
    private myRepo: ClientRequestsRepository,
    private readonly users: UsersService,
    private readonly subscriptions: SubscriptionsService,
    private readonly userSubscriptions: UserSubscriptionsService,
  ) {
    super(myRepo);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async acceptRequest(requestId: string, payload: AcceptSubscriptionRequest) {
    const request = await this.getById(requestId);

    const clientData = await this.users.findOne(
      { email: request.email },
      { silent: true },
    );

    let client = new UserResponse(clientData);

    if (!client) {
      client = await this.users.createUser({
        name: request.name,
        email: request.email,
        phone: request?.phone,
        location: request?.location,
        type: UserType.Client,
      });
    }

    const subscription = await this.subscriptions.getById(
      request.subscriptionId,
    );

    const now = new Date();

    await this.userSubscriptions.create({
      clientId: client.id,
      subscriptionId: subscription.id,
      activationDate: payload?.activationDate ?? now,
      durationDays: payload.durationDays,
    });

    await this.deleteById(requestId);
  }
}
