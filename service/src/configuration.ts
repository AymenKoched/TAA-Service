import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { JwtModuleOptions } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { isArray, isEmpty, isObject } from 'lodash';
import { hostname } from 'os';
import { resolve } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

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
      console.log('env: ', process.env);
      const prodConfStr = readFileSync(envConfigPath).toString();
      prodConf = setEnvVars(JSON.parse(prodConfStr));
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
