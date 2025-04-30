import 'dotenv/config';

import { Logger, ServiceUnavailableException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, MigrationExecutor } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
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

export function getDatabaseModule() {
  console.log('Database module is starting...');
  console.log(
    'Database :',
    process.env.DB_NAME,
    process.env.DB_HOST,
    process.env.DB_PORT,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
  );
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  });
}
