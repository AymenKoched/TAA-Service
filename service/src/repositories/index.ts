import {
  ActivitiesRepository,
  OrganizationActivitiesRepository,
  OrganizationSitesRepository,
  OrganizationsRepository,
  OtherLocationsTagsRepository,
  ProductsRepository,
  RDTagsRepository,
} from './organizations';
import { RolesRepository, UserRolesRepository } from './roles';
import {
  AdherentsRepository,
  AdminsRepository,
  ClientsRepository,
  UsersRepository,
  UserTokensRepository,
} from './users';

export * from './organizations';
export * from './roles';
export * from './users';

export const repositories = [
  UsersRepository,
  AdminsRepository,
  ClientsRepository,
  AdherentsRepository,
  RolesRepository,
  UserRolesRepository,
  UserTokensRepository,
  OrganizationsRepository,
  RDTagsRepository,
  OtherLocationsTagsRepository,
  ProductsRepository,
  ActivitiesRepository,
  OrganizationActivitiesRepository,
  OrganizationSitesRepository,
];
