import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TransformFnParams } from 'class-transformer';
import { map, Observable } from 'rxjs';

import { PagedResult, SearchQuery } from '../base';
import { CONVERT_RESPONSE_TYPE } from '../decorators';
import { ModelTransformer } from '../transformers';

@Injectable()
export class ResponseConverterInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const handler = context.getHandler();
        const Converter = this.reflector.get(CONVERT_RESPONSE_TYPE, handler);
        const transform = (items: unknown) =>
          ModelTransformer(() => Converter)({
            value: items,
          } as TransformFnParams);

        if (!data) {
          return data;
        }

        if (SearchQuery.hasPagination(data)) {
          return new PagedResult({
            ...data,
            items: transform(data.items),
          });
        }

        return transform(data);
      }),
    );
  }
}
