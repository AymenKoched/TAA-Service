import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { JwtModuleOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { isArray, isEmpty, isObject } from 'lodash';
import { hostname } from 'os';
import { resolve } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

dotenv.config();

export interface AppConfig {
  environment?: Environment;
  server: ServerConfig;
  database?: DatabaseConfiguration;
  app?: AppInfos;
  cors: CorsOptions;
  jwt: JwtConfig;
  mailer: MailerConfig;
  front: FrontConfig;
}

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export interface ServerConfig {
  port: number;
}

type DatabaseConfiguration = MysqlConnectionOptions;

export interface AppInfos {
  hostname: string;
  appname: string;
}

export interface JwtConfig extends JwtModuleOptions {
  privateKeyPath: string;
  publicKeyPath: string;
}

export interface MailerConfig {
  mailHost: string;
  mailPort: number;
  mailUser: string;
  mailPassword: string;
  mailSender: string;
  mailSenderName: string;
}

export interface FrontConfig {
  baseUrl: string;
  resetPasswordUri: string;
  activateAccountUri: string;
}

export const conf: AppConfig = loadFromDirectory<AppConfig>(`${__dirname}/..`);

conf.jwt.publicKey = readFileSync(resolve(conf.jwt.publicKeyPath)).toString(
  'utf8',
);
conf.jwt.privateKey = readFileSync(resolve(conf.jwt.privateKeyPath)).toString(
  'utf8',
);

function loadFromDirectory<T extends AppConfig = AppConfig>(
  rootProjectPath: string,
): T {
  const confDirectory = resolve(rootProjectPath, './conf');
  const packagePath = resolve(rootProjectPath, './package.json');
  const envConfigPath = resolve(confDirectory, './env.json');

  const projectPackage = JSON.parse(readFileSync(packagePath).toString());

  let myConf;

  try {
    const confStr = readFileSync(envConfigPath).toString();
    myConf = setEnvVars(JSON.parse(confStr));
  } catch (e) {
    console.error(e);
    myConf = {};
  }

  if (myConf.environment === Environment.Production) {
    myConf.database.entities = ['dist/entities/**/*.js'];
    myConf.database.migrations = ['dist/db/migrations/**/*.js'];
  } else {
    myConf.database.entities = ['src/entities/**/*.ts'];
    myConf.database.migrations = ['src/db/migrations/**/*.ts'];
  }

  return Object.assign(myConf, {
    app: {
      hostname: hostname(),
      appname: projectPackage.name,
    },
  });
}

function setEnvVars(original: any): any {
  if (typeof original === 'string') {
    const regex = new RegExp(/^\{\{(.+?)\}\}$/g);
    const match = regex.exec(original);

    if (isEmpty(match) || !match[1]) {
      return original;
    }
    if (match[1].includes(':')) {
      const parts = match[1].split(':');
      switch (parts[1]?.toLowerCase()) {
        case 'array':
          return getEnvArray(parts[0]);
        case 'number':
          return Number(process.env[parts[0]]);
      }
    }
    return process.env[match[1]] || match[1];
  }

  if (isArray(original)) {
    return original.map((item) => setEnvVars(item));
  }

  if (isObject(original)) {
    return Object.keys(original).reduce(
      (acc, key) => ({ ...acc, [key]: setEnvVars(original[key]) }),
      {},
    );
  }

  return original;
}

function getEnvArray(varName: string): string[] {
  return Object.keys(process.env)
    .filter((key) => key.startsWith(varName))
    .map((key) => process.env[key]);
}
