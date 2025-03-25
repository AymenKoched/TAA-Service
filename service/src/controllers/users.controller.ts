import { Body, Controller, Post } from '@nestjs/common';

import {
  ConvertResponse,
  RoleAccess,
  UserRequest,
  UserResponse,
} from '../common';
import { HasRoleAccess } from '../guards';
import { UsersService } from '../services';

@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  @HasRoleAccess({ accesses: RoleAccess.CreateUser })
  @ConvertResponse(UserResponse)
  async CreateUser(@Body() payload: UserRequest) {
    return await this.users.createUser(payload);
  }
}
