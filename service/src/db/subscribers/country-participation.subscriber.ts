import { Injectable } from '@nestjs/common';

import { CountryParticipation } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class CountryParticipationSubscriber extends BaseReclamationSubscriber<CountryParticipation> {
  protected readonly entityCtor = CountryParticipation;
  protected readonly entityName = CountryParticipation.name;
}
