import { HttpException } from '@nestjs/common';

import { ErrorResponse } from './error.response';

export class ServiceError<T = string[]> extends HttpException {
  constructor(public data: ErrorResponse<T>, public statusCode: number) {
    super(data, statusCode, { cause: new Error(data.errorMessage) });
  }
}
