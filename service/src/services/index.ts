import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { SeedService } from './seed.service';
import { UsersService } from './users.service';

export * from './app.service';
export * from './auth.service';
export * from './seed.service';
export * from './users.service';

export const services = [AppService, SeedService, AuthService, UsersService];
