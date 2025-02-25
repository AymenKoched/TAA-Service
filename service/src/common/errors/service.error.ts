import { ErrorResponse } from './error.response';

export class ServiceError<T = string[]> extends Error {
  constructor(public data: ErrorResponse<T>, public statusCode: number) {
    super(data.errorMessage);
  }
}
