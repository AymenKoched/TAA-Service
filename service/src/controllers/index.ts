import { ActivitiesController } from './activities.controller';
import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { OrganizationsController } from './organizations.controller';
import { S3Controller } from './s3.controller';
import { SeedController } from './seed.controller';
import { UserDetailsController } from './user-details.controller';
import { UsersController } from './users.controller';

export * from './activities.controller';
export * from './app.controller';
export * from './auth.controller';
export * from './organizations.controller';
export * from './s3.controller';
export * from './seed.controller';
export * from './user-details.controller';
export * from './users.controller';

export const controllers = [
  AppController,
  SeedController,
  AuthController,
  UsersController,
  OrganizationsController,
  UserDetailsController,
  S3Controller,
  ActivitiesController,
];
