import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { Subscription } from '../../entities';

@Injectable()
export class SubscriptionsRepository extends BaseRepository<Subscription> {
  entityType = Subscription;
}
