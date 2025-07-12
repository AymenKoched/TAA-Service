import { Injectable } from '@nestjs/common';
import { map, omit } from 'lodash';
import { FindOptionsWhere } from 'typeorm';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AuthErrors,
  CrudService,
  SearchQuery,
  UsersSearchFilter,
} from '../../common';
import { Admin, Client } from '../../entities';
import { ClientsRepository } from '../../repositories';
import { UserRolesService } from '../roles';
import { UserSubscriptionsService } from './user-subscriptions.service';
import { UserTokensService } from './user-tokens.service';

@Injectable()
export class ClientsService extends CrudService<Client> {
  protected notFoundErrorKey = AuthErrors.UserNotFound;
  protected notFoundErrorMessage = 'The searched user is not found';

  constructor(
    private clients: ClientsRepository,
    private readonly userRoles: UserRolesService,
    private readonly tokens: UserTokensService,
    private readonly userSubscriptions: UserSubscriptionsService,
  ) {
    super(clients);
  }

  async search(filters: UsersSearchFilter) {
    const conditions = [
      new UsersSearchFilter({
        ...omit(filters, 'query'),
        ...(SearchQuery.getQuery(filters) && {
          name: SearchQuery.getQuery(filters),
        }),
      }),
    ];

    const criteria: FindOptionsWhere<Admin> = {};

    return this.clients.search(conditions, criteria);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async deleteClient(clientId: string) {
    const client = await this.getById(clientId, {
      search: { expands: ['userRoles', 'tokens', 'subscriptions'] },
    });

    const userRolesIds = map(client.userRoles, 'id');
    await this.userRoles.deleteByIds(userRolesIds);

    const tokensIds = map(client.tokens, 'id');
    await this.tokens.deleteByIds(tokensIds);

    const subscriptionsIds = map(client.subscriptions, 'id');
    await this.userSubscriptions.deleteByIds(subscriptionsIds);

    await this.deleteById(clientId);
  }
}
