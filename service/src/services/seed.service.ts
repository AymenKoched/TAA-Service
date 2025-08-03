import { Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { map } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  ADHERENT_ROLE_NAME,
  AdherentAccessList,
  DEFAULT_SUPER_ADMIN_EMAIL,
  DEFAULT_SUPER_ADMIN_PASSWORD,
  PremiumSubscription,
  RoleAccess,
  SALT_ROUNDS,
  StandardSubscription,
  SUBSCRIPTION_PREMIUM,
  SUBSCRIPTION_STANDARD,
  UserRolesSearchFilter,
  UserType,
} from '../common';
import { UserRole } from '../entities';
import { ActivitiesService } from './organizations';
import { RolesService, UserRolesService } from './roles';
import { AdminsService, SubscriptionsService } from './users';

const logger = new Logger('Seed');

@Injectable()
export class SeedService {
  constructor(
    private readonly admins: AdminsService,
    private readonly userRoles: UserRolesService,
    private readonly roles: RolesService,
    private readonly activities: ActivitiesService,
    private readonly subscriptions: SubscriptionsService,
  ) {}

  @Transactional({ propagation: Propagation.REQUIRED })
  async seedSuperAdmin(): Promise<void> {
    logger.log('super admin seed started.');

    const superAdminAccesses = [RoleAccess.SuperAdminAccess];

    let role = await this.roles.findOne(
      { name: 'SuperAdmin' },
      { silent: true },
    );

    if (!role) {
      role = await this.roles.create({
        name: 'SuperAdmin',
        accesses: superAdminAccesses,
        isAdminRole: true,
      });
    } else {
      await this.roles.updateById(role.id, {
        accesses: superAdminAccesses,
        isAdminRole: true,
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

    const adherentRole = await this.roles.findOne(
      { name: ADHERENT_ROLE_NAME },
      { silent: true },
    );
    if (adherentRole) {
      await this.roles.updateById(adherentRole.id, {
        accesses: AdherentAccessList,
      });
    } else {
      await this.roles.create({
        name: ADHERENT_ROLE_NAME,
        accesses: AdherentAccessList,
      });
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
        if (!activity) {
          await this.activities.create({ name: activityName });
        }
      }),
    );
    logger.log('activities seed ended.');
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async seedSubscriptions(): Promise<void> {
    logger.log('subscriptions seed started.');

    const premiumSubscription = await this.subscriptions.findOne(
      { name: SUBSCRIPTION_PREMIUM },
      { silent: true },
    );
    if (!premiumSubscription) {
      await this.subscriptions.create({
        name: SUBSCRIPTION_PREMIUM,
        organizationHiddenFields: PremiumSubscription,
      });
    } else {
      await this.subscriptions.updateById(premiumSubscription.id, {
        organizationHiddenFields: PremiumSubscription,
      });
    }

    const standardSubscription = await this.subscriptions.findOne(
      { name: SUBSCRIPTION_STANDARD },
      { silent: true },
    );
    if (!standardSubscription) {
      await this.subscriptions.create({
        name: SUBSCRIPTION_STANDARD,
        organizationHiddenFields: StandardSubscription,
      });
    } else {
      await this.subscriptions.updateById(standardSubscription.id, {
        organizationHiddenFields: StandardSubscription,
      });
    }

    logger.log('subscriptions seed ended.');
  }
}
