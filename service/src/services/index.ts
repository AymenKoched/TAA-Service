import { AppService } from './app.service';
import { SeedService } from './seed.service';

export * from './app.service';
export * from './seed.service';

export const services = [AppService, SeedService];
