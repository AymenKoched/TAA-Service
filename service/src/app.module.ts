import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { BaseModule, filters, getDatabaseModule, interceptors } from './common';
import { conf } from './configuration';
import { controllers } from './controllers';
import { guards } from './guards';
import { repositories } from './repositories';
import { services } from './services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    getDatabaseModule(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ ...conf.jwt, global: true }),
  ],
  controllers: [...controllers],
  providers: [
    ...services,
    ...repositories,
    ...guards,
    ...interceptors.map((interceptor) => ({
      provide: 'APP_INTERCEPTOR',
      useClass: interceptor,
    })),
    ...filters.map((filter) => ({
      provide: 'APP_FILTER',
      useClass: filter,
    })),
  ],
})
export class AppModule extends BaseModule {
  constructor() {
    super(conf);
  }
}
