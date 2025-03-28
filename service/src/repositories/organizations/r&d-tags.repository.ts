import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { RAndDSiteTag } from '../../entities';

@Injectable()
export class RDTagsRepository extends BaseRepository<RAndDSiteTag> {
  entityType = RAndDSiteTag;
}
