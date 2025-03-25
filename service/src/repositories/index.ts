import { RolesRepository, UserRolesRepository } from './roles';
import {
  AdherentsRepository,
  AdminsRepository,
  ClientsRepository,
  TokensRepository,
  UsersRepository,
} from './users';

export * from './roles';
export * from './users';

export const repositories = [
  UsersRepository,
  AdminsRepository,
  ClientsRepository,
  AdherentsRepository,
  RolesRepository,
  UserRolesRepository,
  TokensRepository,
];
