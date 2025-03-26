import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { UserToken } from '../../entities';

@Injectable()
export class UserTokensRepository extends BaseRepository<UserToken> {
  entityType = UserToken;
}
