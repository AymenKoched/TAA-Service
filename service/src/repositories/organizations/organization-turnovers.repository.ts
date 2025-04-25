import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationTurnover } from '../../entities';

@Injectable()
export class OrganizationTurnoversRepository extends BaseRepository<OrganizationTurnover> {
  entityType = OrganizationTurnover;
}
