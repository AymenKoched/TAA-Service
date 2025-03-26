import { ErrorFilter } from './errors.filter';
import { ResponseConverterInterceptor } from './response-converter.interceptor';

export * from './errors.filter';
export * from './response-converter.interceptor';

export const interceptors = [ResponseConverterInterceptor];
export const filters = [ErrorFilter];
