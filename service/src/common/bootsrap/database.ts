import { Logger, ServiceUnavailableException } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { DataSource, MigrationExecutor } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { v4 as uuid } from 'uuid';

import { AppConfig } from '../../configuration';

const logger = new Logger('Database');

export type DatabaseConfiguration = PostgresConnectionOptions;

export async function bootstrapDatabase(database: DatabaseConfiguration) {
  const WAIT_BEFORE_RESTART = 30; // seconds
  const MAX_DATABASE_RETRY = 10;
  let bootstrapDatabaseSuccess = false;

  logger.log('Bootstrapping database..');

  for (
    let tries = 0;
    !bootstrapDatabaseSuccess && tries < MAX_DATABASE_RETRY;
    tries += 1
  ) {
    try {
      await createDatabase({
        ...database,
      } as any);
      bootstrapDatabaseSuccess = true;
    } catch (e) {
      logger.error('Application cannot connect to the database.');
      logger.error(e);
      logger.warn(`Retry create database in ${WAIT_BEFORE_RESTART} seconds.`);
      await timer(WAIT_BEFORE_RESTART * 1000);
    }
  }
  if (!bootstrapDatabaseSuccess) {
    throw new Error('Application cannot connect to the database.');
  }
}

async function timer(time: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), time));
}

export async function createDatabase(
  ormOptions: PostgresConnectionOptions,
): Promise<void> {
  const dbConfig = {
    ...pick(
      ormOptions,
      'type',
      'host',
      'port',
      'username',
      'password',
      'ssl',
      'logging',
    ),
    database: 'postgres',
  };
  const conn = await getDataSource(dbConfig, true);

  try {
    const dbExists = await conn.query(
      `SELECT 1 FROM pg_database WHERE datname = '${ormOptions.database}'`,
    );
    if (!dbExists.length) {
      logger.log(`Creating '${ormOptions.database}' database...`);
      await conn.query(`CREATE DATABASE ${ormOptions.database}`);
      logger.log('Database created!');
    } else {
      logger.log('Database already exists.');
    }
  } finally {
    await conn.destroy();
  }

  if (ormOptions.migrationsRun && !!ormOptions.migrations) {
    await runMigration(ormOptions);
  }
}

export async function runMigration(
  ormOptions: PostgresConnectionOptions,
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

      return addTransactionalDataSource(new DataSource(opts));
    },
  });
}
