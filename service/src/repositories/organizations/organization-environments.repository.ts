import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationEnvironment } from '../../entities';

@Injectable()
export class OrganizationEnvironmentsRepository extends BaseRepository<OrganizationEnvironment> {
  entityType = OrganizationEnvironment;
}
