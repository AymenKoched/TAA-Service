import { Module } from '@nestjs/common';

import { getDatabaseModule } from './common';
import { conf } from './configuration';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [getDatabaseModule(conf.database)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
