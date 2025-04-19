import {
  ActivitiesRepository,
  OrganizationActivitiesRepository,
  OrganizationAgesKpisRepository,
  OrganizationContractsRepository,
  OrganizationEmployeesKpisRepository,
  OrganizationRevenuesKpisRepository,
  OrganizationSitesRepository,
  OrganizationsRepository,
  OrganizationTagsRepository,
  ProductsRepository,
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
  OrganizationTagsRepository,
  ProductsRepository,
  ActivitiesRepository,
  OrganizationActivitiesRepository,
  OrganizationSitesRepository,
  OrganizationEmployeesKpisRepository,
  OrganizationContractsRepository,
  OrganizationRevenuesKpisRepository,
  OrganizationAgesKpisRepository,
];
