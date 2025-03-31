import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationTag } from '../../entities';

@Injectable()
export class OrganizationTagsRepository extends BaseRepository<OrganizationTag> {
  entityType = OrganizationTag;
}
