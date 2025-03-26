import { MiddlewareConsumer, OnModuleDestroy } from '@nestjs/common';

import { AppConfig } from '../../configuration';
import { ContextMiddleware } from '../middlewares';
import { closeAllDataSources } from './database';

export class BaseModule implements OnModuleDestroy {
  public conf: AppConfig;

  constructor(conf: AppConfig) {
    this.conf = conf;
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }

  async onModuleDestroy() {
    if (this.conf.database) {
      await closeAllDataSources();
    }
  }
}
