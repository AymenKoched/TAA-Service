import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationClient } from '../../entities';

@Injectable()
export class OrganizationClientsRepository extends BaseRepository<OrganizationClient> {
  entityType = OrganizationClient;
}
