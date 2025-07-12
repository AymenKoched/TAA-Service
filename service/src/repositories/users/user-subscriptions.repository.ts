import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { UserSubscription } from '../../entities';

@Injectable()
export class UserSubscriptionsRepository extends BaseRepository<UserSubscription> {
  entityType = UserSubscription;
}
