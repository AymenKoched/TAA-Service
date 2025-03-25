import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { Adherent } from '../../entities';

@Injectable()
export class AdherentsRepository extends BaseRepository<Adherent> {
  entityType = Adherent;
}
