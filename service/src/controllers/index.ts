import { AppController } from './app.controller';
import { SeedController } from './seed.controller';

export * from './app.controller';
export * from './seed.controller';

export const controllers = [AppController, SeedController];
