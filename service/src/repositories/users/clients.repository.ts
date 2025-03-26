import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { Client } from '../../entities';

@Injectable()
export class ClientsRepository extends BaseRepository<Client> {
  entityType = Client;
}
