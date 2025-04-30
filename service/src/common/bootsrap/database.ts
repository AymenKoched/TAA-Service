import 'dotenv/config';

import { Logger, ServiceUnavailableException } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, MigrationExecutor } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import {
  addTransactionalDataSource,
  getDataSourceByName,
} from 'typeorm-transactional';
import { v4 as uuid } from 'uuid';

import { AppConfig } from '../../configuration';

const logger = new Logger('Database');

export type DatabaseConfiguration = MysqlConnectionOptions;

export async function runMigration(
  ormOptions: MysqlConnectionOptions,
): Promise<void> {
  const conn = await getDataSource(ormOptions, true);
  const queryRunner = conn.createQueryRunner();
  const executor = new MigrationExecutor(conn, queryRunner);
  await queryRunner.startTransaction();
  try {
    await executor.executePendingMigrations();
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await conn.destroy();
  }
}

export async function runDatabaseMigration(appConfig: AppConfig) {
  logger.log(`Database migration is starting...`);

  const database = appConfig.database;
  if (database) {
    try {
      await runMigration({
        ...database,
      });
      logger.log(`Database migration finished.`);
    } catch (e) {
      logger.error(`Database migration failed: ${e.message}!`);
      process.exit(1);
    }
  }
}

const dataSources: Map<string, DataSource> = new Map();

export async function getDataSource(
  conf: DatabaseConfiguration,
  newDataSource = false,
): Promise<DataSource> {
  const key = conf.host ?? '' + conf.database + !!newDataSource;

  if (dataSources.has(key) && !newDataSource) {
    const dataSource = dataSources.get(key);
    if (!dataSource?.isInitialized) {
      await dataSource?.initialize();
      if (!dataSource?.isInitialized) {
        throw new ServiceUnavailableException('Connection got disconnected?');
      }
    }
    return dataSource;
  }

  try {
    const dataSource = new DataSource({
      ...conf,
      name: newDataSource ? key + uuid() : key,
    });

    await dataSource.initialize();

    if (!dataSource.isInitialized) {
      throw new ServiceUnavailableException('Connection got disconnected?');
    }

    if (newDataSource) {
      return dataSource;
    }

    dataSources.set(key, dataSource);
    return dataSource;
  } catch (e) {
    dataSources.delete(key);
    throw e;
  }
}

export async function closeAllDataSources() {
  await Promise.all(
    Array.from(dataSources.values())
      .filter((dataSource) => dataSource.isInitialized)
      .map((dataSource) => dataSource.destroy()),
  );

  dataSources.clear();
}

export function getDatabaseModule(conf?: TypeOrmModuleOptions) {
  return TypeOrmModule.forRootAsync({
    useFactory: () => conf,
    dataSourceFactory: async (opts) => {
      if (!opts) {
        throw new Error(
          `Invalid options passed to init datasource ${JSON.stringify(opts)}`,
        );
      }

      return (
        getDataSourceByName('default') ||
        addTransactionalDataSource(new DataSource(opts))
      );
    },
  });
}
