import { Module } from '@nestjs/common';

import { BaseModule, getDatabaseModule } from './common';
import { conf } from './configuration';
import { controllers } from './controllers';
import { services } from './services';

@Module({
  imports: [getDatabaseModule(conf.database)],
  controllers: [...controllers],
  providers: [...services],
})
export class AppModule extends BaseModule {
  constructor() {
    super(conf);
  }
}
