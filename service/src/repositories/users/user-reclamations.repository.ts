import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { UserReclamation } from '../../entities';

@Injectable()
export class UserReclamationsRepository extends BaseRepository<UserReclamation> {
  entityType = UserReclamation;
}
