import { Injectable } from '@nestjs/common';

import { BaseRepository, EntityConstructor } from '../common';
import { User } from '../entities';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  entityType = User as EntityConstructor<User>;
}
