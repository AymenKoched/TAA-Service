import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { Admin } from '../../entities';

@Injectable()
export class AdminsRepository extends BaseRepository<Admin> {
  entityType = Admin;
}
