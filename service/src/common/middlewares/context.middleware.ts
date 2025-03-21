import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { RequestContext, RequestTags } from '../models';
import { getIp } from '../utils';

type NextCallback = (e?: Error | any) => void;

const logger = new Logger('API');

@Injectable()
export class ContextMiddleware implements NestMiddleware<Request, Response> {
  async use(req: Request, res: Response, next: NextCallback) {
    if ((req as any).invoked) {
      return next();
    }

    const startTime = Date.now();
    req.headers['x-real-ip'] = getIp(req);
    const context = new RequestContext(req);
    if (!context.requestForwarded || context.requestForwarded.isEmpty()) {
      context.requestForwarded = new RequestTags({
        from: context.requestFrom,
        url: req.originalUrl,
        ip: context.realIp,
        method: req.method,
      });
    }
    RequestContext.cls.enterWith(context);
    logger.debug(
      `Request: HTTP ${req.method.toUpperCase()} : ${
        req.baseUrl + req.url
      } Payload: ${JSON.stringify(req.body)}`,
    );
    res.on('finish', () => {
      const delay = Date.now() - startTime;
      logger.debug(
        `Response: HTTP  ${
          req.baseUrl + req.url
        } ${req.method.toUpperCase()} (${res.statusCode}) - ${delay}ms`,
      );
    });
    (req as any).invoked = true;
    next();
  }
}
