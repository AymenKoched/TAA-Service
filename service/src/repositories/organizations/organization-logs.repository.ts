import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { Log } from '../../entities';

@Injectable()
export class OrganizationLogsRepository extends BaseRepository<Log> {
  entityType = Log;
}
