import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { readFileSync } from 'fs';
import { isEmpty } from 'lodash';
import { hostname } from 'os';
import { resolve } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface AppConfig {
  environment?: Environment;
  server: ServerConfig;
  database?: DatabaseConfiguration;
  app?: AppInfos;
  front: FrontConfig;
  cors: CorsOptions;
}

export interface FrontConfig {
  baseUrl: string;
}

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export interface ServerConfig {
  port: number;
}

type DatabaseConfiguration = PostgresConnectionOptions;

export interface AppInfos {
  hostname: string;
  appname: string;
}

export const conf: AppConfig = loadFromDirectory<AppConfig>(`${__dirname}/..`);

function loadFromDirectory<T extends AppConfig = AppConfig>(
  rootProjectPath: string,
): T {
  let devConf;
  let prodConf;

  const confDirectory = resolve(rootProjectPath, './conf');
  const packagePath = resolve(rootProjectPath, './package.json');
  const envDevConfigPath = resolve(confDirectory, './env-dev.json');
  const envConfigPath = resolve(confDirectory, './env.json');

  const projectPackage = JSON.parse(readFileSync(packagePath).toString());

  try {
    devConf = JSON.parse(readFileSync(envDevConfigPath).toString());
  } catch (e) {
    devConf = {};
  }

  if (isEmpty(devConf)) {
    try {
      prodConf = readFileSync(envConfigPath).toString();
    } catch (e) {
      console.error(e);
      prodConf = {};
    }
  }

  return Object.assign(devConf, prodConf, {
    app: {
      hostname: hostname(),
      appname: projectPackage.name,
    },
  });
}
