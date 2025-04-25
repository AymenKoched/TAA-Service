import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { CountryParticipation } from '../../entities';

@Injectable()
export class CountriesParticipationRepository extends BaseRepository<CountryParticipation> {
  entityType = CountryParticipation;
}
