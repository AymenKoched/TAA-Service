import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { AppRequest, AuthErrors, UserResponse } from '../common';

const logger = new Logger('BaseAccessGuard');

export type AccessContext<TOptions> = {
  user: UserResponse;
  options?: TOptions;
  params: Record<string, string>;
};

export abstract class BaseAccessGuard<TOptions> implements CanActivate {
  protected constructor(
    protected readonly moduleRef: ModuleRef,
    protected readonly reflector: Reflector,
    protected readonly metaKey: string,
  ) {}

  abstract hasAccess(opts: AccessContext<TOptions>): Promise<boolean>;

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<AppRequest>();
    const user = req.user as UserResponse;

    const options = this.getOptions(ctx);

    if (user.isSuperAdmin) {
      return true;
    }

    let resp;

    try {
      resp = await this.hasAccess({
        user,
        options,
        params: {
          ...req.body,
          ...req.query,
          ...req.params,
        },
      });
    } catch (e) {
      logger.error(
        `[${this.constructor.name}] An error has occurred while executing guard`,
        e,
      );
      return false;
    }
    if (!resp) {
      throw new ForbiddenException(
        AuthErrors.AccessDenied,
        'You have no access to this functionality',
      );
    }
    return true;
  }

  protected getOptions(ctx: ExecutionContext): TOptions {
    return (
      this.reflector.get<TOptions>(this.metaKey, ctx.getHandler()) ||
      this.reflector.get<TOptions>(this.metaKey, ctx.getClass())
    );
  }
}
