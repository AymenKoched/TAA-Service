import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { UserSubscription } from '../../entities';
import { UserSubscriptionsRepository } from '../../repositories';

@Injectable()
export class UserSubscriptionsService extends CrudService<UserSubscription> {
  protected notFoundErrorKey = AuthErrors.UserSubscriptionNotFound;
  protected notFoundErrorMessage =
    'The searched user subscription is not found';

  constructor(private myRepo: UserSubscriptionsRepository) {
    super(myRepo);
  }
}
