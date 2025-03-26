import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { merge } from 'lodash';
import { EntityPropertyNotFoundError } from 'typeorm';

import { conf, Environment } from '../../configuration';
import { CommonErrors, ErrorResponse } from '../errors';

const logger = new Logger('ErrorFilter');

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(e: any, host: ArgumentsHost) {
    logger.error(e.stack);

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const debug = conf.environment === Environment.Development;

    const defaultData: ErrorResponse = {
      errorCode: 'unknown_error',
      errorMessage: (debug ? e.message : null) || 'An unknown error occured.',
    };

    const result: ErrorResponse = merge(defaultData, this.getErrorData(e));

    const statusCode = this.getStatusCode(e);
    httpAdapter.reply(
      ctx.getResponse(),
      statusCode === HttpStatus.NO_CONTENT ? null : result,
      statusCode,
    );
  }

  private getStatusCode(e: any): number {
    return e.statusCode || e.status || 500;
  }

  private getErrorData(e: any): Omit<ErrorResponse, 'serviceName'> | null {
    if (e instanceof HttpException) {
      return {
        errorCode: (e.getResponse() as any)?.message,
        errorMessage: (e.getResponse() as any)?.error,
      };
    } else if (e instanceof EntityPropertyNotFoundError) {
      return {
        ...(e as any).data,
        errorCode: CommonErrors.ValidationError,
      };
    }
    return e.data;
  }
}
