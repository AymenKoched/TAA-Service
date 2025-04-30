import {
  HttpStatus,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getBodyParserOptions } from '@nestjs/platform-express/adapters/utils/get-body-parser-options.util';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import {
  CommonErrors,
  parseValidationErrors,
  runDatabaseMigration,
  ServiceError,
} from './common';
import { conf } from './configuration';

dotenv.config();

const args = process.argv.slice(2);

async function bootstrap() {
  const logger = new Logger('Server');

  console.log(conf);

  if (args.find((arg) => arg === 'migrate')) {
    await runDatabaseMigration(conf);
    process.exit();
  }

  const app = await NestFactory.create(AppModule, { rawBody: false });
  app.enableShutdownHooks();
  app.enableCors(conf.cors);
  app.use(urlencoded({ extended: true }));
  app.use(
    json(
      getBodyParserOptions(true, {
        limit: '20mb',
      }),
    ),
  );
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = parseValidationErrors(validationErrors);
        return new ServiceError<Record<string, string>>(
          {
            errorCode: CommonErrors.ValidationError,
            errorMessage: 'A validation error has occurred.',
            data: errors,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  logger.log(`Server is starting...`);

  await app.listen(conf.server.port);

  logger.debug(`Listening on port: ${conf.server.port}`);
}
bootstrap();
