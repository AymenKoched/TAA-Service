import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { ClientRequest } from '../../entities';

@Injectable()
export class ClientRequestsRepository extends BaseRepository<ClientRequest> {
  entityType = ClientRequest;
}
