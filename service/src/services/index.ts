import { AppService } from './app.service';
import { AuthService } from './auth';
import { MailerService } from './mailer.service';
import {
  ActivitiesService,
  CountriesParticipationService,
  OrganizationActivitiesService,
  OrganizationAgesKpisService,
  OrganizationAttributesService,
  OrganizationClientsService,
  OrganizationContractsService,
  OrganizationEmployeesKpisService,
  OrganizationEnvironmentsService,
  OrganizationFormationsService,
  OrganizationImportService,
  OrganizationInitiativesService,
  OrganizationLogsService,
  OrganizationOpportunitiesService,
  OrganizationQuestionsService,
  OrganizationRdProjectsService,
  OrganizationResearchDevelopmentsService,
  OrganizationRevenuesKpisService,
  OrganizationSitesService,
  OrganizationsService,
  OrganizationTagsService,
  OrganizationTurnoverDistributionsService,
  OrganizationTurnoversService,
  OrganizationViewsService,
  OrganizationWasteDistributionsService,
  ProductsService,
} from './organizations';
import { RolesService, UserRolesService } from './roles';
import { S3Service } from './s3.service';
import { SeedService } from './seed.service';
import {
  AdherentsService,
  AdminsService,
  ClientsService,
  UserReclamationsService,
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
  OrganizationRevenuesKpisService,
  OrganizationAgesKpisService,
  OrganizationFormationsService,
  OrganizationTurnoverDistributionsService,
  OrganizationClientsService,
  OrganizationTurnoversService,
  CountriesParticipationService,
  OrganizationAttributesService,
  OrganizationResearchDevelopmentsService,
  OrganizationRdProjectsService,
  OrganizationInitiativesService,
  OrganizationEnvironmentsService,
  OrganizationWasteDistributionsService,
  OrganizationQuestionsService,
  OrganizationOpportunitiesService,
  S3Service,
  OrganizationViewsService,
  OrganizationImportService,
  UserReclamationsService,
  OrganizationLogsService,
];
