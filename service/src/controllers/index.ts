import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { SeedController } from './seed.controller';

export * from './app.controller';
export * from './auth.controller';
export * from './seed.controller';

export const controllers = [AppController, SeedController, AuthController];
