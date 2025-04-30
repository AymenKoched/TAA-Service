import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationRAndDProject } from '../../entities';

@Injectable()
export class OrganizationRdProjectsRepository extends BaseRepository<OrganizationRAndDProject> {
  entityType = OrganizationRAndDProject;
}
