import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationAttribute } from '../../entities';

@Injectable()
export class OrganizationAttributesRepository extends BaseRepository<OrganizationAttribute> {
  entityType = OrganizationAttribute;
}
