import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { SeedController } from './seed.controller';
import { UsersController } from './users.controller';

export * from './app.controller';
export * from './auth.controller';
export * from './seed.controller';
export * from './users.controller';

export const controllers = [
  AppController,
  SeedController,
  AuthController,
  UsersController,
];
