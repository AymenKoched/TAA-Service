import { Request } from 'express';
import { isArray } from 'lodash';

export function getIp(req: Request): string {
  const res =
    req.headers['x-real-ip'] ||
    (req.headers['x-forwarded-for'] &&
      String(req.headers['x-forwarded-for'])?.split(',').shift()) ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    req.ip;
  if (isArray(res)) {
    return res[0];
  }
  return res;
}
