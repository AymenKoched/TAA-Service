import { Body, Controller, Param, Put } from '@nestjs/common';

import {
  ConvertResponse,
  RoleAccess,
  UpdateUserRequest,
  UserResponse,
} from '../common';
import { HasRoleAccess } from '../guards';
import { UsersService } from '../services';

@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Put(':userId')
  @HasRoleAccess({ accesses: RoleAccess.UpdateUser })
  @ConvertResponse(UserResponse)
  public async updateUser(
    @Param('userId') userId: string,
    @Body() payload: UpdateUserRequest,
  ): Promise<UserResponse> {
    return this.users.updateUser(userId, payload);
  }
}
