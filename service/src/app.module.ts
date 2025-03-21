import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { BaseModule, getDatabaseModule, interceptors } from './common';
import { conf } from './configuration';
import { controllers } from './controllers';
import { guards } from './guards';
import { repositories } from './repositories';
import { services } from './services';

@Module({
  imports: [
    getDatabaseModule(conf.database),
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
  ],
})
export class AppModule extends BaseModule {
  constructor() {
    super(conf);
  }
}
