import { AsyncLocalStorage } from 'async_hooks';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { isArray, isEmpty, isObject } from 'lodash';
import { v4 as uuid } from 'uuid';

import { conf } from '../../configuration';

export class RequestTags {
  private tags: Record<string, string>;
  constructor(header: string | string[] | undefined | Record<string, string>) {
    if (isObject(header)) {
      this.tags = header as Record<string, string>;
      return;
    }
    this.tags = RequestTags.parseRequestTags(header) || {};
  }

  public isEmpty() {
    return isEmpty(this.tags);
  }

  public serialize(): string {
    return Object.entries(this.tags)
      .map(([k, v]) => `${k}=${global.encodeURIComponent(v)}`)
      .join(',');
  }

  public static parseRequestTags = (
    tagsHeaders: string | string[] | undefined,
  ): Record<string, string> => {
    if (!tagsHeaders) {
      return {};
    }
    if (!Array.isArray(tagsHeaders)) {
      tagsHeaders = [tagsHeaders];
    }
    const parsedTags: any = {};
    for (const tagHeader of tagsHeaders) {
      for (const tag of tagHeader.split(',')) {
        const [name, value] = tag.split('=');
        parsedTags[name] = global.decodeURIComponent(value);
      }
    }
    return parsedTags;
  };
}

export class RequestContext {
  static cls = new AsyncLocalStorage<RequestContext>();

  public requestId: string;
  public requestFrom: string;
  public requestLocale: string;
  public requestTags: RequestTags;
  public realIp: string;
  public requestForwarded: RequestTags;
  public appName: string;
  public userAgent: string;
  public userId: string;

  static currentContext() {
    return this.cls.getStore();
  }

  getHeader(headerName: string): string {
    const header = this.req.headers[headerName];
    if (isArray(header)) {
      return header[0];
    }
    return header || '';
  }

  constructor(private readonly req: Request) {
    this.appName = conf.app.appname;
    this.requestId = this.getHeader('x-request-id') || uuid();
    this.requestFrom = this.getHeader('x-request-from') || this.appName;
    this.requestTags = new RequestTags(this.getHeader('x-request-tags'));
    this.realIp = this.getHeader('x-real-ip') || 'unknown';
    this.requestForwarded = new RequestTags(
      this.getHeader('x-request-forwarded'),
    );
    this.userAgent = this.getHeader('user-agent') || 'unknown';
    this.requestLocale = this.getHeader('x-locale') || 'en';
    this.userId = this.getHeader('x-user-id') || this.getTokenPayload(req)?.id;
  }

  private getTokenPayload(req: Request) {
    if (!req.headers['authorization']) {
      return null;
    }

    const token = req.headers['authorization'].substring(7);
    try {
      return jwt.decode(token, { json: true });
    } catch (e) {
      console.log('Invalid token : ', e);
      return null;
    }
  }
}
