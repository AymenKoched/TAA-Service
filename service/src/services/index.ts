import { AppService } from './app.service';
import { AuthService } from './auth';
import { MailerService } from './mailer.service';
import {
  ActivitiesService,
  OrganizationActivitiesService,
  OrganizationContractsService,
  OrganizationEmployeesKpisService,
  OrganizationSitesService,
  OrganizationsService,
  OrganizationTagsService,
  ProductsService,
} from './organizations';
import { RolesService, UserRolesService } from './roles';
import { SeedService } from './seed.service';
import {
  AdherentsService,
  AdminsService,
  ClientsService,
  UsersService,
  UserTokensService,
} from './users';

export * from './app.service';
export * from './auth';
export * from './mailer.service';
export * from './organizations';
export * from './roles';
export * from './seed.service';
export * from './users';

export const services = [
  AppService,
  SeedService,
  AuthService,
  UsersService,
  AdminsService,
  AdherentsService,
  ClientsService,
  UserRolesService,
  RolesService,
  MailerService,
  UserTokensService,
  OrganizationsService,
  OrganizationTagsService,
  ProductsService,
  ActivitiesService,
  OrganizationActivitiesService,
  OrganizationSitesService,
  OrganizationEmployeesKpisService,
  OrganizationContractsService,
];
