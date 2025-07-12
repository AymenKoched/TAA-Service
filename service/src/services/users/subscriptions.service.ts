import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { Subscription } from '../../entities';
import { SubscriptionsRepository } from '../../repositories';

@Injectable()
export class SubscriptionsService extends CrudService<Subscription> {
  protected notFoundErrorKey = AuthErrors.SubscriptionNotFound;
  protected notFoundErrorMessage = 'The searched subscription is not found';

  constructor(private myRepo: SubscriptionsRepository) {
    super(myRepo);
  }
}
