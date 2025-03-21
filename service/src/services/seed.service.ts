import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { isEqual } from 'lodash';

import {
  DEFAULT_SUPER_ADMIN_PASSWORD,
  RoleAccess,
  SALT_ROUNDS,
} from '../common';
import { Admin, Role, UserRole } from '../entities';
import {
  AdminsRepository,
  RolesRepository,
  UserRolesRepository,
} from '../repositories';

@Injectable()
export class SeedService {
  constructor(
    private readonly adminsRepository: AdminsRepository,
    private readonly userRolesRepository: UserRolesRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async seedSuperAdmin(): Promise<void> {
    const superAdminAccesses = [RoleAccess.SuperAdminAccess];

    let role = await this.rolesRepository.findOne({ name: 'SuperAdmin' });

    if (!role) {
      role = await this.rolesRepository.repo.save(
        new Role({ name: 'SuperAdmin', accesses: superAdminAccesses }),
      );
    } else if (!isEqual(role.accesses, superAdminAccesses)) {
      await this.rolesRepository.updateById(role.id, {
        accesses: superAdminAccesses,
      });
    }

    const userRole = (await this.userRolesRepository.search(
      {},
      { roleId: role.id },
    )) as UserRole[];

    if (!userRole || !userRole.length) {
      const password = await bcrypt.hash(
        DEFAULT_SUPER_ADMIN_PASSWORD,
        SALT_ROUNDS,
      );
      const admin = await this.adminsRepository.repo.save(
        new Admin({
          email: 'taa.admin@yopmail.com',
          password,
          name: 'SuperAdmin',
          inscriptionDate: new Date(),
        }),
      );

      await this.userRolesRepository.repo.save(
        new UserRole({
          userId: admin.id,
          roleId: role.id,
        }),
      );
    }
  }
}
