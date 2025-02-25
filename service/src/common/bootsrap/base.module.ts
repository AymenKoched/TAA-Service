import { OnModuleDestroy } from '@nestjs/common';

import { AppConfig } from '../../configuration';
import { closeAllDataSources } from './database';

export class BaseModule implements OnModuleDestroy {
  public conf: AppConfig;

  constructor(conf: AppConfig) {
    this.conf = conf;
  }

  async onModuleDestroy() {
    if (this.conf.database) {
      await closeAllDataSources();
    }
  }
}
