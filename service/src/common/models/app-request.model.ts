import { Request } from 'express';

import { UserResponse } from '../responses';

export type AppRequest = Request & {
  user: UserResponse;
};
