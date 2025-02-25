export interface ErrorResponse<T = Record<string, string>> {
  errorCode: string;
  errorMessage: string;
  data?: T;
}
