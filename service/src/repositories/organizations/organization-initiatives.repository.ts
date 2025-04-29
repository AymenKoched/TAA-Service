import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationInitiative } from '../../entities';

@Injectable()
export class OrganizationInitiativesRepository extends BaseRepository<OrganizationInitiative> {
  entityType = OrganizationInitiative;
}
