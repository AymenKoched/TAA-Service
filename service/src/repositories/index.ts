import { AdherentsRepository } from './adherents.repository';
import { AdminsRepository } from './admins.repository';
import { ClientsRepository } from './clients.repository';
import { RolesRepository } from './roles.repository';
import { UserRolesRepository } from './user-roles.repository';

export * from './adherents.repository';
export * from './admins.repository';
export * from './clients.repository';
export * from './roles.repository';
export * from './user-roles.repository';

export const repositories = [
  AdminsRepository,
  ClientsRepository,
  AdherentsRepository,
  RolesRepository,
  UserRolesRepository,
];
