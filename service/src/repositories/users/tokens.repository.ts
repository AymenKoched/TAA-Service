import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { Token } from '../../entities';

@Injectable()
export class TokensRepository extends BaseRepository<Token> {
  entityType = Token;
}
