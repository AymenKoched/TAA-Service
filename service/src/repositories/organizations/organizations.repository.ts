import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { Organization } from '../../entities';

@Injectable()
export class OrganizationsRepository extends BaseRepository<Organization> {
  entityType = Organization;
}
