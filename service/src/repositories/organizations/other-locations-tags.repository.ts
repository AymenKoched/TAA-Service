import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OtherLocationsTag } from '../../entities';

@Injectable()
export class OtherLocationsTagsRepository extends BaseRepository<OtherLocationsTag> {
  entityType = OtherLocationsTag;
}
