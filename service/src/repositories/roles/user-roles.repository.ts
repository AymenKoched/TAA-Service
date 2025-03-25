import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { UserRole } from '../../entities';

@Injectable()
export class UserRolesRepository extends BaseRepository<UserRole> {
  entityType = UserRole;
}
