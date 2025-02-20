export interface ErrorResponse<T = Record<string, string>> {
  errorCode: string;
  errorMessage: string;
  serviceName?: string;
  data?: T;
}
