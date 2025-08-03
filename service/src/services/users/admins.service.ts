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
import { Admin } from '../../entities';
import { AdminsRepository } from '../../repositories';
import { UserRolesService } from '../roles';
import { UserTokensService } from './user-tokens.service';

@Injectable()
export class AdminsService extends CrudService<Admin> {
  protected notFoundErrorKey = AuthErrors.UserNotFound;
  protected notFoundErrorMessage = 'The searched user is not found';

  constructor(
    private admins: AdminsRepository,
    private readonly userRoles: UserRolesService,
    private readonly tokens: UserTokensService,
  ) {
    super(admins);
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

    return this.admins.search(conditions, criteria);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async deleteAdmin(adminId: string) {
    const admin = await this.getById(adminId, {
      search: { expands: ['userRoles', 'tokens'] },
    });

    const userRolesIds = map(admin.userRoles, 'id');
    await this.userRoles.deleteByIds(userRolesIds);

    const tokensIds = map(admin.tokens, 'id');
    await this.tokens.deleteByIds(tokensIds);

    await this.deleteById(adminId);
  }
}
