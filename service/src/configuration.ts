import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { JwtModuleOptions } from '@nestjs/jwt';
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

type DatabaseConfiguration = PostgresConnectionOptions;

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
      prodConf = JSON.parse(readFileSync(envConfigPath).toString());
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
