import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AppRequest, UserResponse } from '../common';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<AppRequest>();
  return new UserResponse(req.user);
});
