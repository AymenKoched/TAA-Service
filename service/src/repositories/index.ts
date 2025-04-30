import {
  ActivitiesRepository,
  CountriesParticipationRepository,
  OrganizationActivitiesRepository,
  OrganizationAgesKpisRepository,
  OrganizationAttributesRepository,
  OrganizationClientsRepository,
  OrganizationContractsRepository,
  OrganizationEmployeesKpisRepository,
  OrganizationFormationsRepository,
  OrganizationInitiativesRepository,
  OrganizationRdProjectsRepository,
  OrganizationResearchDevelopmentsRepository,
  OrganizationRevenuesKpisRepository,
  OrganizationSitesRepository,
  OrganizationsRepository,
  OrganizationTagsRepository,
  OrganizationTurnoverDistributionsRepository,
  OrganizationTurnoversRepository,
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
  OrganizationFormationsRepository,
  OrganizationTurnoverDistributionsRepository,
  OrganizationClientsRepository,
  OrganizationTurnoversRepository,
  CountriesParticipationRepository,
  OrganizationAttributesRepository,
  OrganizationResearchDevelopmentsRepository,
  OrganizationRdProjectsRepository,
  OrganizationInitiativesRepository,
];
