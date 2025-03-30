import { Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { isEqual, map } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  DEFAULT_SUPER_ADMIN_EMAIL,
  DEFAULT_SUPER_ADMIN_PASSWORD,
  RoleAccess,
  SALT_ROUNDS,
  UserRolesSearchFilter,
  UserType,
} from '../common';
import { UserRole } from '../entities';
import { ActivitiesService } from './organizations';
import { RolesService, UserRolesService } from './roles';
import { AdminsService } from './users';

const logger = new Logger('Seed');

@Injectable()
export class SeedService {
  constructor(
    private readonly admins: AdminsService,
    private readonly userRoles: UserRolesService,
    private readonly roles: RolesService,
    private readonly activities: ActivitiesService,
  ) {}

  @Transactional({ propagation: Propagation.REQUIRED })
  async seedSuperAdmin(): Promise<void> {
    logger.log('super admin seed started.');

    const superAdminAccesses = [RoleAccess.SuperAdminAccess];

    let role = await this.roles.findOne(
      { name: 'super_admin' },
      { silent: true },
    );

    if (!role) {
      role = await this.roles.create({
        name: 'SuperAdmin',
        accesses: superAdminAccesses,
      });
    } else if (!isEqual(role.accesses, superAdminAccesses)) {
      await this.roles.updateById(role.id, {
        accesses: superAdminAccesses,
      });
    }

    const userRoles = (await this.userRoles.search(
      new UserRolesSearchFilter({
        roleId: role.id,
      }),
    )) as UserRole[];

    if (!userRoles || !userRoles.length) {
      const password = await bcrypt.hash(
        DEFAULT_SUPER_ADMIN_PASSWORD,
        SALT_ROUNDS,
      );
      const admin = await this.admins.create({
        email: DEFAULT_SUPER_ADMIN_EMAIL,
        password,
        name: 'SuperAdmin',
        inscriptionDate: new Date(),
        userType: UserType.Admin,
      });

      await this.userRoles.create({
        userId: admin.id,
        roleId: role.id,
      });
    }

    logger.log('super admin seed ended.');
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async seedRoles(): Promise<void> {
    logger.log('roles seed started.');

    const roleNames = Object.values(RoleAccess);

    if (roleNames.length) {
      await Promise.all(
        map(roleNames, async (roleName) => {
          const existingRole = await this.roles.findOne(
            {
              name: roleName as string,
            },
            { silent: true },
          );
          if (!existingRole) {
            await this.roles.create({
              name: roleName as string,
              accesses: [roleName as RoleAccess],
            });
          }
        }),
      );
    }

    logger.log('roles seed ended.');
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async seedActivities(): Promise<void> {
    logger.log('activities seed started.');

    const activityNames = [
      'Design et développement du véhicule: Electrical wiring & harness',
      'Design et développement du véhicule: Refurbishing',
      'Design et développement du véhicule: Plastics & Rubber',
      'Pièces et composants',
      'Systèmes modules',
      'Intégration des systèmes et assemblage final',
      'Autre',
    ];

    await Promise.all(
      map(activityNames, async (activityName) => {
        const activity = await this.activities.findOne(
          { name: activityName },
          { silent: true },
        );
        console.log({ activity });
        if (!activity) {
          await this.activities.create({ name: activityName });
        }
      }),
    );
    logger.log('activities seed ended.');
  }
}
