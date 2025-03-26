import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { Role } from '../../entities';

@Injectable()
export class RolesRepository extends BaseRepository<Role> {
  entityType = Role;
}
