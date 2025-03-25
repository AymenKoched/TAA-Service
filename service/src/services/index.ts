import { AppService } from './app.service';
import { AuthService } from './auth';
import { MailerService } from './mailer.service';
import { RolesService, UserRolesService } from './roles';
import { SeedService } from './seed.service';
import {
  AdherentsService,
  AdminsService,
  ClientsService,
  TokensService,
  UsersService,
} from './users';

export * from './app.service';
export * from './auth';
export * from './mailer.service';
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
  TokensService,
];
